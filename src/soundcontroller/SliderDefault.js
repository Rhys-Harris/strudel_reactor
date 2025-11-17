// Used to determine the range of a given slider
// based on what it is changing
export default class SliderDefault {
    constructor(name, lo, hi) {
        this.name = name;
        this.lo = lo;
        this.hi = hi;
    }

    dump() {
        return `{"name":"${this.name}", "lo":${this.lo}, "hi":${this.hi}}`;
    }
}
