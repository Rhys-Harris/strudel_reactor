import MuteButton from "./MuteButton";
import Slider from "./Slider";

// The master element for an entire instrument.
// It holds all the controls (e.g., sliders, mute)

const Part = ({part, soundBoard}) => {
    return (
        <div className="col" style={{padding: "3%"}}>
            <div className="row text-center">
                <h4 className="form-check-label">{part.name}</h4>
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
