const MuteButton = ({part, soundBoard}) => {
    function muteButtonTrigger(e) {
        const btn = e.target;
        btn.checked = !btn.checked;
        part.muted = btn.checked;

        // if (btn.checked) {
        //     btn.classList.remove("btn-primary");
        //     btn.classList.add("btn-danger");
        // } else {
        //     btn.classList.remove("btn-danger");
        //     btn.classList.add("btn-primary");
        // }

        soundBoard.update();
    }

    return (
        <button onClick={muteButtonTrigger} id={part.name+"MuteButton"} type="button" className="btn btn-primary" checked={false}>
        </button>
    );
};

export default MuteButton;
