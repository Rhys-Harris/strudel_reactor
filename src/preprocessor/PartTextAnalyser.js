class PartSlider {
    constructor(name, curValue, lo, hi) {
        this.name = name;
        this.value = curValue;
        this.lo = lo;
        this.hi = hi;
    }
}

class Token {
    constructor(kind, text) {
        this.kind = kind;
        this.text = text;
    }
}

class PartTextLexer {
    constructor(source) {
        this.source = source;
        this.curIndex = 0;
        this.curChar = '0';
    }

    lex() {
        return [];
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
}
