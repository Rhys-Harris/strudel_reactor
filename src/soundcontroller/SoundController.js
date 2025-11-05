import { ProcAndPlay } from "../App";
import SliderDefault from "./SliderDefault";
import Part from "../components/Part";

// The little board to the bottom right that will
// allow for the control of sounds
export class SoundController {
    constructor() {
        // All the instruments it knows of
        this.parts = [];
        this.sliderDefaults = [new SliderDefault("default", 0, 100)];
    }

    addSliderDefault(sliderDefault) {
        // Attempt to edit an existing default,
        // rather than create a new one
        for (let i = 0; i < this.sliderDefaults.length; ++i) {
            if (this.sliderDefaults[i].name === sliderDefault.name) {
                this.sliderDefaults[i].lo = sliderDefault.lo;
                this.sliderDefaults[i].hi = sliderDefault.hi;
                return;
            }
        }

        this.sliderDefaults.push(sliderDefault);
    }

    addParts(parts) {
        // Clear any old parts
        this.parts = [];

        for (let i = 0; i < parts.length; ++i) {
            this.addPart(parts[i]);
        }
    }

    addPart(part) {
        this.parts.push(part);
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

    getCpmText() {
        const cpmSlider = document.getElementById("cpmSlider");
        const cpm = parseInt(cpmSlider.value);
        return `setcps(${cpm}/60)\n\n`;
    }
}
