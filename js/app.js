// CodeSnap — Main App Logic

// ── Config ──────────────────────────────────────────────────────────────────
// These will be set when Supabase + Stripe are configured
// For now, the app works fully in demo mode without them
const STRIPE_API_BASE = ''; // Set to your Cloudflare Worker URL

let currentBg = 'gradient-1';
let currentTheme = 'monokai';
let currentWindow = 'macos';
let showLineNumbers = true;
let showShadow = true;
let padding = 40;
let radius = 12;
let fontSize = 16;

// ── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Try to init auth if Supabase config exists
    const sbUrl = window.__SUPABASE_URL__;
    const sbKey = window.__SUPABASE_KEY__;
    const stripeKey = window.__STRIPE_PK__;
    
    if (sbUrl && sbKey) {
        initAuth(sbUrl, sbKey);
    }
    if (stripeKey) {
        initStripe(stripeKey);
    }

    // Event listeners
    document.getElementById('code-input').addEventListener('input', debounce(renderCode, 150));
    document.getElementById('lang-select').addEventListener('change', renderCode);
    document.getElementById('theme-select').addEventListener('change', onThemeChange);
    document.getElementById('window-select').addEventListener('change', onWindowChange);
    document.getElementById('title-input').addEventListener('input', onTitleChange);
    document.getElementById('padding-range').addEventListener('input', onPaddingChange);
    document.getElementById('radius-range').addEventListener('input', onRadiusChange);
    document.getElementById('font-range').addEventListener('input', onFontChange);
    document.getElementById('line-numbers').addEventListener('change', onLineNumbersChange);
    document.getElementById('shadow-toggle').addEventListener('change', onShadowChange);

    // Initial render
    renderCode();
});

// ── Core Rendering ──────────────────────────────────────────────────────────
function renderCode() {
    const code = document.getElementById('code-input').value;
    const lang = document.getElementById('lang-select').value;
    const theme = THEMES[currentTheme] || THEMES.monokai;
    const lines = code.split('\n');

    // Apply theme colors to code card
    const card = document.getElementById('code-card');
    card.style.background = theme.card;
    card.style.borderRadius = radius + 'px';

    // Apply font size
    const table = document.getElementById('code-table');
    table.style.fontSize = fontSize + 'px';

    // Window chrome
    const chrome = document.getElementById('window-chrome');
    chrome.style.background = theme.chrome;
    const title = document.getElementById('window-title');
    title.textContent = document.getElementById('title-input').value || 'untitled';

    if (currentWindow === 'none') {
        chrome.style.display = 'none';
    } else {
        chrome.style.display = 'flex';
        // macOS vs Windows dots
        const dots = document.getElementById('window-dots');
        if (currentWindow === 'macos') {
            dots.style.display = 'flex';
            dots.className = '';
            dots.id = 'window-dots';
        } else {
            dots.style.display = 'flex';
            // Windows style — smaller squares
            dots.innerHTML = '<span style="width:10px;height:10px;background:rgba(255,255,255,0.25);border-radius:1px;display:inline-block;margin-right:4px"></span><span style="width:10px;height:10px;background:rgba(255,255,255,0.25);border-radius:1px;display:inline-block;margin-right:4px"></span><span style="width:10px;height:10px;background:rgba(255,255,255,0.25);border-radius:1px;display:inline-block"></span>';
        }
    }

    // Render code lines
    const tbody = document.getElementById('code-body');
    tbody.innerHTML = '';

    lines.forEach((line, i) => {
        const tr = document.createElement('tr');
        
        if (showLineNumbers) {
            const numTd = document.createElement('td');
            numTd.className = 'line-num';
            numTd.textContent = i + 1;
            numTd.style.color = theme.lineNum;
            tr.appendChild(numTd);
        }

        const codeTd = document.createElement('td');
        codeTd.className = 'line-code';
        codeTd.innerHTML = highlight(line, lang);
        codeTd.style.color = theme.text;
        tr.appendChild(codeTd);

        tbody.appendChild(tr);
    });

    // Update line number colors in existing rows
    applyThemeColors(theme);
}

