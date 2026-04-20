// CodeSnap — Syntax Highlighter (lightweight, regex-based)
// Supports: JS, TS, Python, Rust, Go, Java, C++, C#, Ruby, PHP, Swift, Kotlin, SQL, HTML, CSS, Bash, JSON, YAML, Markdown

const GRAMMARS = {
    javascript: {
        keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|this|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|delete|void|with|debugger|super|static|get|set)\b/g,
        builtins: /\b(console|document|window|Math|Array|Object|String|Number|Boolean|Date|RegExp|Map|Set|Promise|JSON|parseInt|parseFloat|isNaN|undefined|null|true|false|NaN|Infinity|Error|TypeError|RangeError)\b/g,
        strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        regex: /\/(?![/*])(?:[^/\\\n]|\\.)*\/[gimsuy]*/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    typescript: {
        keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|this|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|yield|type|interface|enum|implements|declare|namespace|abstract|as|is|keyof|readonly|private|protected|public|super|static|get|set)\b/g,
        builtins: /\b(console|document|window|Math|Array|Object|String|Number|Boolean|Date|RegExp|Map|Set|Promise|JSON|Record|Partial|Required|Readonly|Pick|Omit|Exclude|Extract|NonNullable|ReturnType|InstanceType|Parameters|ConstructorParameters|undefined|null|true|false|NaN|Infinity)\b/g,
        types: /\b(string|number|boolean|void|never|any|unknown|bigint|symbol)\b/g,
        strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    python: {
        keywords: /\b(def|class|return|if|elif|else|for|while|break|continue|import|from|as|try|except|finally|raise|with|yield|lambda|pass|global|nonlocal|assert|del|in|not|and|or|is|True|False|None)\b/g,
        builtins: /\b(print|len|range|int|str|float|list|dict|tuple|set|type|isinstance|enumerate|zip|map|filter|sorted|reversed|input|open|super|property|staticmethod|classmethod|abs|round|min|max|sum|any|all|hasattr|getattr|setattr)\b/g,
        strings: /(["']{3}[\s\S]*?["']{3}|f["'](?:[^"']|\\.)*["']|["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /#.*$/gm,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    rust: {
        keywords: /\b(fn|let|mut|const|if|else|for|while|loop|match|return|struct|enum|impl|trait|pub|use|mod|self|Self|super|where|as|ref|move|async|await|unsafe|dyn|type|static|extern|crate)\b/g,
        builtins: /\b(Option|Result|Some|None|Ok|Err|Vec|String|Box|Rc|Arc|HashMap|HashSet|println|format|panic|unimplemented|todo|derive|Copy|Clone|Debug|Default|Eq|PartialEq|Ord|PartialOrd|Hash|Send|Sync)\b/g,
        types: /\b(i8|i16|i32|i64|i128|isize|u8|u16|u32|u64|u128|usize|f32|f64|bool|char|str|never)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?(_\d+)*\b/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    go: {
        keywords: /\b(func|var|const|if|else|for|range|switch|case|default|break|continue|return|package|import|type|struct|interface|map|chan|go|defer|select|fallthrough|defer)\b/g,
        builtins: /\b(make|new|len|cap|append|copy|delete|close|panic|recover|print|println|true|false|nil|iota|error|string|int|int8|int16|int32|int64|uint|float32|float64|bool|byte|rune)\b/g,
        strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    java: {
        keywords: /\b(public|private|protected|static|final|abstract|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|int|boolean|this|super|null|true|false|instanceof|synchronized|volatile|transient|native|enum|assert|default)\b/g,
        builtins: /\b(System|String|Integer|Long|Double|Float|Boolean|Object|Class|Thread|Runnable|Exception|ArrayList|HashMap|List|Map|Set|Queue|Stack|Arrays|Collections|Math|Integer|Character|Byte|Short|Override|Deprecated|SuppressWarnings)\b/g,
        types: /\b(int|long|double|float|short|byte|char|boolean|void|var)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?[fFdDlL]?\b/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    cpp: {
        keywords: /\b(auto|break|case|class|const|continue|default|do|else|enum|extern|for|if|inline|namespace|new|operator|private|protected|public|return|sizeof|static|struct|switch|template|this|typedef|using|virtual|void|while|try|catch|throw|nullptr|override|final|constexpr|decltype|noexcept|static_assert|thread_local|alignas|alignof|char16_t|char32_t|concept|requires|co_await|co_return|co_yield)\b/g,
        builtins: /\b(std|cout|cin|endl|string|vector|map|set|pair|tuple|array|unique_ptr|shared_ptr|make_unique|make_shared|move|forward|size_t|uint8_t|int8_t|int32_t|int64_t|true|false|NULL)\b/g,
        types: /\b(int|long|double|float|short|char|bool|unsigned|signed|void|wchar_t|auto|char8_t)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?[fFlLuU]?\b/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    csharp: {
        keywords: /\b(abstract|as|base|break|case|catch|class|const|continue|default|do|else|event|explicit|extern|finally|for|foreach|if|implicit|in|interface|internal|is|lock|namespace|new|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|static|struct|switch|this|throw|try|typeof|using|var|virtual|void|volatile|while|async|await|yield|true|false|null)\b/g,
        builtins: /\b(Console|String|Int32|Int64|Double|Boolean|Object|Task|List|Dictionary|HashSet|Array|Enumerable|LINQ|Math|Environment|Convert|string|int|double|float|bool|long|byte|char|decimal|object|dynamic|var|void|Task|IEnumerable|IQueryable|EventArgs|Attribute|Exception|DateTime|Guid|StringBuilder)\b/g,
        types: /\b(int|long|double|float|short|byte|char|bool|decimal|uint|ulong|ushort|sbyte|string|object|dynamic|var|void|nint|nuint)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?[fFmMdDlLuU]?\b/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    ruby: {
        keywords: /\b(def|end|class|module|if|else|elsif|unless|while|until|for|do|begin|rescue|ensure|raise|return|yield|block_given|require|include|extend|attr_accessor|attr_reader|attr_writer|self|super|nil|true|false|and|or|not|then|when|case|break|next|redo|retry|defined\?|alias|undef|BEGIN|END|lambda|proc)\b/g,
        builtins: /\b(puts|print|gets|chomp|to_s|to_i|to_f|length|each|map|select|reject|reduce|inject|sort|flatten|uniq|compact|join|split|rand|sleep|require|include|Array|Hash|String|Integer|Float|Symbol|Proc|Lambda|Method|Enumerator|Range|Regexp|File|Dir|IO|Kernel|Object|BasicObject|Exception|StandardError|ArgumentError|TypeError|NameError|NoMethodError)\b/g,
        strings: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /#.*$/gm,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        decorators: /@[\w]+|@@[\w]+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    php: {
        keywords: /\b(function|class|public|private|protected|static|abstract|interface|extends|implements|new|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|try|catch|finally|throw|use|namespace|require|include|echo|print|var|const|null|true|false|array|callable|iterable|void|never|mixed)\b/g,
        builtins: /\b(echo|print|var_dump|print_r|isset|empty|unset|array_push|array_merge|count|strlen|strpos|substr|str_replace|preg_match|json_encode|json_decode|file_get_contents|file_put_contents|header|session_start|mysqli_connect|PDO|DateTime|DateInterval|Exception|Error|TypeError|ArgumentCountError)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$|#.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        variables: /\$\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    swift: {
        keywords: /\b(var|let|func|class|struct|enum|protocol|extension|if|else|for|while|switch|case|return|break|continue|import|guard|typealias|associatedtype|self|Self|super|nil|true|false|try|catch|throw|throws|rethrows|as|is|in|inout|override|private|public|internal|open|fileprivate|static|final|lazy|weak|unowned|mutating|nonmutating|required|convenience|dynamic|subscript|optional|where|defer|willSet|didSet|set|get|some|any|async|await|actor|distributed|isolated|nonisolated|consuming|borrowing|copy|discardableResult|objc|MainActor|Sendable|Codable|Encodable|Decodable|Equatable|Hashable|Comparable)\b/g,
        builtins: /\b(print|debugPrint|fatalError|assert|precondition|expect|type|Int|Double|Float|String|Bool|Array|Dictionary|Set|Optional|Result|URL|Data|Date|UUID|NotificationCenter|UserDefaults|Bundle|FileManager|DispatchQueue|Task|withCheckedContinuation|withUnsafePointer|unsafeBitCast)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    kotlin: {
        keywords: /\b(val|var|fun|class|interface|object|if|else|when|for|while|do|return|break|continue|import|package|is|as|in|override|open|abstract|sealed|data|inner|companion|init|constructor|super|this|null|true|false|typealias|reified|inline|noinline|crossinline|suspend|tailrec|operator|infix|annotation|lateinit|by|lazy|observable|delegate|dynamic|expect|actual|internal|private|protected|public|external|field|property|receiver|param|setparam|get|set|suspend|coroutine|yield|await|async|launch|run|Sequence|Flow|Channel)\b/g,
        builtins: /\b(print|println|ArrayOf|listOf|setOf|mapOf|mutableListOf|mutableSetOf|mutableMapOf|Pair|Triple|Result|Sequence|Flow|Channel|Dispatchers|CoroutineScope|ViewModel|LiveData|StateFlow|SharedFlow|collect|emit|subscribe|observe|toInt|toString|toLong|toDouble|toFloat|toBoolean|length|size|isEmpty|isBlank|contains|filter|map|forEach|apply|let|also|run|with|takeIf|takeUnless|when|rangeTo|downTo|step|until)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /\/\/.*$/gm,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /\b\d+\.?\d*([eE][+-]?\d+)?[fFlL]?\b/g,
        decorators: /@\w+/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    sql: {
        keywords: /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|NOT|IN|BETWEEN|LIKE|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|UNION|ALL|AS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|EXISTS|CASE|WHEN|THEN|ELSE|END|IS|NULL|TRUE|FALSE|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|UNIQUE|DEFAULT|CHECK|ASC|DESC|BOOLEAN|INTEGER|VARCHAR|TEXT|FLOAT|DOUBLE|DECIMAL|DATE|TIMESTAMP|SERIAL|BIGSERIAL)\b/gi,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /--.*$/gm,
        numbers: /\b\d+\.?\d*\b/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    html: {
        tags: /(&lt;\/?)([\w-]+)/g,
        attrs: /\b([\w-]+)=/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_multi: /&lt;!--[\s\S]*?--&gt;/g,
    },
    css: {
        keywords: /@(import|media|keyframes|font-face|supports|layer|container|charset|namespace|page)\b/g,
        properties: /\b(color|background|margin|padding|border|font|display|position|top|left|right|bottom|width|height|max-width|min-width|flex|grid|gap|overflow|opacity|z-index|transition|animation|transform|box-shadow|text-align|text-decoration|line-height|letter-spacing|cursor|outline|visibility|float|clear|content|list-style|table-layout|vertical-align|white-space|word-wrap|word-break|box-sizing|resize|appearance|backdrop-filter|filter|mix-blend-mode|pointer-events|user-select|scroll-behavior|aspect-ratio|container-type|container-name|gap|row-gap|column-gap|place-content|place-items|place-self)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_multi: /\/\*[\s\S]*?\*\//g,
        numbers: /#[0-9a-fA-F]{3,8}\b|\b\d+\.?\d*(px|em|rem|vh|vw|%|fr|deg|s|ms|cm|mm|in|pt|pc|ch|ex|cap|ic|lh|rlh|vi|vb)?\b/g,
        selectors: /[.#][\w-]+/g,
    },
    bash: {
        keywords: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|break|continue|local|export|source|alias|unalias|set|unset|shift|read|echo|printf|cd|pwd|ls|mkdir|rmdir|cp|mv|rm|cat|grep|sed|awk|find|xargs|sort|uniq|wc|head|tail|tee|curl|wget|chmod|chown|sudo|apt|yum|npm|pip|git|docker|kubectl|true|false)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /#.*$/gm,
        numbers: /\b\d+\b/g,
        variables: /\$\{?[\w#*@?!-]+\}?/g,
        functions: /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    },
    json: {
        keys: /("[\w\-\.]+")\s*:/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        numbers: /\b-?\d+\.?\d*([eE][+-]?\d+)?\b/g,
        keywords: /\b(true|false|null)\b/g,
    },
    yaml: {
        keys: /^([\w\-]+):/gm,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments_single: /#.*$/gm,
        numbers: /\b\d+\.?\d*\b/g,
        keywords: /\b(true|false|null|yes|no|on|off)\b/gi,
    },
    markdown: {
        headers: /^#{1,6}\s.+$/gm,
        bold: /\*\*[^*]+\*\*/g,
        italic: /\*[^*]+\*/g,
        code_inline: /`[^`]+`/g,
        code_block: /```[\s\S]*?```/g,
        links: /\[([^\]]+)\]\(([^)]+)\)/g,
        lists: /^\s*[-*+]\s/gm,
    }
};

function highlight(code, lang) {
    const g = GRAMMARS[lang] || GRAMMARS.javascript;
    let html = escapeHtml(code);

    // Apply highlights — order matters (strings/comments first so they don't get overwritten)
    html = applyToken(html, g.comments_multi, 'tok-comment');
    html = applyToken(html, g.comments_single, 'tok-comment');
    html = applyToken(html, g.strings, 'tok-string');
    html = applyToken(html, g.numbers, 'tok-number');
    if (g.keywords) html = applyToken(html, g.keywords, 'tok-keyword');
    if (g.builtins) html = applyToken(html, g.builtins, 'tok-builtin');
    if (g.types) html = applyToken(html, g.types, 'tok-type');
    if (g.functions) html = applyToken(html, g.functions, 'tok-function');
    if (g.decorators) html = applyToken(html, g.decorators, 'tok-decorator');
    if (g.variables) html = applyToken(html, g.variables, 'tok-variable');
    if (g.regex) html = applyToken(html, g.regex, 'tok-regex');
    if (g.tags) html = applyToken(html, g.tags, 'tok-tag');
    if (g.attrs) html = applyToken(html, g.attrs, 'tok-attr');
    if (g.selectors) html = applyToken(html, g.selectors, 'tok-function');
    if (g.keys) html = applyToken(html, g.keys, 'tok-property');
    if (g.headers) html = applyToken(html, g.headers, 'tok-keyword');
    if (g.bold) html = applyToken(html, g.bold, 'tok-keyword');
    if (g.code_inline) html = applyToken(html, g.code_inline, 'tok-string');
    if (g.links) html = applyToken(html, g.links, 'tok-string');

    return html;
}

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyToken(html, regex, cls) {
    if (!regex) return html;
    // Reset regex state
    const r = new RegExp(regex.source, regex.flags);
    return html.replace(r, (match) => `<span class="${cls}">${match}</span>`);
}