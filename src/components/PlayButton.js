import { ProcAndPlay } from "../App";
import play from "../assets/next.png"

const PlayButton = ({}) => {
    function playButtonTrigger(e) {
        ProcAndPlay();
    }

    return (
        <button style={{width: "100%", padding: "0"}} id="play" onClick={playButtonTrigger}>
            <img alt="play" src={play} style={{width: "100%", height: "100%", imageRendering: "pixelated", margin: "0"}}>
            </img>
        </button>
    );
};

export default PlayButton;
