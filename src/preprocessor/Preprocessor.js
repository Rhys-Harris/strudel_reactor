
// Takes in text and does replacement work
export function PreprocessText(text) {
    const parts = findParts(text);
    return text.replaceAll('<p1_Radio>', replaceOldText);
}

function findParts() {

}

function replaceOldText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

