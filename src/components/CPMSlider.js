import { useState, useEffect } from 'react';

// Slider that controls how fast the song runs

const CPMSlider = ({soundBoard}) => {
    const [cpm, setCPM] = useState(40);

    // When the slider stops changing,
    // therefore, value can be used
    // through rest of program
    function sliderTrigger(e) {
        const slider = e.target;
        const value = slider.value;
        soundBoard.update();
        setCPM(value);
    }

    // While slider is still changing,
    // update UI, but don't trigger
    // preprocessing
    function sliderChanger(e) {
        const slider = e.target;
        const value = slider.value;
        setCPM(value);
    }

    return (
        <>
            <label className="form-check-label text-center" htmlFor="cpmSlider">
               CPM: {cpm}
            </label>
            <input step="0.01" min="1" max="160" type="range" className="form-input" onChange={sliderChanger} onMouseUp={sliderTrigger} id="cpmSlider" value={cpm}>
            </input>
        </>
    );
};

export default CPMSlider;
