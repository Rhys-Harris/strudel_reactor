import { GetInstrumentControls } from "../preprocessor/PartTextAnalyser";

// Logical component of the parts found on the DOM soundboard
export class PartInfo {
    constructor(name, lineNumber, lines) {
        // E.g., "bassline"
        this.name = name;

        // Where in the original text the instrument is from
        this.lineNumber = lineNumber;

        this.muted = false;

        // All the text related to this intstrument
        this.getAllText(this.lineNumber, lines);
        console.log(this.text);

        this.findSliders();
    }

    // Searches through the source,
    // finding all text related to this instrument
    getAllText(index, lines) {
        this.text = "";

        // Semicolon is the end of instrument
        while (!lines[index].includes(";")) {
            this.text += lines[index];
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

        this.text = this.text.substring(colonIndex+1);
    }

    // Searches through the text to
    // dynamically creates new sliders
    findSliders() {
        this.sliders = [];

        const controls = GetInstrumentControls(this.text);
        console.log(controls);
    }
}
