import { StopAudio } from "../App";
import stop from "../assets/pause.png"

const StopButton = ({}) => {
    function stopButtonTrigger(e) {
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
