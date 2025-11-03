import { GetInstrumentControls } from "../preprocessor/PartTextAnalyser";

// Logical component of the parts found on the DOM soundboard
export class PartInfo {
    constructor(name, lineNumber, lines) {
        // E.g., "bassline"
        this.name = name;

        // Where in the original text the instrument is from
        this.lineNumber = lineNumber;

        // Number of lines of code this instrument spans
        this.numLines = 0;

        this.muted = false;

        // All the text related to this intstrument
        this.getAllText(this.lineNumber, lines);

        this.findSliders();
    }

    // Searches through the source,
    // finding all text related to this instrument
    getAllText(index, lines) {
        this.text = "";

        const startIndex = index;

        // Semicolon is the end of instrument
        while (!lines[index].includes(";")) {
            this.text += lines[index] + "\n";
            ++index;

            // Bad part (no semicolon)
            if (index >= lines.length) {
                alert("Instruments should be ended with a semicolon!");
                return;
            }
        }

        this.text += lines[index];

        // Remove instrument name at the start
        const colonIndex = this.text.indexOf(":");
        if (colonIndex === -1) {
            alert("Couldn't get sliders for an instrument");
            return;
        }

        this.text = this.text.substring(colonIndex+2);
        this.numLines = index-startIndex;
    }

    // Searches through the text to
    // dynamically creates new sliders
    findSliders() {
        this.sliders = GetInstrumentControls(this.text);
    }

    // Recreates the original text for this part but with
    // preprocessing changes.
    recreate() {
        let header = this.name + ":\n";
        // let finalText = this.text;
        let finalText = "";

        if (this.muted) {
            // Add the muting underscore
            header = "_" + header;
        }

        if (this.sliders.length === 0) {
            finalText = this.text;
        } else {
            for (let i = 0; i < this.sliders.length; ++i) {
                finalText += this.sliders[i].recreate();
            }
        }

        return header + finalText;
    }
}
