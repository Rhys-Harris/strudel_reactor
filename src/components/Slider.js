import { useState } from "react";

// Slider used for instrument controls,
// this can be used for gain, lpf, and so forth

const Slider = ({partSlider, instrument, soundBoard}) => {
    const [sliderValue, setSliderValue] = useState(partSlider.value);

    // On finished change
    function sliderTrigger(e) {
        const slider = e.target;
        const value = slider.value;
        partSlider.setValue(value)
        soundBoard.update();
        setSliderValue(value);
    }

    // On still changing
    // (don't trigger preprocessing)
    function sliderChanger(e) {
        const slider = e.target;
        const value = slider.value;
        partSlider.setValue(value)
        setSliderValue(value);
    }

    return (
        <div className="row">
            <label className="form-check-label text-center" htmlFor={instrument.name + "-" + partSlider.name}>
                {partSlider.name}
            </label>
            <input step="0.01" min={partSlider.lo} max={partSlider.hi} type="range" className="form-input" onMouseUp={sliderTrigger} onChange={sliderChanger} id={instrument.name + "-" + partSlider.name} value={sliderValue}>
            </input>
        </div>
    );
};

export default Slider;
