import { useState, useEffect } from 'react';
import AdvancedSettings from './AdvancedSettings';
import CPMSlider from './CPMSlider';
import VOLSlider from './VOLSlider';
import Part from './Part';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import UpdateButton from './UpdateButton';

// This is all the controls that effect
// every instrument (e.g., pause/play,
// volume, speed)

const MasterControlPanel = ({soundBoard, setParts}) => {
    return (
        <>
            <div className="row" style={{height: "50%", padding: "2px"}}>
                <div style={{width: "33%"}}>
                    <UpdateButton soundBoard={soundBoard} setParts={setParts} />
                </div>
                <div style={{width: "33%"}}>
                    <PlayButton soundBoard={soundBoard} />
                </div>
                <div style={{width: "33%"}}>
                    <StopButton soundBoard={soundBoard} />
                </div>
            </div>
            <div className="row" style={{height: "50%", padding: "2px"}}>
                <div style={{width: "100%"}}>
                    <div className="row">
                        <CPMSlider soundBoard={soundBoard} />
                    </div>
                    <div className="row">
                        <VOLSlider soundBoard={soundBoard} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MasterControlPanel;

