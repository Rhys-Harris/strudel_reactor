import { useState, useEffect } from 'react';
import SliderDefault from './SliderDefault';
import { default as LogicalSliderDefault } from '../soundcontroller/SliderDefault';

const AdvancedSettings = ({soundBoard}) => {
    const [hidden, setHidden] = useState(true);
    const [sliderDefaults, setSliderDefaults] = useState([]);

    useEffect(() => {
        console.log("Use effect");
        setSliderDefaults(soundBoard.sliderDefaults);
    }, [soundBoard.sliderDefaults, setSliderDefaults])

    function hiddenTrigger(e) {
        if (hidden) {

            setHidden(false);
        } else {

            setHidden(true);
        }
    }

    // Adds a new slider default that can be changed later
    function newDefaultTrigger(e) {
        soundBoard.addSliderDefault(new LogicalSliderDefault("new", 0, 100));
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    return (
        <div className="container-fluid" style={{padding: "1%"}}>
            <div className="row" style={{padding: "2px"}}>
                <button style={{width: "100%", height: "100%"}} onClick={hiddenTrigger}>Advanced</button>
            </div>
            <div hidden={hidden}>
                <div className="row" style={{padding: "2px", marginLeft: "10%", marginRight: "10%"}}>
                    <button style={{width: "100%", height: "100%"}} onClick={newDefaultTrigger}>New Default</button>
                </div>
<ul className="list-group">
                {
                    sliderDefaults.map(
                        (slider) => (
                              <li className="list-group-item">
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
