export class Part {
    constructor(name, lineNumber) {
        this.name = name;
        this.lineNumber = lineNumber;
        this.muter = null;
        this.muted = false;
    }

    updateMute() {
        // Doesn't have an element that can be used
        // to mute this
        if (this.muter == null) {
            // Soft error
            console.error("Couldn't find muting element");
            return;
        }

        this.muted = this.muter.checked;
    }
}
