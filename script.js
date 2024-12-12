
// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers"],
    extraKeys: {
        "Ctrl-Space": "autocomplete"
    }
});

function runCode() {
    const code = editor.getValue();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
    // Create a new console.log function to capture output
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        const output = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
        ).join(' ');
        outputDiv.innerHTML += `<pre>${output}</pre>`;
        originalConsoleLog.apply(console, args);
    };

    try {
        // Execute the code
        eval(code);
    } catch (error) {
        // Display any errors in red
        outputDiv.innerHTML += `<pre style="color: #ff5555">${error}</pre>`;
    }

    // Restore original console.log
    console.log = originalConsoleLog;
}
