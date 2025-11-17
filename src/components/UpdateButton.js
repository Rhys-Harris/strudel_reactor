import { useState, useEffect } from 'react';
import { FindParts } from '../preprocessor/Preprocessor';
import update from "../assets/update.png";

// Takes all preproccessing text and
// triggers the task of finding all
// instruments and controls within to
// show on the control panel

const UpdateButton = ({soundBoard, setParts}) => {
    useEffect(() => {
        setParts(soundBoard.parts);

        document.addEventListener("keypress", (e) => {
            // Check for 'u' key press
            if (e.code !== "KeyU") {
                return;
            }

            updateButtonTrigger(e);
        })
    }, [soundBoard.parts, setParts])

    function updateButtonTrigger(e) {
        // Get starting text
        let proc_text = document.getElementById('proc').value

        // Find all parts that are defined dynamically
        soundBoard.addParts(FindParts(proc_text, soundBoard));
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
