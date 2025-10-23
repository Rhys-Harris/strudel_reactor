import { Part } from "../soundcontroller/Part.js"


// Takes in text and does replacement work
export function PreprocessText(text, soundBoard) {
    // No work to do
    if (soundBoard == null) {
        return text;
    }

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

    for (let i = 0; i < lines.length; ++i) {
        let line = lines[i].trim();

        const [instrumentName, ok] = lineIsPart(line);
        if (!ok) {
            continue;
        }

        // Part hasn't been added to soundboard
        const part = soundBoard.getPart(instrumentName);
        if (part == null) {
            continue;
        }

        if (part.muted) {
            // Add the muting underscore
            line = "_" + line;
            lines[i] = line;
        }
    }
    return lines.join("\n");
}

// Gets all the different instrumental parts in the song
export function FindParts(text) {
    // Look through each line
    const lines = text.split(/\r?\n/);

    const parts = [];

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i].trim();

        const [instrumentName, ok] = lineIsPart(line);
        if (!ok) {
            continue;
        }

        const part = new Part(instrumentName, i);

        // Save this instrument
        parts.push(part);
    }
    return parts;
}

function validInstrumentName(name) {
    for (let i = 0; i < name.length; ++i) {
        if (!validInstrumentNameChar(name.charCodeAt(i))) {
            return false;
        }
    }
    return true;
}

function validInstrumentNameChar(char) {
    const lettera = "a".charCodeAt(0);
    const letterz = "z".charCodeAt(0);
    const letterA = "A".charCodeAt(0);
    const letterZ = "Z".charCodeAt(0);
    const letter_ = "_".charCodeAt(0);
    const letter0 = "0".charCodeAt(0);
    const letter9 = "9".charCodeAt(0);
    return (
        (char >= lettera && char <= letterz) ||
            (char >= letterA && char <= letterZ) ||
            (char >= letter0 && char <= letter9) ||
            (char === letter_)
    );
}

function replaceOldText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

