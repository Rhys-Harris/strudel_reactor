import { useState, useEffect } from 'react';
import Part from './Part';

const SoundBoard = ({soundBoard}) => {
    const [parts, setState] = useState([]);

    return (
        <div className="col-md-4" id="soundBoard">{
            parts.map(
                (part) => (
                    <Part
                        part={part}
                        soundBoard={soundBoard}
                    />
                )
            )
        }</div>
    );
};

export default SoundBoard;

