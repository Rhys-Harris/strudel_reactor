import { ProcAndPlay } from "../App";
import play from "../assets/next.png"
import { useEffect } from "react";

// The global play button

const PlayButton = ({soundBoard}) => {
    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            // Check for 'p' key press
            if (e.code !== "KeyP") {
                return;
            }

            playButtonTrigger(e);
        })
    }, [])

    function playButtonTrigger(e) {
        soundBoard.running = true;
        ProcAndPlay(soundBoard.running);
    }

    return (
        <button style={{width: "100%", padding: "0"}} id="play" onClick={playButtonTrigger}>
            <img alt="play" src={play} style={{width: "100%", height: "100%", imageRendering: "pixelated", margin: "0"}}>
            </img>
        </button>
    );
};

export default PlayButton;
