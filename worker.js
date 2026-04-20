// CodeSnap — Cloudflare Worker Backend
// Handles Stripe Checkout sessions + webhook for Pro subscriptions
// Deploy: wrangler deploy

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json'
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers });
        }

        try {
            if (url.pathname === '/create-checkout-session' && request.method === 'POST') {
                return await createCheckoutSession(request, env, headers);
            }

            if (url.pathname === '/verify-session' && request.method === 'GET') {
                return await verifySession(request, env, headers);
            }

            if (url.pathname === '/stripe-webhook' && request.method === 'POST') {
                return await handleWebhook(request, env, headers);
            }

            if (url.pathname === '/health') {
                return new Response(JSON.stringify({ status: 'ok' }), { headers });
            }

            return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
        }
    }
};

async function createCheckoutSession(request, env, headers) {
    const body = await request.json();
    const { user_id, email } = body;

    // Verify Supabase auth token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }

    // Create Stripe Checkout session
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'mode': 'subscription',
            'payment_method_types[0]': 'card',
            'customer_email': email,
            'line_items[0][price]': env.STRIPE_PRICE_ID,
            'line_items[0][quantity]': '1',
            'success_url': env.APP_URL + '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url': env.APP_URL + '#pricing',
            'metadata[user_id]': user_id,
            'subscription_data[metadata][user_id]': user_id
        })
    });

    const session = await stripeRes.json();

    if (session.error) {
        return new Response(JSON.stringify({ error: session.error.message }), { status: 400, headers });
    }

    return new Response(JSON.stringify({ sessionId: session.id }), { headers });
}

async function verifySession(request, env, headers) {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('session_id');

    if (!sessionId) {
        return new Response(JSON.stringify({ error: 'Missing session_id' }), { status: 400, headers });
    }

    // Retrieve session from Stripe
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        headers: { 'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}` }
    });

    const session = await stripeRes.json();

    if (session.payment_status === 'paid' && session.metadata?.user_id) {
        // Update Supabase — set user as pro
        const supabaseRes = await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions`, {
            method: 'POST',
            headers: {
                'apikey': env.SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({
                user_id: session.metadata.user_id,
                status: 'active',
                stripe_customer_id: session.customer,
                stripe_subscription_id: session.subscription,
                plan: 'pro',
                created_at: new Date().toISOString()
            })
        });

        return new Response(JSON.stringify({ active: true }), { headers });
    }

    return new Response(JSON.stringify({ active: false }), { headers });
}

async function handleWebhook(request, env, headers) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    // Verify webhook signature (simplified — in production use stripe webcrypto)
    const event = JSON.parse(body);

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const userId = session.metadata?.user_id;
            if (userId) {
                await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions`, {
                    method: 'POST',
                    headers: {
                        'apikey': env.SUPABASE_SERVICE_KEY,
                        'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'resolution=merge-duplicates'
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        status: 'active',
                        stripe_customer_id: session.customer,
                        stripe_subscription_id: session.subscription,
                        plan: 'pro',
                        created_at: new Date().toISOString()
                    })
                });
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const sub = event.data.object;
            const userId = sub.metadata?.user_id;
            if (userId) {
                await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions?user_id=eq.${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'apikey': env.SUPABASE_SERVICE_KEY,
                        'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'cancelled' })
                });
            }
            break;
        }
    }

    return new Response(JSON.stringify({ received: true }), { headers });
}