export class PartInfo {
    constructor(name, lineNumber, lines) {
        this.name = name;
        this.lineNumber = lineNumber;
        this.muted = false;

        // Now get all part text
        this.partText = "";
        let index = this.lineNumber;

        while (!lines[index].includes(";")) {
            this.partText += lines[index];
            ++index;

            // Bad part
            if (index >= lines.length) {
                alert("Instruments should be ended with a semicolon!");
                return;
            }
        }
        this.partText += lines[index];

        console.log(this.partText);
    }
}
