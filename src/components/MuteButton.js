import mute from "../assets/mute.png"
import sound from "../assets/sound.png"

// Used on each found instrument to
// control whether it plays

const MuteButton = ({part, soundBoard}) => {
    function muteButtonTrigger(e) {
        const btn = e.target;
        btn.checked = !btn.checked;
        part.muted = btn.checked;

        // Change the image of the button,
        // better showing the mute state
        const muteImage = document.getElementById(part.name+"MuteImage");
        if (btn.checked) {
            muteImage.setAttribute("src", mute);
        } else {
            muteImage.setAttribute("src", sound);
        }

        // Apply the changes
        soundBoard.update();
    }

    return (
        <button onClick={muteButtonTrigger} id={part.name+"MuteButton"} type="button" style={{width: "100%", aspectRation: "1 / 1", padding: "0"}} checked={false}>
            <img alt="mute" id={part.name+"MuteImage"} src={sound} style={{width: "100%", height: "100%", imageRendering: "pixelated", margin: "0"}}></img>
        </button>
    );
};

export default MuteButton;
