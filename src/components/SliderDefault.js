const SliderDefault = ({soundBoard, sliderDefault, setSliderDefaults}) => {
    function deleteButtonTrigger(e) {
        soundBoard.deleteSliderDefault(sliderDefault.name);
        setSliderDefaults(soundBoard.sliderDefaults);
    }

    function nameChangeTrigger(e) {
        const input = e.target;
        const value = input.value;
        sliderDefault.name = value;
    }

    function minChangeTrigger(e) {
        const input = e.target;
        const value = input.value;
        sliderDefault.lo = parseFloat(value);
    }

    function maxChangeTrigger(e) {
        const input = e.target;
        const value = input.value;
        sliderDefault.hi = parseFloat(value);
    }

    return (
        <div className="row" style={{ paddingTop: "1%" }}>
            <div className="col-3">
                <div className="input-group">
                    <input onChange={nameChangeTrigger} type="text" className="form-control" placeholder="Low" defaultValue={sliderDefault.name}></input>
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
                    <input onChange={minChangeTrigger} type="text" className="form-control" placeholder="Low" defaultValue="0"></input>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Max</div>
                    </div>
                    <input onChange={maxChangeTrigger} type="text" className="form-control" placeholder="High" defaultValue="100"></input>
                </div>
            </div>
        </div>
        );
};

export default SliderDefault;
