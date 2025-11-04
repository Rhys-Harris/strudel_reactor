import { PartTextLexer } from './PartTextLexer';
import { PartTextParser } from './PartTextParser';
import { NODE_CODES } from "./Node";
import PartSlider from "../soundcontroller/Slider";

// Used to reconstruct final text
let textBuffer = "";

function searchForControls(ast) {
    const controls = [];

    const startFunc = ast.children[0];
    attemptControl(startFunc, controls);

    // Add a default volume slider
    controls.push(new PartSlider("volume", "1.0", 0.0, 10.0, textBuffer + "\n\t.gain("));
    controls[controls.length-1].postText = ")\n";
    textBuffer = "";

    return controls;
}

// Recusively searches a function def for possible controls
function attemptControl(func, controls) {
    textBuffer += func.children[0].text + "(";

    // See if we can use this like a slider
    if (!attemptCreateSlider(func, controls)) {
        // Check args
        for (let i = 2; i < func.children.length-1; i += 2) {
            const childFunc = func.children[i];
            if (childFunc.kind === NODE_CODES.N_FUNC_CALL) {
                attemptControl(childFunc, controls);
                textBuffer += ",";
            } else {
                textBuffer += func.children[i].getText() + ",";
            }
        }
        if (textBuffer[textBuffer.length-1] === ",") {
            textBuffer = textBuffer.substring(0, textBuffer.length-1);
        }
    }

    textBuffer += ")";

    // Check this functions chain
    const chain = func.chain;
    if (chain != null) {
        textBuffer += "\n\t.";
        attemptControl(chain.children[1], controls);
    }
}

function attemptCreateSlider(func, controls) {
    // Too many or too little args (expecting a single one)
    if (func.children.length !== 4) {
        // Just add the whole func
        return false;
    }

    const arg = func.children[2];
    
    // Can't be used on strings or similar, only numbers
    if (arg.kind !== NODE_CODES.N_NUM) {
        return false;
    }

    const funcName = func.children[0].text;

    if (controlAlreadyExists(funcName, controls)) {
        return false;
    }

    // Add the new slider! (assuming a reasonable range)
    controls.push(new PartSlider(funcName, arg.text, 0.0, 100.0, textBuffer));
    textBuffer = "";
    return true;
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
