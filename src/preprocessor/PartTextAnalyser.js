import { PartTextLexer } from './PartTextLexer';
import { PartTextParser } from './PartTextParser';
import { NODE_CODES } from "./Node";
import PartSlider from "../soundcontroller/Slider";

// Used to reconstruct final text
let textBuffer = "";

// Takes the text related to an instrument and finds all the controls it
// can create
export function GetInstrumentControls(source, soundBoard) {
    // Get all the tokens in the source
    const lexer = new PartTextLexer(source);
    const tokens = lexer.lex();
    if (tokens.length === 0) {
        return [];
    }

    // Convert the token list into an abstract syntax tree
    const parser = new PartTextParser(tokens);
    const ast = parser.parse();
    if (ast.children.length === 0) {
        return [];
    }

    // Get all the controls that could be created
    const controls = searchForControls(ast, soundBoard);
    return controls;
}

// Searches through an AST to find any controls
// that could possible be created
function searchForControls(ast, soundBoard) {
    // Start with an empty list
    const controls = [];

    // Start with the first function in the chain
    const startFunc = ast.children[0];
    recSearchForControls(startFunc, controls, soundBoard);

    // Add a default volume slider if not already added
    addDefaultVolumeControl(controls, soundBoard);
    controls[controls.length-1].postText = textBuffer;
    textBuffer = "";

    return controls;
}

// Recusively searches a function def for possible controls
function recSearchForControls(func, controls, soundBoard) {
    // Make sure this function appears
    // in the final text
    textBuffer += func.children[0].text + "(";

    // See if we can use this like a slider
    if (!attemptCreateSlider(func, controls, soundBoard)) {
        // Couldn't create a slider, instead,
        // try to make sliders on each argument

        // Check args
        for (let i = 2; i < func.children.length-1; i += 2) {
            const childFunc = func.children[i];

            // If it's a function, it's a candidate
            if (childFunc.kind === NODE_CODES.N_FUNC_CALL) {
                // Attempt slider creation
                recSearchForControls(childFunc, controls, soundBoard);
                textBuffer += ",";

            } else {
                // Still maintain the text of the arg
                textBuffer += func.children[i].getText() + ",";
            }
        }

        // Remove an extra comma (if any)
        if (textBuffer[textBuffer.length-1] === ",") {
            textBuffer = textBuffer.substring(0, textBuffer.length-1);
        }
    }

    // Close the function
    textBuffer += ")";

    // Check this functions chain
    const chain = func.chain;
    if (chain != null) {
        // Chain will be on newline
        textBuffer += "\n\t.";

        // Search the function in the chain
        recSearchForControls(chain.children[1], controls, soundBoard);
    }
}

function attemptCreateSlider(func, controls, soundBoard) {
    // Too many or too little args (expecting a single one)
    if (func.children.length !== 4) {
        return false;
    }

    const arg = func.children[2];
    
    // Can't be used on strings or similar, only numbers
    if (arg.kind !== NODE_CODES.N_NUM) {
        return false;
    }

    const funcName = func.children[0].text;

    // Don't duplicate
    if (controlAlreadyExists(funcName, controls)) {
        return false;
    }

    // Add the new slider! (assuming a reasonable range)
    const [lo, hi] = soundBoard.getSliderDefaultRange(funcName);
    controls.push(new PartSlider(funcName, arg.text, lo, hi, textBuffer));

    // Clear the buffer, since it is used in the slider
    textBuffer = "";
    return true;
}

// Gives a volume slider to each individual intstrument
function addDefaultVolumeControl(controls, soundBoard) {
    // If it already has one, don't add one
    if (controlAlreadyExists("gain")) {
        return;
    }

    const [lo, hi] = soundBoard.getSliderDefaultRange("gain");

    // Add the volume slider
    controls.push(new PartSlider("gain", "1.0", lo, hi, textBuffer + "\n\t.gain("));

    // Ensure to cap off the instrument correctly
    textBuffer = ")\n";
}

// Simply searches the controls list for
// a control with the given name. This
// avoids duplicate controls
function controlAlreadyExists(name, controls) {
    for (let i = 0; i < controls.length; ++i) {
        if (controls[i].name === name) {
            return true;
        }
    }
    return false;
}
