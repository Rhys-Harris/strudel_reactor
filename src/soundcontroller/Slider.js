export default class PartSlider {
    constructor(name, curValue, lo, hi, preText) {
        let value = parseFloat(curValue);
        if (isNaN(value)) {
            value = 0.0;
        }

        // Used to allow us to reconstruct the final instrument text
        this.preText = preText;
        this.postText = "";

        this.name = name;
        this.value = value;
        this.lo = lo;
        this.hi = hi;
    }

    setValue(curValue) {
        let value = parseFloat(curValue);
        if (!isNaN(value)) {
            this.value = value;
        }
    }

    // If we're a volume control, we need to factor in the global
    // volume
    recreate(globalVolume) {
        if (this.name === "gain") {
            return this.preText + this.value + "*" + globalVolume + this.postText;
        } else {
            return this.preText + this.value + this.postText;
        }
    }
}
