import { useState, useEffect } from 'react';
import AdvancedSettings from './AdvancedSettings';
import MasterControlPanel from './MasterControlPanel';
import Part from './Part';

// The entire control panel that is used
// to alter the song

const SoundBoard = ({soundBoard}) => {
    const [parts, setParts] = useState([]);


    return (
        <div className="col-md-6">
            <div className="form-check container-fluid">
                <div className="row" style={{height: "20%"}}>
                    <div className="col-md-4">
                        <MasterControlPanel soundBoard={soundBoard} setParts={setParts} />
                    </div>
                    <div className="col-md-8">
                        <canvas id="roll" style={{backgroundColor: "rgb(27, 27, 27)", width: "50%", height: "100%"}}></canvas>
                        <svg id="graph" style={{backGroundColor: "red", width: "50%", height: "100%"}}></svg>
                    </div>
                </div>
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

