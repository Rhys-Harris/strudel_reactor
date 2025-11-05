import { useState, useEffect } from 'react';
import SliderDefault from './SliderDefault';

const AdvancedSettings = ({soundBoard}) => {
    const [hidden, setHidden] = useState(true);

    function hiddenTrigger(e) {
        if (hidden) {

            setHidden(false);
        } else {

            setHidden(true);
        }
    }

    function newDefaultTrigger(e) {

    }

    return (
        <div className="container-fluid">
            <div className="row" style={{padding: "2px"}}>
                <button style={{width: "100%", height: "100%"}} onClick={hiddenTrigger}>Advanced</button>
            </div>
            <div hidden={hidden}>
                <div className="row" style={{padding: "2px", marginLeft: "10%", marginRight: "10%"}}>
                    <button style={{width: "100%", height: "100%"}} onClick={newDefaultTrigger}>New Default</button>
                </div>
                {
                    soundBoard.sliderDefaults.map(
                        (slider) => (
                                <SliderDefault
                                    key={"sliderDefault" + slider.name}
                                    soundBoard={soundBoard}
                                    sliderDefault={slider}
                                />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default AdvancedSettings;
