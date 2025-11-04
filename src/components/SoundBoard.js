import { useState, useEffect } from 'react';
import Part from './Part';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import UpdateButton from './UpdateButton';

const SoundBoard = ({soundBoard}) => {
    const [parts, setState] = useState([]);

    const [sliderValue, setSliderValue] = useState(60);

    function sliderTrigger(e) {
        const slider = e.target;
        const value = slider.value;
        soundBoard.update();
        setSliderValue(value);
    }

    return (
        <div className="col-md-5">
            <div className="form-check container-fluid">
                <div className="row" style={{padding: "2px"}}>
                    <div style={{width: "50%"}}>
                        <UpdateButton soundBoard={soundBoard} setParts={setState} />
                    </div>
                </div>
                <div className="row" style={{padding: "2px"}}>
                    <div style={{width: "50%"}}>
                        <PlayButton />
                    </div>
                    <div style={{width: "50%"}}>
                        <StopButton />
                    </div>
                </div>
                <div className="row" style={{padding: "2px"}}>
                    <label className="form-check-label text-center" htmlFor="cpmSlider">
                       Cycles/Min: {sliderValue}
                    </label>
                    <input step="0.01" min="1" max="160" type="range" className="form-input" onChange={sliderTrigger} id="cpmSlider" value={sliderValue}>
                    </input>
                </div>
            </div>
            <div className="row" id="soundBoard">
                {
                    parts.map(
                        (part) => (
                            <Part
                                key={part.name}
                                part={part}
                                soundBoard={soundBoard}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SoundBoard;

