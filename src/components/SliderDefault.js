const SliderDefault = ({soundBoard, sliderDefault, setSliderDefaults}) => {
    function deleteButtonTrigger(e) {
        soundBoard.deleteSliderDefault(sliderDefault.name);
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    function nameChangeTrigger(e) {
        console.log("a");
        const input = e.target;
        const value = input.value;
        sliderDefault.name = value;
        soundBoard.cycleSliderDefaults();
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    function minChangeTrigger(e) {
        console.log("b");
        const input = e.target;
        const value = input.value;
        sliderDefault.lo = parseFloat(value);
        soundBoard.cycleSliderDefaults();
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    function maxChangeTrigger(e) {
        console.log("c");
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
