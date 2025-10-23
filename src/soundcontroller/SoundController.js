import { applyPreprocessing } from "../App";

// The little board to the bottom right that will
// allow for the control of sounds
export class SoundController {
    constructor() {
        // All the instruments it knows of
        this.parts = [];
    }

    addParts(parts) {
        console.log("Adding parts!");
        console.log(parts);

        // Clear any old parts
        this.parts = [];

        const board = document.getElementById("soundBoard");
        board.replaceChildren([]);

        for (let i = 0; i < parts.length; ++i) {
            this.addPart(parts[i], board);
        }
    }

    addPart(part, board) {
        this.parts.push(part);

        const outerDiv = document.createElement("div");
        outerDiv.classList.add("form-check");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("form-check-input");
        input.id = part.name + "Element"

        const soundBoard = this;
        input.onchange = () => {soundBoard.update()};

        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.htmlFor = part.name+"Element";
        label.innerHTML = part.name + " mute";

        outerDiv.appendChild(input);
        outerDiv.appendChild(label);
        board.appendChild(outerDiv);

        part.muter = input;
    }

    getPart(name) {
        for (let i = 0; i < this.parts.length; ++i) {
            if (this.parts[i].name === name) {
                return this.parts[i];
            }
        }
        return null;
    }

    update() {
        console.log("Updating board!");
        for (let i = 0; i < this.parts.length; ++i) {
            this.parts[i].updateMute();
        }

        applyPreprocessing();
    }
}
