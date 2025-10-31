import { PartTextLexer } from './PartTextLexer';
import { PartTextParser } from './PartTextParser';
import { Node, NODE_CODES } from "./Node";

class PartSlider {
    constructor(name, curValue, lo, hi) {
        this.name = name;
        this.value = curValue;
        this.lo = lo;
        this.hi = hi;
    }
}

function searchForControls(ast) {
    const controls = [];

    const startFunc = ast.children[0];
    console.log("Finding controls");
    attemptControl(startFunc, controls);
}

// Recusively searches a function def for possible controls
function attemptControl(func, controls) {
    const funcName = func.children[0].text;
    console.log(funcName);

    // Check args
    for (let i = 2; i < func.children.length-1; i += 2) {
        const childFunc = func.children[i];
        if (childFunc.kind === NODE_CODES.N_FUNC_CALL) {
            attemptControl(childFunc, controls);
        }
    }

    // Check this functions chain
    const chain = func.chain;
    if (chain != null) {
        attemptControl(chain.children[1], controls);
    }
}

// Takes the text related to an instrument and finds all the controls it
// can create
export function GetInstrumentControls(source) {
    const lexer = new PartTextLexer(source);
    const tokens = lexer.lex();
    console.log(tokens);
    if (tokens.length === 0) {
        return [];
    }

    const parser = new PartTextParser(tokens);
    const ast = parser.parse();
    console.log(ast);
    if (ast.children.length === 0) {
        return [];
    }

    const controls = searchForControls(ast);
    console.log(controls);
    return controls;


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