function applyThemeColors(theme) {
    // Dynamically inject theme-specific colors
    let styleEl = document.getElementById('theme-override');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'theme-override';
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
        .tok-keyword { color: ${theme.keyword} !important; }
        .tok-string { color: ${theme.string} !important; }
        .tok-comment { color: ${theme.comment} !important; }
        .tok-number { color: ${theme.number} !important; }
        .tok-function { color: ${theme.function} !important; }
        .tok-type { color: ${theme.type} !important; }
        .tok-operator { color: ${theme.operator} !important; }
        .tok-variable { color: ${theme.variable} !important; }
        .tok-property { color: ${theme.property} !important; }
        .tok-tag { color: ${theme.tag} !important; }
        .tok-attr { color: ${theme.attr} !important; }
        .tok-builtin { color: ${theme.builtin} !important; }
        .tok-punctuation { color: ${theme.punctuation} !important; }
        .tok-regex { color: ${theme.regex} !important; }
        .tok-decorator { color: ${theme.decorator} !important; }
    `;
}

// ── Control Handlers ────────────────────────────────────────────────────────
function onThemeChange() {
    const select = document.getElementById('theme-select');
    const val = select.value;
    
    // Check if pro theme
    if (!FREE_THEMES.includes(val) && !isPro) {
        alert('This theme is Pro-only. Upgrade to unlock all themes!');
        select.value = currentTheme;
        return;
    }
    
    currentTheme = val;
    renderCode();
}

function setBg(btn) {
    const bg = btn.dataset.bg;
    
    // Check if pro background
    if (PRO_BGS.includes(bg) && !isPro) {
        alert('Custom photo backgrounds are Pro-only. Upgrade to unlock!');
        return;
    }
    
    document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentBg = bg;
    
    const wrapper = document.getElementById('capture-wrapper');
    const bgValue = BACKGROUNDS[bg];
    if (bgValue.startsWith('url')) {
        wrapper.style.background = bgValue;
    } else if (bgValue.startsWith('#')) {
        wrapper.style.background = bgValue;
    } else {
        wrapper.style.background = bgValue;
    }
}

function onWindowChange() {
    currentWindow = document.getElementById('window-select').value;
    
    // Reset dots for macOS
    if (currentWindow === 'macos') {
        document.getElementById('window-dots').innerHTML = '<span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>';
    }
    
    renderCode();
}

function onTitleChange() {
    document.getElementById('window-title').textContent = document.getElementById('title-input').value || 'untitled';
}

function onPaddingChange() {
    padding = parseInt(document.getElementById('padding-range').value);
    document.getElementById('capture-wrapper').style.padding = padding + 'px';
}

function onRadiusChange() {
    radius = parseInt(document.getElementById('radius-range').value);
    document.getElementById('code-card').style.borderRadius = radius + 'px';
}

function onFontChange() {
    fontSize = parseInt(document.getElementById('font-range').value);
    document.getElementById('code-table').style.fontSize = fontSize + 'px';
}

function onLineNumbersChange() {
    showLineNumbers = document.getElementById('line-numbers').checked;
    renderCode();
}

function onShadowChange() {
    showShadow = document.getElementById('shadow-toggle').checked;
    const card = document.getElementById('code-card');
    card.style.boxShadow = showShadow ? '0 20px 68px rgba(0,0,0,0.55)' : 'none';
}

// ── Start Editing (hide hero, show editor) ──────────────────────────────────
function startEditing() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('editor').style.display = 'block';
    document.getElementById('pricing').style.display = 'none';
    renderCode();
}

// ── Export ───────────────────────────────────────────────────────────────────
async function exportImage() {
    const card = document.getElementById('code-card');
    
    // Add watermark for free users
    if (!isPro) {
        card.classList.add('watermark');
    }

    try {
        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false
        });

        // Remove watermark class
        card.classList.remove('watermark');

        // Download
        const link = document.createElement('a');
        link.download = 'codesnap-' + Date.now() + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        card.classList.remove('watermark');
        alert('Export failed: ' + err.message);
    }
}

async function copyToClipboard() {
    if (!isPro) {
        if (!confirm('Copy to clipboard is a Pro feature. Upgrade to use it!')) return;
    }

    const card = document.getElementById('code-card');
    try {
        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false
        });

        canvas.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                const btn = document.getElementById('copy-btn');
                btn.textContent = '✅ Copied!';
                setTimeout(() => { btn.textContent = '📋 Copy to Clipboard'; }, 2000);
            } catch (err) {
                alert('Clipboard access denied. Try the Export PNG button instead.');
            }
        }, 'image/png');
    } catch (err) {
        alert('Failed: ' + err.message);
    }
}

// ── Save Snippet ────────────────────────────────────────────────────────────
async function saveSnippet() {
    if (!currentUser) {
        showAuth('signup');
        return;
    }
    if (!isPro) {
        alert('Saving snippets is a Pro feature. Upgrade to unlock!');
        startCheckout();
        return;
    }

    const code = document.getElementById('code-input').value;
    const lang = document.getElementById('lang-select').value;
    const theme = currentTheme;
    const title = document.getElementById('title-input').value || 'untitled';

    try {
        const { error } = await supabase
            .from('snippets')
            .insert({
                user_id: currentUser.id,
                title: title,
                code: code,
                language: lang,
                theme: theme,
                background: currentBg,
                created_at: new Date().toISOString()
            });

        if (error) throw error;
        alert('✅ Snippet saved!');
    } catch (err) {
        alert('Save failed: ' + err.message);
    }
}

// ── Utility ─────────────────────────────────────────────────────────────────
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}