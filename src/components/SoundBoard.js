import { useState, useEffect } from 'react';
import AdvancedSettings from './AdvancedSettings';
import CPMSlider from './CPMSlider';
import MasterControlPanel from './MasterControlPanel';
import Part from './Part';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import UpdateButton from './UpdateButton';

const SoundBoard = ({soundBoard}) => {
    const [parts, setState] = useState([]);

    return (
        <div className="col-md-5">
            <div className="form-check container-fluid">
                <MasterControlPanel soundBoard={soundBoard} setParts={setState} />
                <AdvancedSettings soundBoard={soundBoard} />
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

