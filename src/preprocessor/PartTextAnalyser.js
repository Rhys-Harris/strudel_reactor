import { PartTextLexer } from './PartTextLexer';

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
