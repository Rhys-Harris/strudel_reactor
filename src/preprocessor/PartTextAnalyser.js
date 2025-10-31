import { TOKEN_CODES, Token } from './Token';

function isDigit(c) {
    return '0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0);
}

function isAlpha(c) {
    return (
        ('a'.charCodeAt(0) <= c && c <= 'z'.charCodeAt(0)) ||
        ('A'.charCodeAt(0) <= c && c <= 'Z'.charCodeAt(0))
    );
}

function isAlphaNum(c) {
    return isAlpha(c) || isDigit(c);
}

function isAlphaNumOrUnderscore(c) {
    return isAlpha(c) || isDigit(c) || c === "_".charCodeAt(0);
}

function isDigitOrDot(c) {
    return isDigit(c) || c === ".".charCodeAt(0);
}

function isWhitespace(c) {
    switch (c) {
        case " ".charCodeAt(0):
            return true;
        case "\t".charCodeAt(0):
            return true;
        case "\n".charCodeAt(0):
            return true;
        case "\r".charCodeAt(0):
            return true;
        default:
            return false;
    }
}

class PartSlider {
    constructor(name, curValue, lo, hi) {
        this.name = name;
        this.value = curValue;
        this.lo = lo;
        this.hi = hi;
    }
}

class PartTextLexer {
    constructor(source) {
        this.source = source;
        this.curIndex = -1;
        this.curChar = 0;
    }

    prevChar() {
        this.curIndex--;
        this.curChar = this.source[this.curIndex].charCodeAt(0);
    }

    nextChar() {
        this.curIndex++;
        if (this.curIndex >= this.source.length) {
            this.curChar = 0;
            return;
        }
        this.curChar = this.source[this.curIndex].charCodeAt(0);
    }

    nextCharNoWhitespace() {
        this.nextChar();
        while (isWhitespace(this.curChar)) {
            this.nextChar();
        }
    }

    lex() {
        // EXAMPLE INSTRUMENT
        // bassline:
        // note(pick(basslines, bass))
        // .sound("supersaw")
        // .postgain(2)
        // .room(0.6)
        // .lpf(700)
        // .room(0.4)
        // .postgain(pick(gain_patterns, pattern));
        //
        // EXPECTED OUTPUT
        // [
        // IDENTIFIER, L_BRACE, IDENTIFIER, L_BRACE, IDENTIFIER, COMMA,
        // IDENTIFIER, R_BRACE, R_BRACE, DOT, IDENTIFIER, L_BRACE, STRING,
        // R_BRACE, DOT, IDENTIFIER, L_BRACE, NUM, R_BRACE, DOT, IDENTIFIER,
        // L_BRACE, NUM, R_BRACE, DOT, IDENTIFIER, L_BRACE, NUM, R_BRACE, DOT,
        // IDENTIFIER, L_BRACE, NUM, R_BRACE, DOT, IDENTIFIER, L_BRACE,
        // IDENTIFIER, L_BRACE, IDENTIFIER, COMMA, IDENTIFIER, R_BRACE, R_BRACE
        // ]
        
        const tokens = [];

        let tok = this.nextToken();
        while (tok.kind !== TOKEN_CODES.T_ILLEGAL) {
            tokens.push(tok);
            tok = this.nextToken();
        }

        return tokens;
    }

    nextToken() {
        this.nextCharNoWhitespace();

        const tok = new Token(TOKEN_CODES.T_ILLEGAL, "");

        switch (this.curChar) {
            case '('.charCodeAt(0):
                tok.kind = TOKEN_CODES.T_L_BRACE;
                tok.text = "(";
                break;
            case ')'.charCodeAt(0):
                tok.kind = TOKEN_CODES.T_R_BRACE;
                tok.text = ")";
                break;
            case '.'.charCodeAt(0):
                tok.kind = TOKEN_CODES.T_DOT;
                tok.text = ".";
                break;
            case ','.charCodeAt(0):
                tok.kind = TOKEN_CODES.T_COMMA;
                tok.text = ",";
                break;
            case '"'.charCodeAt(0):
                    let finalText = String.fromCharCode(this.curChar);

                    this.nextChar();
                    while (this.curChar !== '"'.charCodeAt(0)) {
                        finalText += String.fromCharCode(this.curChar);
                        this.nextChar();
                        if (this.curChar === 0) {
                            break;
                        }
                    }
                    finalText += String.fromCharCode(this.curChar);

                    tok.kind = TOKEN_CODES.T_STRING;
                    tok.text = finalText;
                break;
            default:
                if (isDigit(this.curChar)) {
                    let finalText = String.fromCharCode(this.curChar);

                    this.nextChar();
                    while (isDigitOrDot(this.curChar)) {
                        finalText += String.fromCharCode(this.curChar);
                        this.nextChar();
                    }
                    this.prevChar();

                    tok.kind = TOKEN_CODES.T_NUM;
                    tok.text = finalText;
                } else if (isAlpha(this.curChar)) {
                    let finalText = String.fromCharCode(this.curChar);

                    this.nextChar();
                    while (isAlphaNumOrUnderscore(this.curChar)) {
                        finalText += String.fromCharCode(this.curChar);
                        this.nextChar();
                    }
                    this.prevChar();

                    tok.kind = TOKEN_CODES.T_IDENTIFIER;
                    tok.text = finalText;
                }
            break;
        }

        return tok;
    }
}

class PartTextParser {
    constructor(source) {
        this.source = source;
    }

    parse() {
        return null;
    }
}

// Takes the text related to an instrument and finds all the controls it
// can create
export function GetInstrumentControls(source) {
    const lexer = new PartTextLexer(source);
    const tokens = lexer.lex();
    console.log(tokens);

    const parser = new PartTextParser(tokens);
    const ast = parser.parse();
    console.log(ast);


    // EXAMPLE INSTRUMENT
    // bassline:
    // note(pick(basslines, bass))
    // .sound("supersaw")
    // .postgain(2)
    // .room(0.6)
    // .lpf(700)
    // .room(0.4)
    // .postgain(pick(gain_patterns, pattern));
    //
    // EXPECTED OUTPUT
    // slider for postgain
    // slider for room
    // slider for lpf
    // slider for room again? (maybe)
}
