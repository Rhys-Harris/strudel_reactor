
// Takes in text and does replacement work
export function PreprocessText(text) {
    const parts = findParts(text);
    console.log(parts);
    return text.replaceAll('<p1_Radio>', replaceOldText);
}

// Gets all the different instrumental parts in the song
function findParts(text) {
    // Look through each line
    const lines = text.split(/\r?\n/);

    const parts = [];

    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i].trim();

        // Is this an instrument def?
        const colonIndex = line.indexOf(":");
        if (colonIndex === -1) {
            continue;
        }

        // Any invalid characters in the name?
        const instrumentName = line.substring(0, colonIndex);
        if (!validInstrumentName(instrumentName)) {
            continue;
        }

        // Save this instrument
        parts.push(instrumentName);
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

