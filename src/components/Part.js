const Part = ({part, soundBoard}) => {
    function partBtnTrigger(e) {
        console.log(e);
        e.checked = !e.checked;
        part.muted = e.checked;

        if (e.checked) {
            e.classList.remove("btn-primary");
            e.classList.add("btn-danger");
        } else {
            e.classList.remove("btn-danger");
            e.classList.add("btn-primary");
        }

        soundBoard.update();
    }

    return (
        <div className="form-check">
            <label className="form-check-label" htmlFor={part.name+"Element"} name="partLabel">{part.name}</label>
            <button onClick={partBtnTrigger} id={part.name+"Element"} name="muteButton" type="button" className="btn btn-primary" checked={false}>mute</button>
        </div>
        );
};

export default Part;
