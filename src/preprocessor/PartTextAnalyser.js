import { PartTextLexer } from './PartTextLexer';
import { NODE_CODES, Node } from './Node';
import { TOKEN_CODES, Token } from './Token';

class PartSlider {
    constructor(name, curValue, lo, hi) {
        this.name = name;
        this.value = curValue;
        this.lo = lo;
        this.hi = hi;
    }
}

class PartTextParser {
    constructor(source) {
        // List of tokens to parse
        this.source = source;

        // Where in the list we currently are
        this.curIndex = 0;

        // What token are we on?
        this.curTok = source[0];
    }

    // In case we ever need to backtrack
    prevTok() {
        this.curIndex--;
        this.curTok = this.source[this.curIndex];
    }

    // In case we need more context
    peekTok() {
        const index = this.curIndex+1;
        if (index >= this.source.length) {
            return  new Token(TOKEN_CODES.T_ILLEGAL, "");
        }
        return this.source[index];
    }

    // Moves on to the next token in the source
    nextTok() {
        this.curIndex++;

        // Don't error if we go out of bounds,
        // just give back dummy value
        if (this.curIndex >= this.source.length) {
            this.curTok = new Token(TOKEN_CODES.T_ILLEGAL, "");
            return;
        }
        this.curTok = this.source[this.curIndex];
    }

    parse() {
        const parentNode = new Node(NODE_CODES.N_INSTRUMENT, "");

        // Expect that an instrument starts with a single function call
        const startFunc = this.parseFuncCall();
        if (startFunc.kind === NODE_CODES.N_ILLEGAL) {
            return parentNode;
        }
        parentNode.children.push(startFunc);
        this.nextTok();

        // Maybe some chaining?
        let chainFunc = this.parseChain();
        while (chainFunc.kind !== NODE_CODES.N_ILLEGAL) {
            parentNode.children.push(chainFunc);
            this.nextTok();
            chainFunc = this.parseChain();
        }

        return parentNode;
    }

    parseFuncCall() {
        const funcCall = new Node(NODE_CODES.N_FUNC_CALL, "");
    
        // Name of the function
        if (this.curTok.kind !== TOKEN_CODES.T_IDENTIFIER) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(new Node(NODE_CODES.N_IDENTIFIER, this.curTok.text));
        this.nextTok();
    
        // Opening brace
        if (this.curTok.kind !== TOKEN_CODES.T_L_BRACE) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(new Node(NODE_CODES.N_L_BRACE, this.curTok.text));
        this.nextTok();

        // Argument within the brackets
        const value = this.parseValue();
        if (value.kind === NODE_CODES.N_ILLEGAL) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(value);
        this.nextTok();

        while (this.curTok.kind === TOKEN_CODES.T_COMMA) {
            funcCall.children.push(new Node(NODE_CODES.N_COMMA, this.curTok.text));
            this.nextTok();

            // Next argument within the brackets
            const value = this.parseValue();
            if (value.kind === NODE_CODES.N_ILLEGAL) {
                return new Node(NODE_CODES.N_ILLEGAL, "");
            }
            funcCall.children.push(value);
            this.nextTok();
        }

        // Closing brace
        if (this.curTok.kind !== TOKEN_CODES.T_R_BRACE) {
            return new Node(NODE_CODES.N_ILLEGAL, "");
        }
        funcCall.children.push(new Node(NODE_CODES.N_R_BRACE, this.curTok.text));

        return funcCall;
    }

    parseChain() {
        return new Node(NODE_CODES.N_ILLEGAL, "");
    }

    // Anything that can be a value (e.g., num, string, function call)
    parseValue() {
        switch (this.curTok.kind) {
            case TOKEN_CODES.T_NUM:
                return new Node(NODE_CODES.N_NUM, this.curTok.text);
            case TOKEN_CODES.T_STRING:
                return new Node(NODE_CODES.N_STRING, this.curTok.text);
            case TOKEN_CODES.T_IDENTIFIER:
                if (this.peekTok().kind === TOKEN_CODES.T_L_BRACE) {
                    return this.parseFuncCall();
                } else {
                    return new Node(NODE_CODES.N_IDENTIFIER, this.curTok.text);
                }
            default:
                return new Node(NODE_CODES.N_ILLEGAL, "");
        }
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
