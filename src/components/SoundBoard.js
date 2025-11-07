import { useState, useEffect } from 'react';
import AdvancedSettings from './AdvancedSettings';
import MasterControlPanel from './MasterControlPanel';
import Part from './Part';

// The entire control panel that is used
// to alter the song

const SoundBoard = ({soundBoard}) => {
    const [parts, setParts] = useState([]);

    return (
        <div className="col-md-5">
            <div className="form-check container-fluid">
                <MasterControlPanel soundBoard={soundBoard} setParts={setParts} />
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

