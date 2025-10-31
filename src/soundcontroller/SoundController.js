import { ProcAndPlay } from "../App";
import Part from "../components/Part";

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

        board.appendChild(
            <Part
                soundBoard={this}
                part={part}
            ></Part>
        );
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
        ProcAndPlay();
    }
}
