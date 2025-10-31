import Slider from "./Slider";

const Part = ({part, soundBoard}) => {
    function partBtnTrigger(e) {
        console.log(e);
        const btn = e.target;
        console.log(btn);
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
        <div className="form-check container-fluid">
            <div className="row">
                <div className="col">
                    <label className="form-check-label" htmlFor={part.name+"Element"} name="partLabel">{part.name}</label>
                </div>
                <div className="col">
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
                            />
                    )
                )
            }
            </div>
        </div>
        );
};

export default Part;
