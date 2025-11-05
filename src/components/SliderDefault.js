const SliderDefault = ({soundBoard, sliderDefault}) => {
    return (
        <div className="row">
            <div className="col-2">
                <p>{sliderDefault.name}</p>
            </div>
            <div className="col-2">
                <button style={{width: "100%", height: "100%"}}>Delete</button>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Min</div>
                    </div>
                    <input type="text" className="form-control" placeholder="Low" value="0"></input>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Max</div>
                    </div>
                    <input type="text" className="form-control" placeholder="High" value="100"></input>
                </div>
            </div>
        </div>
        );
};

export default SliderDefault;
