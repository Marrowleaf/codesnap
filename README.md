# 📸 CodeSnap — Beautiful Code Screenshots

A fully functional SaaS application for creating stunning code screenshots. Built as a portfolio piece demonstrating full-stack skills: authentication, payments, and client-side rendering.

**🔗 Live:** [marrowleaf.github.io/codesnap](https://marrowleaf.github.io/codesnap)

## Features

- 🎨 **15 syntax themes** — Monokai, Dracula, Nord, Catppuccin, Rosé Pine, and more
- 📸 **PNG export** — High-res 2x export via html2canvas
- 📋 **Copy to clipboard** — One-click copy (Pro)
- 🪟 **Window chrome** — macOS or Windows style
- 🖼️ **Custom backgrounds** — Gradients, solids, photo backgrounds (Pro)
- 🔢 **Line numbers** — Toggle on/off
- 💾 **Save snippets** — Cloud storage via Supabase (Pro)
- 🔐 **Auth** — Email signup/login via Supabase
- 💳 **Stripe payments** — Checkout + webhooks for Pro subscription
- 🌙 **Dark theme** — Beautiful, modern UI

## Pricing

| Free | Pro (£4.99/mo) |
|------|----------|
| 10 themes | All 15+ themes |
| PNG export (watermarked) | PNG export (no watermark) |
| Custom gradients | Photo backgrounds |
| — | Copy to clipboard |
| — | Save snippets to cloud |
| — | Priority support |

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────┐
│   GitHub Pages  │────▶│  Cloudflare  │────▶│ Stripe  │
│  (Frontend)     │◀────│   Worker     │◀────│  API    │
│  HTML/CSS/JS    │     │  (Backend)   │────▶│─────────│
└─────────────────┘     └──────────────┘     │Supabase │
                                              │(Auth+DB)│
                                              └─────────┘
```

- **Frontend:** Pure HTML/CSS/JS, served from GitHub Pages
- **Backend:** Cloudflare Worker (serverless, free tier)
- **Auth + DB:** Supabase (free tier)
- **Payments:** Stripe (pay-as-you-go)

## Setup

### 1. Supabase (Auth + Database)

1. Create a free project at [supabase.com](https://supabase.com)
2. Enable Email auth in Authentication settings
3. Create a `subscriptions` table:
```sql
create table subscriptions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    status text default 'active',
    stripe_customer_id text,
    stripe_subscription_id text,
    plan text default 'pro',
    created_at timestamptz default now()
);

create table snippets (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    title text,
    code text,
    language text,
    theme text,
    background text,
    created_at timestamptz default now()
);

-- RLS policies
alter table subscriptions enable row level security;
alter table snippets enable row level security;

create policy "Users can read own subscription" on subscriptions for select using (auth.uid() = user_id);
create policy "Users can insert own subscription" on subscriptions for insert with check (auth.uid() = user_id);
create policy "Users can read own snippets" on snippets for select using (auth.uid() = user_id);
create policy "Users can insert own snippets" on snippets for insert with check (auth.uid() = user_id);
create policy "Users can delete own snippets" on snippets for delete using (auth.uid() = user_id);
```

4. Copy your project URL and anon key

### 2. Stripe (Payments)

1. Create a free account at [stripe.com](https://stripe.com)
2. Create a Product with a £4.99/month recurring price
3. Copy the Price ID (`price_...`)
4. Set up a webhook endpoint pointing to your Worker URL + `/stripe-webhook`
5. Copy your publishable key and secret key

### 3. Cloudflare Worker (Backend)

1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Set secrets:
```bash
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_PRICE_ID
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_KEY
```
4. Deploy: `wrangler deploy`

### 4. Configure Frontend

Edit `js/app.js` to set your config:

```javascript
// At the top of app.js, or set as global vars before scripts load:
window.__SUPABASE_URL__ = 'https://your-project.supabase.co';
window.__SUPABASE_KEY__ = 'your-anon-key';
window.__STRIPE_PK__ = 'pk_test_...';
```

And in `js/stripe.js`:
```javascript
const STRIPE_API_BASE = 'https://your-worker.workers.dev';
```

### 5. Deploy to GitHub Pages

Push to GitHub and enable Pages — it deploys automatically via the included workflow.

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Hosting | GitHub Pages | Free |
| Backend | Cloudflare Workers | Free (100k req/day) |
| Auth + DB | Supabase | Free (50k auth users) |
| Payments | Stripe | 1.4% + 20p per transaction |
| Syntax Highlighting | Custom regex engine | Free |
| Screenshot | html2canvas | Free |

## License

MIT © James Durrant