// CodeSnap — Stripe Checkout Integration

let stripe = null;

function initStripe(publishableKey) {
    if (publishableKey) {
        stripe = Stripe(publishableKey);
    }
}

async function startCheckout() {
    if (!currentUser) {
        showAuth('signup');
        return;
    }

    if (!stripe) {
        alert('Stripe is not configured yet. Please set your Stripe publishable key in the config.');
        return;
    }

    try {
        // Call our backend to create a Checkout session
        const response = await fetch(STRIPE_API_BASE + '/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (await supabase.auth.getSession()).data.session.access_token
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                email: currentUser.email
            })
        });

        const session = await response.json();

        if (session.error) {
            throw new Error(session.error);
        }

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.sessionId
        });

        if (error) {
            throw new Error(error.message);
        }
    } catch (err) {
        alert('Payment error: ' + err.message);
    }
}

// Handle Stripe Checkout redirect (success/cancel)
function handleStripeRedirect() {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    
    if (sessionId) {
        // Verify the session with our backend
        fetch(STRIPE_API_BASE + '/verify-session?session_id=' + sessionId, {
            headers: {
                'Authorization': 'Bearer ' + (await supabase.auth.getSession()).data.session.access_token
            }
        })
        .then(r => r.json())
        .then(data => {
            if (data.active) {
                isPro = true;
                document.getElementById('pro-badge').style.display = 'inline';
                updateUIForPlan();
                // Clean URL
                window.history.replaceState({}, '', window.location.pathname);
            }
        })
        .catch(() => {});
    }
}