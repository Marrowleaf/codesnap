// CodeSnap — Supabase Auth Integration
// Config is set via app.js init. These will be populated from config.

let supabase = null;
let currentUser = null;
let isPro = false;

function initAuth(sbUrl, sbKey) {
    supabase = window.supabase.createClient(sbUrl, sbKey);
    checkSession();
    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            loginUser(session.user);
        } else {
            logoutUser();
        }
    });
}

async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        loginUser(session.user);
    } else {
        logoutUser();
    }
}

async function loginUser(user) {
    currentUser = user;
    document.getElementById('auth-guest').style.display = 'none';
    document.getElementById('auth-user').style.display = 'flex';
    document.getElementById('user-email').textContent = user.email;

    // Check pro status
    await checkProStatus();
    updateUIForPlan();
}

function logoutUser() {
    currentUser = null;
    isPro = false;
    document.getElementById('auth-guest').style.display = 'flex';
    document.getElementById('auth-user').style.display = 'none';
    document.getElementById('pro-badge').style.display = 'none';
    updateUIForPlan();
}

async function logout() {
    await supabase.auth.signOut();
    logoutUser();
}

let authMode = 'login';

function showAuth(mode) {
    authMode = mode;
    document.getElementById('auth-modal').style.display = 'flex';
    document.getElementById('auth-title').textContent = mode === 'login' ? 'Log In' : 'Sign Up';
    document.getElementById('auth-submit').textContent = mode === 'login' ? 'Log In' : 'Sign Up';
    document.getElementById('auth-error').style.display = 'none';
}

function closeAuth() {
    document.getElementById('auth-modal').style.display = 'none';
}

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-title').textContent = authMode === 'login' ? 'Log In' : 'Sign Up';
    document.getElementById('auth-submit').textContent = authMode === 'login' ? 'Log In' : 'Sign Up';
}

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const errEl = document.getElementById('auth-error');

    try {
        errEl.style.display = 'none';
        if (authMode === 'signup') {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            errEl.textContent = '✅ Check your email to confirm your account!';
            errEl.style.display = 'block';
            errEl.style.color = 'var(--success)';
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            closeAuth();
        }
    } catch (err) {
        errEl.textContent = err.message || 'Authentication failed';
        errEl.style.display = 'block';
        errEl.style.color = 'var(--danger)';
    }
}

async function checkProStatus() {
    if (!currentUser || !supabase) return;
    
    try {
        // Check the subscriptions table for active pro subscription
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', currentUser.id)
            .eq('status', 'active')
            .single();

        isPro = !error && data;
        document.getElementById('pro-badge').style.display = isPro ? 'inline' : 'none';
    } catch (e) {
        isPro = false;
    }
}

function updateUIForPlan() {
    // Update theme dropdown locks
    const themeSelect = document.getElementById('theme-select');
    themeSelect.querySelectorAll('option').forEach(opt => {
        if (!FREE_THEMES.includes(opt.value)) {
            opt.textContent = isPro ? THEMES[opt.value].name : THEMES[opt.value].name + ' 🔒';
        }
    });

    // Update background button locks
    document.querySelectorAll('.bg-btn').forEach(btn => {
        const bg = btn.dataset.bg;
        if (PRO_BGS.includes(bg)) {
            if (isPro) {
                btn.classList.remove('pro-only');
            } else {
                btn.classList.add('pro-only');
            }
        }
    });

    // Update save button
    const saveBtn = document.getElementById('save-btn');
    saveBtn.textContent = currentUser ? '💾 Save Snippet' : '💾 Save (Log in required)';
    saveBtn.disabled = !currentUser;
}