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
        this.curIndex = -1;

        // What token are we on?
        this.curTok = new Token(TOKEN_CODES.T_ILLEGAL, "")
    }

    // In case we ever need to backtrack
    prevTok() {
        this.curIndex--;
        this.curTok = this.source[this.curIndex];
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

        // Maybe some chaining?
        let chainFunc = this.parseChain();
        while (chainFunc.kind !== NODE_CODES.N_ILLEGAL) {
            parentNode.children.push(chainFunc);
            chainFunc = this.parseChain();
        }

        return parentNode;
    }

    parseFuncCall() {
        return new Node(NODE_CODES.N_ILLEGAL, "");
    }

    parseChain() {
        return new Node(NODE_CODES.N_ILLEGAL, "");
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
