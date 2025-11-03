import { useState } from "react";

let changeCounter = 0;

const Slider = ({partSlider, instrument, soundBoard}) => {
    const [sliderValue, setSliderValue] = useState(partSlider.value);

    function commitChange() {
        if (changeCounter >= 1) {
            console.log("Skipping update");
            return;
        }
        ++changeCounter;

        const timeout = setTimeout(() => {
            soundBoard.update();
            --changeCounter;
        }, 500);
    }

    function sliderTrigger(e) {
        const slider = e.target;
        const value = slider.value;
        partSlider.setValue(value)
        commitChange();
        setSliderValue(value);
    }

    return (
        <div className="row">
            <label className="form-check-label text-center" htmlFor={instrument.name + "-" + partSlider.name}>
                {partSlider.name}
            </label>
            <input min={partSlider.lo} max={partSlider.hi} type="range" className="form-input" onChange={sliderTrigger} id={instrument.name + "-" + partSlider.name} value={sliderValue}>
            </input>
        </div>
        );
};

export default Slider;
