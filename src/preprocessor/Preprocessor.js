import { PartInfo } from "../soundcontroller/Part.js"


// Takes in text and does replacement work
export function PreprocessText(text, soundBoard) {
    // No work to do
    if (soundBoard == null) {
        return text;
    }

    text = soundBoard.getCpmText() + text;

    // Now, 
    return updateParts(text, soundBoard);
}

function lineIsPart(line) {
    // Is this an instrument def?
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
        return ["", false];
    }

    // Any invalid characters in the name?
    const instrumentName = line.substring(0, colonIndex);
    if (!validInstrumentName(instrumentName)) {
        return ["", false];
    }

    return [instrumentName, true];
}

// Returns the new text updated from the sound board
function updateParts(text, soundBoard) {
    // Look through each line
    const lines = text.split(/\r?\n/);
    const finalLines = [];

    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i].trim();

        const [instrumentName, ok] = lineIsPart(line);
        if (!ok) {
            finalLines.push(line);
            continue;
        }

        // Part hasn't been added to soundboard
        const part = soundBoard.getPart(instrumentName);
        if (part == null) {
            finalLines.push(line);
            continue;
        }

        // Skip uncessessary lines
        i += part.numLines;
        
        const newText = part.recreate();
        finalLines.push(newText);
    }

    return finalLines.join("\n");
}

// Gets all the different instrumental parts in the song
export function FindParts(text, soundBoard) {
    // Look through each line
    const lines = text.split(/\r?\n/);

    const parts = [];

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i].trim();

        const [instrumentName, ok] = lineIsPart(line);
        if (!ok) {
            continue;
        }

        const part = new PartInfo(instrumentName, i, lines, soundBoard);

        // Save this instrument
        parts.push(part);
    }

    return parts;
}

// Checks whether a word could be used as the name
// for an instrument
function validInstrumentName(name) {
    for (let i = 0; i < name.length; ++i) {
        if (!validInstrumentNameChar(name[i])) {
            return false;
        }
    }
    return true;
}

// Checks whether a character could be used in an
// instrument's name
function validInstrumentNameChar(char) {
    return (
        (char >= "a" && char <= "z") ||
            (char >= "A" && char <= "Z") ||
            (char >= "0" && char <= "9") ||
            (char === "_")
    );
}
