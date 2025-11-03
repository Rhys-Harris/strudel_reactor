import { useState, useEffect } from 'react';
import Part from './Part';
import { FindParts } from '../preprocessor/Preprocessor';

let changeCounter = 0;

const SoundBoard = ({soundBoard}) => {
    const [parts, setState] = useState([]);

    useEffect(() => {
        setState(soundBoard.parts);
    }, [])

    function boardUpdateTrigger(e) {
        let proc_text = document.getElementById('proc').value
        soundBoard.addParts(FindParts(proc_text));
        setState(soundBoard.parts);
    }

    const [sliderValue, setSliderValue] = useState(60);

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
        commitChange();
        setSliderValue(value);
    }

    return (
        <div className="col-md-5">
            <div className="form-check container-fluid">
                <div className="row" style={{padding: "2px"}}>
                    <div style={{width: "50%"}}>
                        <button style={{width: "100%"}} className="btn btn-primary" id="boardUpdate" onClick={boardUpdateTrigger}>Update Board</button>
                    </div>
                </div>
                <div className="row" style={{padding: "2px"}}>
                    <div style={{width: "50%"}}>
                        <button style={{width: "100%"}}  id="play" className="btn btn-primary">Play</button>
                    </div>
                    <div style={{width: "50%"}}>
                        <button style={{width: "100%"}}  id="stop" className="btn btn-primary">Stop</button>
                    </div>
                </div>
                <div className="row" style={{padding: "2px"}}>
                    <label className="form-check-label text-center" htmlFor="cpmSlider">
                       Cycles/Min: {sliderValue}
                    </label>
                    <input min="1" max="200" type="range" className="form-input" onChange={sliderTrigger} id="cpmSlider" value={sliderValue}>
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

