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
        this.running = false;
    }

    deleteSliderDefault(name) {
        const newList = [];

        for (let i = 0; i < this.sliderDefaults.length; ++i) {
            if (this.sliderDefaults[i].name === name) {
                continue;
            }

            newList.push(this.sliderDefaults[i]);
        }

        this.sliderDefaults = newList;
    }

    getSliderDefaultRange(name) {
        let lo = 0;
        let hi = 100;
        let changed = false;

        for (let i = 0; i < this.sliderDefaults.length; ++i) {
            const sliderDefault = this.sliderDefaults[i];
            if (sliderDefault.name === name) {
                lo = sliderDefault.lo;
                hi = sliderDefault.hi;
                changed = true;
            } else if (sliderDefault.name === "default" && !changed) {
                lo = sliderDefault.lo;
                hi = sliderDefault.hi;
            }
        }

        return [lo, hi];
    }

    addSliderDefault(sliderDefault) {
        const newList = [];

        let alreadyExists = false;

        // Attempt to edit an existing default,
        // rather than create a new one
        for (let i = 0; i < this.sliderDefaults.length; ++i) {
            if (this.sliderDefaults[i].name === sliderDefault.name) {
                this.sliderDefaults[i].lo = sliderDefault.lo;
                this.sliderDefaults[i].hi = sliderDefault.hi;
                alreadyExists = true;
            }

            newList.push(this.sliderDefaults[i]);
        }

        if (!alreadyExists) {
            newList.push(sliderDefault);
        }

        this.sliderDefaults = newList;
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
        ProcAndPlay(this.running);
    }

    getCpmText() {
        const cpmSlider = document.getElementById("cpmSlider");
        const cpm = parseInt(cpmSlider.value);
        return `setcps(${cpm}/60/4)\n\n`;
    }
}
