import { useState, useEffect } from 'react';
import { FindParts } from '../preprocessor/Preprocessor';
import update from "../assets/update.png";

const UpdateButton = ({soundBoard, setParts}) => {
    useEffect(() => {
        setParts(soundBoard.parts);
    }, [soundBoard.parts, setParts])

    function updateButtonTrigger(e) {
        let proc_text = document.getElementById('proc').value
        soundBoard.addParts(FindParts(proc_text));
        setParts(soundBoard.parts);
    }

    return (
        <button style={{width: "100%", padding: "0"}} id="boardUpdate" onClick={updateButtonTrigger}>
            <img alt="update" src={update} style={{width: "100%", height: "100%", imageRendering: "pixelated", margin: "0"}}>
            </img>
        </button>
    );
};

export default UpdateButton;
