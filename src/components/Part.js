import MuteButton from "./MuteButton";
import Slider from "./Slider";

// The master element for an entire instrument.
// It holds all the controls (e.g., sliders, mute)

const Part = ({part, soundBoard}) => {
    // Ensure name length is reasonable
    const nameLength = part.name.length;
    let finalName = part.name;
    if (nameLength > 5) {
        finalName = finalName.substring(0, 5);
    }

    return (
        <div className="col-2" style={{padding: "3%"}}>
            <div className="row text-center" style={{height: "15%"}}>
                <h5 className="form-check-label">{finalName}</h5>
            </div>
            <div className="row">
                <MuteButton part={part} soundBoard={soundBoard} />
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
