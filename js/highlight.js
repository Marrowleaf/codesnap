// CodeSnap — Syntax Highlighter v3 (character scanner, no regex collisions)

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Main highlight: takes code string + language, returns array of HTML strings (one per line)
function highlight(code, lang) {
    const theme = THEMES[lang] || THEMES.javascript;
    const g = GRAMMARS[lang] || GRAMMARS.javascript;
    const lines = code.split('\n');
    return lines.map(line => highlightLine(line, g, theme));
}

function highlightLine(line, g, theme) {
    const tokens = tokenize(line, g);
    return tokens.map(t => {
        const text = escapeHtml(t.text);
        if (t.type === 'text') return text;
        return `<span class="tok-${t.type}">${text}</span>`;
    }).join('');
}

function tokenize(line, g) {
    const tokens = [];
    let i = 0;
    const len = line.length;

    while (i < len) {
        // 1. Try single-line comment
        if (g.comments_single) {
            const m = tryMatch(line, i, g.comments_single);
            if (m) { tokens.push({ type: 'comment', text: m }); i += m.length; continue; }
        }

        // 2. Try strings (", ', `)
        if (g.strings) {
            const ch = line[i];
            if (ch === '"' || ch === "'" || ch === '`') {
                const str = readString(line, i, ch);
                tokens.push({ type: 'string', text: str });
                i += str.length;
                continue;
            }
        }

        // 3. Try numbers
        if (g.numbers) {
            const numMatch = line.slice(i).match(/^(\d+\.?\d*([eE][+-]?\d+)?)/);
            // Only match if preceded by non-word char or start
            if (numMatch && (i === 0 || /[\s\(\[\{,;:=+\-*/<>!&|^~%]/.test(line[i-1]))) {
                // But avoid matching numbers inside words
                if (i === 0 || !/[a-zA-Z_]/.test(line[i-1])) {
                    tokens.push({ type: 'number', text: numMatch[1] });
                    i += numMatch[1].length;
                    continue;
                }
            }
        }

        // 4. Try word-based tokens (keywords, builtins, etc.)
        const wordMatch = line.slice(i).match(/^([a-zA-Z_]\w*)/);
        if (wordMatch) {
            const word = wordMatch[1];
            let type = null;

            // Check each category in priority order
            if (g.keywords && testWord(g.keywords, word)) type = 'keyword';
            else if (g.builtins && testWord(g.builtins, word)) type = 'builtin';
            else if (g.types && testWord(g.types, word)) type = 'type';

            // Check if followed by ( — likely a function call
            if (type === null || type === 'builtin') {
                const afterWord = line.slice(i + word.length).trimStart();
                if (afterWord[0] === '(') {
                    // It's a function call — only override if it's not a keyword
                    if (g.functions && type !== 'keyword') type = 'function';
                }
            }

            // Decorators start with @
            if (g.decorators && word === line.slice(i).match(/^@\w*/)[0].slice(1)) {
                // handled below
            }

            tokens.push({ type: type || 'text', text: word });
            i += word.length;
            continue;
        }

        // 5. Try @decorator
        if (line[i] === '@') {
            const decMatch = line.slice(i).match(/^@\w+/);
            if (decMatch) {
                tokens.push({ type: 'decorator', text: decMatch[0] });
                i += decMatch[0].length;
                continue;
            }
        }

        // 6. Try $variable (PHP/Ruby)
        if (g.variables && line[i] === '$') {
            const varMatch = line.slice(i).match(/^\$\w+/);
            if (varMatch) {
                tokens.push({ type: 'variable', text: varMatch[0] });
                i += varMatch[0].length;
                continue;
            }
        }

        // 7. Operators and punctuation — just emit as text
        tokens.push({ type: 'text', text: line[i] });
        i++;
    }

    // Merge adjacent text tokens
    return mergeTokens(tokens);
}

function tryMatch(line, start, regex) {
    const r = new RegExp('^(?:' + regex.source + ')', regex.flags.replace('g', ''));
    const m = line.slice(start).match(r);
    return m ? m[0] : null;
}

function testWord(regex, word) {
    const r = new RegExp('^(?:' + regex.source + ')$', regex.flags.replace('g', '').replace('m', ''));
    return r.test(word);
}

function readString(line, start, quote) {
    let i = start + 1;
    const len = line.length;
    while (i < len) {
        if (line[i] === '\\') { i += 2; continue; }
        if (line[i] === quote) { return line.slice(start, i + 1); }
        i++;
    }
    return line.slice(start); // unclosed string
}

function mergeTokens(tokens) {
    const result = [];
    for (const t of tokens) {
        if (result.length > 0 && result[result.length - 1].type === t.type) {
            result[result.length - 1].text += t.text;
        } else {
            result.push({ ...t });
        }
    }
    return result;
}