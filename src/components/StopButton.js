import { StopAudio } from "../App";
import stop from "../assets/pause.png"
import { useEffect } from "react";

// Stops all music playing

const StopButton = ({ soundBoard }) => {
    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            // Check for 's' key press
            if (e.code !== "KeyS") {
                return;
            }

            stopButtonTrigger(e);
        })
    }, [])

    function stopButtonTrigger(e) {
        soundBoard.running = false;
        StopAudio();
    }

    return (
        <button style={{width: "100%", padding: "0"}} id="stop" onClick={stopButtonTrigger}>
            <img alt="stop" src={stop} style={{width: "100%", height: "100%", imageRendering: "pixelated", margin: "0"}}>
            </img>
        </button>
    );
};

export default StopButton;
