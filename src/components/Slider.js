const Slider = ({partSlider, instrument}) => {
    return (
        <div className="col">
            <label className="form-check-label" htmlFor={instrument.name + "-" + partSlider.name}>
                {partSlider.name}
            </label>
            <input type="range" className="form-input" id={instrument.name + "-" + partSlider.name} value={partSlider.value}>
            </input>
        </div>
        );
};

export default Slider;
