import { useState, useEffect } from 'react';
import AdvancedSettings from './AdvancedSettings';
import CPMSlider from './CPMSlider';
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
                    <div style={{width: "33%"}}>
                        <UpdateButton soundBoard={soundBoard} setParts={setState} />
                    </div>
                    <div style={{width: "33%"}}>
                        <PlayButton />
                    </div>
                    <div style={{width: "33%"}}>
                        <StopButton />
                    </div>
                </div>
                <AdvancedSettings soundBoard={soundBoard} />
                <div className="row" style={{padding: "2px"}}>
                    <CPMSlider soundBoard={soundBoard} />
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

