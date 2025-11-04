import mute from "../assets/mute.png"
import sound from "../assets/sound.png"

const MuteButton = ({part, soundBoard}) => {
    function muteButtonTrigger(e) {
        const btn = e.target;
        btn.checked = !btn.checked;
        part.muted = btn.checked;

        const muteImage = document.getElementById(part.name+"MuteImage");

        if (btn.checked) {
            muteImage.setAttribute("src", mute);
        } else {
            muteImage.setAttribute("src", sound);
        }

        soundBoard.update();
    }

    return (
        <button onClick={muteButtonTrigger} id={part.name+"MuteButton"} type="button" style={{width: "100px", height: "100px", padding: "0"}} checked={false}>
            <img alt="mute" id={part.name+"MuteImage"} src={sound} style={{width: "100%", height: "100%", imageRendering: "pixelated", margin: "0"}}></img>
        </button>
    );
};

export default MuteButton;
