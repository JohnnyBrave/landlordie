/**
 * This file shall contain the shared componenets that are used in different places within the
 * secured application
 *
 * Date Formating functions
 */
//date formatter helper
var allAvailableOptions = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

var monthYearOptions = {
    year: "numeric",
    month: "short"
};
//
function formatDate(dateValue, options = monthYearOptions) {
    return new Date(dateValue).toLocaleTimeString("en-KE", options)
}

//default param is all options
function formatDateMonthDay(dateValue, options = allAvailableOptions) {
    return new Date(dateValue).toLocaleTimeString("en-KE", options)
}


const modalRoot = document.getElementById('modal')
var Modal = createReactClass({

    propTypes: {
        //All these are required to for the use of this component
        vba: PropTypes.object.isRequired,
        textChanged: PropTypes.func.isRequired,
        saveVba: PropTypes.func.isRequired,
        cancelVba: PropTypes.func.isRequired,
        fullForm: PropTypes.bool.isRequired,
        task: PropTypes.string.isRequired
    },

    saveVba: function () {
        console.log("saving vba")
        this.props.saveVba();

    },


    cancelVba: function () {
        this.props.cancelVba();
    },
    vba_nameChanged: function (passedValue) {
        this.props.vba_nameChanged(passedValue)
    },
    phone_noChanged: function (passedvalue) {
        this.props.phone_noChanged(passedValue)
    },
    genderChanged: function (passedvalue) {
        this.props.genderChanged(passedvalue)
    },
    ageChanged: function (passedValue) {
        this.props.ageChanged(passedValue)
    },
    networkChanged: function (passedValue) {
        this.props.networkChanged(passedValue)
    },
    _usernameChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.username = passedValue.value;
        this.setState({searchParameters: tmp});
        this._loadUserOptions(passedValue.value);
    },



    textChanged: function (event) {
        this.props.textChanged(event);
    },


    render: function () {
        return ReactDOM.createPortal(
            <div>
                {this.props.children}
                <div className='ui long modal'>

                </div>
                <div id="modal" className="ui form">
                    <div className="ui segments">
                        <h4 className="ui top attached header">{this.props.task}VBA</h4>
                        <div className="ui attached segment">
                            <div className="field">
                                <div className="two fields">
                                    <div className="field">
                                        <label>VBA HHCODE <span>*</span></label>
                                        <Input type="text"
                                               name={'vbacode'}
                                               htmlFor={'vbacode'}
                                               isrequired={true}
                                               messageRequired={'VBA HHCODE is required'}
                                               onChange={this.textChanged}
                                               value={this.props.vba && this.props.vba.vbacode}/>
                                    </div>
                                    <div className="field">
                                        <label>VBA Name <span>*</span></label>
                                        <Input type="text"
                                               name={'vba_name'}
                                               htmlFor={'vba_name'}
                                               isrequired={true}
                                               messageRequired={'VBA Name is required'}
                                               onChange={this.textChanged}
                                               value={this.props.vba && this.props.vba.vba_name}/>
                                    </div>
                                </div>
                                <div className="two fields">
                                    <div className="field">
                                        <label>Phone Number <span>*</span></label>
                                        <Input type="text"
                                               name={'phone_no'}
                                               htmlFor={'phone_no'}
                                               isrequired={true}
                                               onChange={this.textChanged}
                                               messageRequired={'Phone Number is required'}
                                               value={this.props.vba && this.props.vba.phone_no}/>
                                    </div>
                                    <div className="field">
                                        <label>Gender</label>
                                        <Input type="text"
                                               name={'gender'}
                                               htmlFor={'gender'}
                                               isrequired={true}
                                               messageRequired={'Gender is required'}
                                               onChange={this.textChanged}
                                               value={this.props.vba && this.props.vba.gender}/>
                                    </div>
                                </div>
                                <div className="two fields">
                                    <div className="field">
                                        <label>Latitude <span>*</span></label>
                                        <Input type="text"
                                               name={'latitude'}
                                               htmlFor={'latitude'}
                                               isrequired={true}
                                               onChange={this.textChanged}
                                               messageRequired={'Latitude Number is required'}
                                               value={this.props.vba && this.props.vba.latitude}/>
                                    </div>
                                    <div className="field">
                                        <label>Longitude</label>
                                        <Input type="text"
                                               name={'longitude'}
                                               htmlFor={'longitude'}
                                               isrequired={true}
                                               onChange={this.textChanged}
                                               messageRequired={'Longitude is required'}
                                               value={this.props.vba && this.props.vba.longitude}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="ui bottom attached segment">
                            <button type="button" onClick={this.props.saveVba} className="ui primary button">Save
                            </button>
                            <button type="button" onClick={this.props.cancelVba} className="ui red button">Cancel
                            </button>
                        </div>
                    </div>
                </div>

            </div>,
            modalRoot,


        );
    }
});


