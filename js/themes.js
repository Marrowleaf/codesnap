// CodeSnap — Theme Definitions (background + code-card colors)
const THEMES = {
    monokai: {
        name: 'Monokai',
        card: '#272822',
        keyword: '#f92672', string: '#e6db74', comment: '#75715e',
        number: '#ae81ff', function: '#a6e22e', type: '#66d9ef',
        operator: '#f92672', variable: '#f8f8f2', property: '#a6e22e',
        tag: '#f92672', attr: '#a6e22e', builtin: '#66d9ef',
        punctuation: '#f8f8f2', regex: '#e6db74', decorator: '#a6e22e',
        text: '#f8f8f2', lineNum: 'rgba(248,248,242,0.2)', chrome: 'rgba(0,0,0,0.2)'
    },
    dracula: {
        name: 'Dracula',
        card: '#282a36',
        keyword: '#ff79c6', string: '#f1fa8c', comment: '#6272a4',
        number: '#bd93f9', function: '#50fa7b', type: '#8be9fd',
        operator: '#ff79c6', variable: '#f8f8f2', property: '#50fa7b',
        tag: '#ff79c6', attr: '#50fa7b', builtin: '#8be9fd',
        punctuation: '#f8f8f2', regex: '#f1fa8c', decorator: '#50fa7b',
        text: '#f8f8f2', lineNum: 'rgba(248,248,242,0.2)', chrome: 'rgba(0,0,0,0.25)'
    },
    'github-dark': {
        name: 'GitHub Dark',
        card: '#0d1117',
        keyword: '#ff7b72', string: '#a5d6ff', comment: '#8b949e',
        number: '#79c0ff', function: '#d2a8ff', type: '#ffa657',
        operator: '#ff7b72', variable: '#c9d1d9', property: '#7ee787',
        tag: '#7ee787', attr: '#d2a8ff', builtin: '#ffa657',
        punctuation: '#c9d1d9', regex: '#a5d6ff', decorator: '#d2a8ff',
        text: '#c9d1d9', lineNum: 'rgba(201,209,217,0.15)', chrome: 'rgba(0,0,0,0.3)'
    },
    'one-dark': {
        name: 'One Dark',
        card: '#282c34',
        keyword: '#c678dd', string: '#98c379', comment: '#5c6370',
        number: '#d19a66', function: '#61afef', type: '#e5c07b',
        operator: '#c678dd', variable: '#abb2bf', property: '#e06c75',
        tag: '#e06c75', attr: '#d19a66', builtin: '#e5c07b',
        punctuation: '#abb2bf', regex: '#98c379', decorator: '#61afef',
        text: '#abb2bf', lineNum: 'rgba(171,178,191,0.15)', chrome: 'rgba(0,0,0,0.2)'
    },
    nord: {
        name: 'Nord',
        card: '#2e3440',
        keyword: '#81a1c1', string: '#a3be8c', comment: '#616e88',
        number: '#b48ead', function: '#88c0d0', type: '#8fbcbb',
        operator: '#81a1c1', variable: '#d8dee9', property: '#88c0d0',
        tag: '#81a1c1', attr: '#8fbcbb', builtin: '#5e81ac',
        punctuation: '#d8dee9', regex: '#ebcb8b', decorator: '#88c0d0',
        text: '#d8dee9', lineNum: 'rgba(216,222,233,0.15)', chrome: 'rgba(0,0,0,0.2)'
    },
    'solarized-dark': {
        name: 'Solarized Dark',
        card: '#002b36',
        keyword: '#859900', string: '#2aa198', comment: '#586e75',
        number: '#d33682', function: '#268bd2', type: '#b58900',
        operator: '#859900', variable: '#839496', property: '#268bd2',
        tag: '#268bd2', attr: '#b58900', builtin: '#6c71c4',
        punctuation: '#839496', regex: '#dc322f', decorator: '#268bd2',
        text: '#839496', lineNum: 'rgba(131,148,150,0.2)', chrome: 'rgba(0,0,0,0.2)'
    },
    'tokyo-night': {
        name: 'Tokyo Night',
        card: '#1a1b26',
        keyword: '#bb9af7', string: '#9ece6a', comment: '#565f89',
        number: '#ff9e64', function: '#7aa2f7', type: '#2ac3de',
        operator: '#bb9af7', variable: '#c0caf5', property: '#73daca',
        tag: '#f7768e', attr: '#9ece6a', builtin: '#2ac3de',
        punctuation: '#c0caf5', regex: '#b4f9f8', decorator: '#7aa2f7',
        text: '#c0caf5', lineNum: 'rgba(192,202,245,0.15)', chrome: 'rgba(0,0,0,0.3)'
    },
    catppuccin: {
        name: 'Catppuccin',
        card: '#1e1e2e',
        keyword: '#cba6f7', string: '#a6e3a1', comment: '#6c7086',
        number: '#fab387', function: '#89b4fa', type: '#f9e2af',
        operator: '#89dceb', variable: '#cdd6f4', property: '#89b4fa',
        tag: '#f38ba8', attr: '#fab387', builtin: '#94e2d5',
        punctuation: '#cdd6f4', regex: '#a6e3a1', decorator: '#89b4fa',
        text: '#cdd6f4', lineNum: 'rgba(205,214,244,0.12)', chrome: 'rgba(0,0,0,0.25)'
    },
    gruvbox: {
        name: 'Gruvbox',
        card: '#282828',
        keyword: '#fb4934', string: '#b8bb26', comment: '#928374',
        number: '#d3869b', function: '#fabd2f', type: '#83a598',
        operator: '#fb4934', variable: '#ebdbb2', property: '#fabd2f',
        tag: '#fb4934', attr: '#b8bb26', builtin: '#83a598',
        punctuation: '#ebdbb2', regex: '#d3869b', decorator: '#fabd2f',
        text: '#ebdbb2', lineNum: 'rgba(235,219,178,0.15)', chrome: 'rgba(0,0,0,0.2)'
    },
    'vscode-dark': {
        name: 'VS Code Dark',
        card: '#1e1e1e',
        keyword: '#569cd6', string: '#ce9178', comment: '#6a9955',
        number: '#b5cea8', function: '#dcdcaa', type: '#4ec9b0',
        operator: '#d4d4d4', variable: '#9cdcfe', property: '#9cdcfe',
        tag: '#569cd6', attr: '#9cdcfe', builtin: '#4ec9b0',
        punctuation: '#d4d4d4', regex: '#d16969', decorator: '#dcdcaa',
        text: '#d4d4d4', lineNum: 'rgba(212,212,212,0.2)', chrome: 'rgba(0,0,0,0.2)'
    },
    'ayu-dark': {
        name: 'Ayu Dark',
        card: '#0a0e14',
        keyword: '#ff8f40', string: '#c2d94c', comment: '#5c6773',
        number: '#e6b450', function: '#ffb454', type: '#59c2ff',
        operator: '#f29668', variable: '#b3b1ad', property: '#ffb454',
        tag: '#39bae6', attr: '#ffb454', builtin: '#59c2ff',
        punctuation: '#b3b1ad', regex: '#95e6cb', decorator: '#ffb454',
        text: '#b3b1ad', lineNum: 'rgba(179,177,173,0.12)', chrome: 'rgba(0,0,0,0.3)'
    },
    'material-darker': {
        name: 'Material Darker',
        card: '#212121',
        keyword: '#c792ea', string: '#c3e88d', comment: '#545454',
        number: '#f78c6c', function: '#82aaff', type: '#ffcb6b',
        operator: '#89ddff', variable: '#eeffff', property: '#82aaff',
        tag: '#f07178', attr: '#c792ea', builtin: '#ffcb6b',
        punctuation: '#89ddff', regex: '#89ddff', decorator: '#c792ea',
        text: '#eeffff', lineNum: 'rgba(238,255,255,0.12)', chrome: 'rgba(0,0,0,0.2)'
    },
    'night-owl': {
        name: 'Night Owl',
        card: '#011627',
        keyword: '#c792ea', string: '#ecc48d', comment: '#637777',
        number: '#f78c6c', function: '#82aaff', type: '#ffcb6b',
        operator: '#c792ea', variable: '#d6deeb', property: '#7fdbca',
        tag: '#7fdbca', attr: '#addb67', builtin: '#82aaff',
        punctuation: '#d6deeb', regex: '#ecc48d', decorator: '#c792ea',
        text: '#d6deeb', lineNum: 'rgba(214,222,235,0.12)', chrome: 'rgba(0,0,0,0.3)'
    },
    'rose-pine': {
        name: 'Rosé Pine',
        card: '#191724',
        keyword: '#c4a7e7', string: '#9ccfd8', comment: '#6e6a86',
        number: '#ebbcba', function: '#ebbcba', type: '#f6c177',
        operator: '#c4a7e7', variable: '#e0def4', property: '#9ccfd8',
        tag: '#eb6f92', attr: '#c4a7e7', builtin: '#9ccfd8',
        punctuation: '#e0def4', regex: '#9ccfd8', decorator: '#c4a7e7',
        text: '#e0def4', lineNum: 'rgba(224,222,244,0.1)', chrome: 'rgba(0,0,0,0.25)'
    },
    'synthwave-84': {
        name: "Synthwave '84",
        card: '#262335',
        keyword: '#f92aad', string: '#f5f39d', comment: '#6b5f73',
        number: '#ff7edb', function: '#36f9f6', type: '#feaf3d',
        operator: '#f92aad', variable: '#e2e2e2', property: '#36f9f6',
        tag: '#f92aad', attr: '#feaf3d', builtin: '#36f9f6',
        punctuation: '#e2e2e2', regex: '#f5f39d', decorator: '#36f9f6',
        text: '#e2e2e2', lineNum: 'rgba(226,226,226,0.12)', chrome: 'rgba(0,0,0,0.25)'
    }
};

const BACKGROUNDS = {
    'gradient-1': 'linear-gradient(135deg,#667eea,#764ba2)',
    'gradient-2': 'linear-gradient(135deg,#f093fb,#f5576c)',
    'gradient-3': 'linear-gradient(135deg,#4facfe,#00f2fe)',
    'gradient-4': 'linear-gradient(135deg,#43e97b,#38f9d7)',
    'gradient-5': 'linear-gradient(135deg,#fa709a,#fee140)',
    'gradient-6': 'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    'solid-dark': '#1a1a2e',
    'solid-blue': '#0f3460',
    'photo-1': 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=60) center/cover',
    'photo-2': 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=60) center/cover'
};

// Free themes (first 10)
const FREE_THEMES = ['monokai', 'dracula', 'github-dark', 'one-dark', 'nord', 'solarized-dark', 'tokyo-night', 'catppuccin', 'gruvbox', 'vscode-dark'];

// Pro backgrounds
const PRO_BGS = ['photo-1', 'photo-2'];