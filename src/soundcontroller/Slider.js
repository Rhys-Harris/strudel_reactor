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

    recreate() {
        return this.preText + this.value + this.postText;
    }
}
