function runCode() {
    const input = document.getElementById('codeInput').value;
    const output = document.getElementById('output');
  
    try {
      const tokens = tokenize(input);
      // parser and evaluator to be added next
      output.textContent = JSON.stringify(tokens, null, 2);
    } catch (err) {
      output.textContent = `Error: ${err.message}`;
    }
  }
  
  function tokenize(input) {
    // Tokenizer from previous message
    const tokens = [];
    const tokenSpec = [
      ['WHITESPACE', /^\s+/],
      ['LET', /^let/],
      ['PRINT', /^print/],
      ['NUMBER', /^\d+/],
      ['IDENT', /^[a-zA-Z_][a-zA-Z0-9_]*/],
      ['ASSIGN', /^=/],
      ['PLUS', /^\+/],
      ['MINUS', /^-/],
      ['MUL', /^\*/],
      ['DIV', /^\//],
      ['LPAREN', /^\(/],
      ['RPAREN', /^\)/],
      ['SEMICOLON', /^;/],
    ];
  
    let current = input;
    while (current.length > 0) {
      let matched = false;
      for (let [type, regex] of tokenSpec) {
        const match = regex.exec(current);
        if (match) {
          matched = true;
          if (type !== 'WHITESPACE') {
            tokens.push({ type, value: match[0] });
          }
          current = current.slice(match[0].length);
          break;
        }
      }
  
      if (!matched) {
        throw new Error(`Unexpected token: ${current[0]}`);
      }
    }
  
    return tokens;
  }
  