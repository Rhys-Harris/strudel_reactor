// This component is used to set the range for
// sliders that are dynamically created.
// For example, a slider default with the range
// 0->100 could be created with the name room.
// Then, any room sliders dynamically created
// for instruments would inherit this range.

const SliderDefault = ({soundBoard, sliderDefault, setSliderDefaults}) => {
    // No longer need this default
    function deleteButtonTrigger(e) {
        soundBoard.deleteSliderDefault(sliderDefault.name);
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    // What effect does this apply to?
    function nameChangeTrigger(e) {
        const input = e.target;
        const value = input.value;
        sliderDefault.name = value;
        soundBoard.cycleSliderDefaults();
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    // Lowest value
    function minChangeTrigger(e) {
        const input = e.target;
        const value = input.value;
        sliderDefault.lo = parseFloat(value);
        soundBoard.cycleSliderDefaults();
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    // Highest value
    function maxChangeTrigger(e) {
        const input = e.target;
        const value = input.value;
        sliderDefault.hi = parseFloat(value);
        soundBoard.cycleSliderDefaults();
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    return (
        <div className="row" style={{ paddingTop: "1%" }}>
            <div className="col-3">
                <div className="input-group">
                    <input onBlur={nameChangeTrigger} type="text" className="form-control" placeholder="Low" defaultValue={sliderDefault.name}></input>
                </div>
            </div>
            <div className="col-2">
                <button style={{width: "100%", height: "100%"}} onClick={deleteButtonTrigger}>Delete</button>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Min</div>
                    </div>
                    <input onBlur={minChangeTrigger} type="text" className="form-control" placeholder="Low" defaultValue="0"></input>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Max</div>
                    </div>
                    <input onBlur={maxChangeTrigger} type="text" className="form-control" placeholder="High" defaultValue="100"></input>
                </div>
            </div>
        </div>
    );
};

export default SliderDefault;
