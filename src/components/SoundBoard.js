import { useState, useEffect } from 'react';
import Part from './Part';

const SoundBoard = ({soundBoard}) => {
    const [parts, setState] = useState([]);

    useEffect(() => {
        console.log("use effect");
        console.log(soundBoard);
        setState(soundBoard.parts);
    }, [])

    function boardUpdateTrigger(e) {
        console.log("Trigger activated");
        console.log(soundBoard.parts);
        setState(soundBoard.parts);
    }

    return (
        <div className="col-md-4" id="soundBoard">
            <div className="form-check container-fluid">
                <div className="row">
                    <button className="btn btn-primary" id="boardUpdate" onClick={boardUpdateTrigger}>Update Board</button>
                </div>
            </div>
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
    );
};

export default SoundBoard;

