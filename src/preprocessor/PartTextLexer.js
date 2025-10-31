import { TOKEN_CODES, Token } from "./Token";

// Helper functions for figuring out what a character is
function isDigit(c) {
    return '0' <= c && c <= '9';
}

function isAlpha(c) {
    return (
        ('a' <= c && c <= 'z') ||
        ('A' <= c && c <= 'Z')
    );
}

function isAlphaNum(c) {
    return isAlpha(c) || isDigit(c);
}

function isAlphaNumOrUnderscore(c) {
    return isAlpha(c) || isDigit(c) || c === "_";
}

function isDigitOrDot(c) {
    return isDigit(c) || c === ".";
}

function isWhitespace(c) {
    switch (c) {
        case " ":
            return true;
        case "\t":
            return true;
        case "\n":
            return true;
        case "\r":
            return true;
        default:
            return false;
    }
}

export class PartTextLexer {
    constructor(source) {
        // The text to lex
        this.source = source;

        // Where in the text we currently are
        this.curIndex = -1;

        // What is at this place in the text?
        this.curChar = 0;
    }

    // In case we ever need to backtrack
    prevChar() {
        this.curIndex--;
        this.curChar = this.source[this.curIndex];
    }

    // Moves on to the next character in the source
    nextChar() {
        this.curIndex++;

        // Don't error if we go out of bounds,
        // just give back dummy value
        if (this.curIndex >= this.source.length) {
            this.curChar = 0;
            return;
        }
        this.curChar = this.source[this.curIndex];
    }

    // Most uses ignore whitespace, so this is
    // usually prefered over just calling `nextChar`
    nextCharNoWhitespace() {
        this.nextChar();
        while (isWhitespace(this.curChar)) {
            this.nextChar();
        }
    }

    // Returns a list of all the tokens found
    lex() {
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

        // Default to invalid token
        const tok = new Token(TOKEN_CODES.T_ILLEGAL, "");

        switch (this.curChar) {
            // Simple cases
            case '(':
                tok.kind = TOKEN_CODES.T_L_BRACE;
                tok.text = "(";
                break;
            case ')':
                tok.kind = TOKEN_CODES.T_R_BRACE;
                tok.text = ")";
                break;
            case '.':
                tok.kind = TOKEN_CODES.T_DOT;
                tok.text = ".";
                break;
            case ',':
                tok.kind = TOKEN_CODES.T_COMMA;
                tok.text = ",";
                break;

            // Full string
            case '"':
                let finalText = this.curChar;

                this.nextChar();

                // While the string hasn't been terminated
                while (this.curChar !== '"') {
                    finalText += this.curChar;
                    this.nextChar();

                    // Out of bounds of source?
                    if (this.curChar === 0) {
                        // Act like we finished with terminated string
                        break;
                    }
                }

                finalText += this.curChar;

                tok.kind = TOKEN_CODES.T_STRING;
                tok.text = finalText;
                break;

            // Harder cases
            default:
                if (isDigit(this.curChar)) { // Numbers
                    let finalText = this.curChar;

                    this.nextChar();

                    // Include dots for float values
                    while (isDigitOrDot(this.curChar)) {
                        finalText += this.curChar;
                        this.nextChar();
                    }

                    // Make sure to backtrack so that we end
                    // on the last digit
                    this.prevChar();

                    tok.kind = TOKEN_CODES.T_NUM;
                    tok.text = finalText;

                } else if (isAlpha(this.curChar)) { // Identifiers
                    let finalText = this.curChar;

                    this.nextChar();
                    while (isAlphaNumOrUnderscore(this.curChar)) {
                        finalText += this.curChar;
                        this.nextChar();
                    }

                    // Make sure to backtrack so that we end
                    // on the last character
                    this.prevChar();

                    tok.kind = TOKEN_CODES.T_IDENTIFIER;
                    tok.text = finalText;
                }
            break;
        }

        return tok;
    }
}
