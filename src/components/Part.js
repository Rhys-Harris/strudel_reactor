import Slider from "./Slider";

const Part = ({part, soundBoard}) => {
    function partBtnTrigger(e) {
        const btn = e.target;
        btn.checked = !btn.checked;
        part.muted = btn.checked;

        if (btn.checked) {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-danger");
        } else {
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-primary");
        }

        soundBoard.update();
    }

    return (
            <div className="col" style={{padding: "3%"}}>
                <div className="row text-center">
                    <h4 className="form-check-label">{part.name}</h4>
                </div>
                <div className="row">
                    <button onClick={partBtnTrigger} id={part.name+"Element"} name="muteButton" type="button" className="btn btn-primary" checked={false}>mute
                    </button>
                </div>
            {
                part.sliders.map(
                    (slider) => (
                            <Slider
                                key={part.name + "-" + slider.name}
                                partSlider={slider}
                                instrument={part}
                                soundBoard={soundBoard}
                            />
                    )
                )
            }
            </div>
        );
};

export default Part;
