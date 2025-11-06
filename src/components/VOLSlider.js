import { useState, useEffect } from 'react';

const VOLSlider = ({soundBoard}) => {
    const [volume, setVolume] = useState(1);

    function sliderTrigger(e) {
        const slider = e.target;
        const value = slider.value;
        soundBoard.update();
        setVolume(value);
    }

    function sliderChanger(e) {
        const slider = e.target;
        const value = slider.value;
        setVolume(value);
    }

    return (
        <>
            <label className="form-check-label text-center" htmlFor="volSlider">
               Vol: {volume}
            </label>
            <input step="0.01" min="0" max="2" type="range" className="form-input" onChange={sliderChanger} onMouseUp={sliderTrigger} id="volSlider" value={volume}>
            </input>
        </>
    );
};

export default VOLSlider;
