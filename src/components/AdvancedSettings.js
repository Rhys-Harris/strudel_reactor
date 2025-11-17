import { useState, useEffect } from 'react';
import SliderDefault from './SliderDefault';
import { default as LogicalSliderDefault } from '../soundcontroller/SliderDefault';

// Holds all extra settings that
// may be unessesary for the regular
// user. Namely, slider defaults

const AdvancedSettings = ({soundBoard}) => {
    // Since we want to hide the menu
    // if the user doesn't care
    const [hidden, setHidden] = useState(true);

    // All the controls (since it's dynamic)
    const [sliderDefaults, setSliderDefaults] = useState([]);

    useEffect(() => {
        setSliderDefaults(soundBoard.sliderDefaults);
    }, [soundBoard.sliderDefaults, setSliderDefaults])

    // Flips the visibility (might need more logic later)
    function hiddenTrigger(e) {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }

    // Adds a new slider default that can be changed later
    function newDefaultTrigger(e) {
        // Default name "new", default scale 0->100
        soundBoard.addSliderDefault(new LogicalSliderDefault("new", 0, 100));
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    // Saves the slider default preferences to localstorage
    function saveDefaultTrigger(e) {
        const strSliderDefaults = soundBoard.dumpSliderDefaults();
        localStorage.setItem("sliderDefaults", strSliderDefaults);
    }

    // Loads slider defaults from localstorage
    function loadDefaultTrigger(e) {
        const strSliderDefaults = localStorage.getItem("sliderDefaults");
        soundBoard.loadSliderDefaults(strSliderDefaults);

        // Ensure we update UI
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    return (
        <div className="container-fluid" style={{padding: "1%"}}>
            <div className="row" style={{padding: "2px"}}>
                <button style={{width: "100%", height: "100%"}} onClick={hiddenTrigger}>Advanced</button>
            </div>
            <div hidden={hidden}>
                <div className="row" style={{padding: "2px", marginLeft: "10%", marginRight: "10%"}}>
                    <div className="col">
                        <button onClick={newDefaultTrigger} style={{width: "100%"}}>New Default</button>
                    </div>
                    <div className="col">
                        <button onClick={saveDefaultTrigger} style={{width: "100%"}}>Save</button>
                    </div>
                    <div className="col">
                        <button onClick={loadDefaultTrigger} style={{width: "100%"}}>Load</button>
                    </div>
                </div>
                <ul className="list-group">
                    {
                        sliderDefaults.map(
                            (slider) => (
                                  <li className="list-group-item" key={"sliderDefaultLi" + slider.name}>
                                    <SliderDefault
                                        key={"sliderDefault" + slider.name}
                                        soundBoard={soundBoard}
                                        sliderDefault={slider}
                                        setSliderDefaults={setSliderDefaults}
                                    />
                                    </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default AdvancedSettings;
