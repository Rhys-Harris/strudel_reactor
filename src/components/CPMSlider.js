import { useState, useEffect } from 'react';

const CPMSlider = ({soundBoard}) => {
    const [sliderValue, setSliderValue] = useState(40);

    function sliderTrigger(e) {
        const slider = e.target;
        const value = slider.value;
        soundBoard.update();
        setSliderValue(value);
    }

    function sliderChanger(e) {
        const slider = e.target;
        const value = slider.value;
        setSliderValue(value);
    }

    return (
        <>
            <label className="form-check-label text-center" htmlFor="cpmSlider">
               Cycles/Min: {sliderValue}
            </label>
            <input step="0.01" min="1" max="160" type="range" className="form-input" onChange={sliderChanger} onMouseUp={sliderTrigger} id="cpmSlider" value={sliderValue}>
            </input>
        </>
    );
};

export default CPMSlider;
