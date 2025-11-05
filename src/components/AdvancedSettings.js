import { useState, useEffect } from 'react';

const AdvancedSettings = ({soundBoard}) => {
    const [hidden, setHidden] = useState(true);

    function hiddenTrigger(e) {
        if (hidden) {

            setHidden(false);
        } else {

            setHidden(true);
        }
    }

    return (
        <div className="row" style={{padding: "2px"}}>
            <button style={{width: "100%", height: "100%"}} onClick={hiddenTrigger}>Advanced</button>
            <div hidden={hidden}>
                <p>Working</p>
            </div>
        </div>
    );
};

export default AdvancedSettings;
