import { PartTextLexer } from './PartTextLexer';
import { PartTextParser } from './PartTextParser';
import { Node, NODE_CODES } from "./Node";

class PartSlider {
    constructor(name, curValue, lo, hi) {
        let value = parseFloat(curValue);
        if (isNaN(value)) {
            value = 0.0;
        }

        this.name = name;
        this.value = value;
        this.lo = lo;
        this.hi = hi;
    }

    setValue(curValue) {
        let value = parseFloat(curValue);
        if (!isNaN(value)) {
            this.value = value;
        }

    }
}

function searchForControls(ast) {
    const controls = [];

    const startFunc = ast.children[0];
    attemptControl(startFunc, controls);

    return controls;
}

// Recusively searches a function def for possible controls
function attemptControl(func, controls) {
    // See if we can use this like a slider
    attemptCreateSlider(func, controls);

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

function attemptCreateSlider(func, controls) {
    // Too many or too little args (expecting a single one)
    if (func.children.length !== 4) {
        return;
    }

    const arg = func.children[2];
    
    // Can't be used on strings or similar, only numbers
    if (arg.kind !== NODE_CODES.N_NUM) {
        return;
    }

    const funcName = func.children[0].text;

    if (controlAlreadyExists(funcName, controls)) {
        return;
    }

    // Add the new slider! (assuming a reasonable range)
    controls.push(new PartSlider(funcName, arg.text, 0.0, 100.0));
}

function controlAlreadyExists(name, controls) {
    for (let i = 0; i < controls.length; ++i) {
        if (controls[i].name === name) {
            return true;
        }
    }
    return false;
}

// Takes the text related to an instrument and finds all the controls it
// can create
export function GetInstrumentControls(source) {
    const lexer = new PartTextLexer(source);
    const tokens = lexer.lex();
    if (tokens.length === 0) {
        return [];
    }

    const parser = new PartTextParser(tokens);
    const ast = parser.parse();
    if (ast.children.length === 0) {
        return [];
    }

    const controls = searchForControls(ast);
    return controls;
}
