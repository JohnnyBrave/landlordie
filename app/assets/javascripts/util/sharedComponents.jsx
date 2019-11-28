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
var SubjectForm = createReactClass({

    propTypes: {
        //All these are required to for the use of this component
        subject: PropTypes.object.isRequired,
        textChanged: PropTypes.func.isRequired,
        saveSubject: PropTypes.func.isRequired,
        cancelSubject: PropTypes.func.isRequired,
        fullForm: PropTypes.bool.isRequired,
        task: PropTypes.string.isRequired
    },

    saveSubject: function () {
        console.log("saving vba")
        this.props.saveSubject();

    },


    cancelSubject: function () {
        this.props.cancelSubject();
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
                        <h4 className="ui top attached header">{this.props.task}Tenant Information</h4>
                        <div className="ui attached segment">
                            <div className="field">
                                <div className="two fields">
                                    <div className="field">
                                        <label>ID NUMBER<span>*</span></label>
                                        <Input type="text"
                                               name={'id_number'}
                                               htmlFor={'id_number'}
                                               isrequired={true}
                                               messageRequired={'ID Number is required'}
                                               onChange={this.textChanged}
                                               value={this.props.subject && this.props.subject.id_number}/>
                                    </div>
                                    <div className="field">
                                        <label>ID TYPE<span>*</span></label>
                                        <Input type="text"
                                               name={'id_type'}
                                               htmlFor={'id_type'}
                                               isrequired={true}
                                               messageRequired={'ID TYPE is required'}
                                               onChange={this.textChanged}
                                               value={this.props.subject && this.props.subject.id_type}/>
                                    </div>
                                </div>
                                <div className="three fields">
                                    <div className="field">
                                        <label>FIRST NAME <span>*</span></label>
                                        <Input type="text"
                                               name={'first_name'}
                                               htmlFor={'first_name'}
                                               isrequired={true}
                                               messageRequired={'FIRST NAME is required'}
                                               onChange={this.textChanged}
                                               value={this.props.subject && this.props.subject.first_name}/>
                                    </div>
                                    <div className="field">
                                        <label>MIDDLE NAME <span>*</span></label>
                                        <Input type="text"
                                               name={'middle_name'}
                                               htmlFor={'middle_name'}
                                               isrequired={true}
                                               messageRequired={'MIDDLE NAME is required'}
                                               onChange={this.textChanged}
                                               value={this.props.subject && this.props.subject.middle_name}/>
                                    </div>
                                    <div className="field">
                                        <label>LAST NAME <span>*</span></label>
                                        <Input type="text"
                                               name={'last_name'}
                                               htmlFor={'last_name'}
                                               isrequired={true}
                                               messageRequired={'LAST NAME is required'}
                                               onChange={this.textChanged}
                                               value={this.props.subject && this.props.subject.last_name}/>
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
                                               value={this.props.subject && this.props.subject.phone_no}/>
                                    </div>
                                    <div className="field">
                                        <label>HOUSE</label>
                                        <Input type="text"
                                               name={'house_name'}
                                               htmlFor={'house_name'}
                                               isrequired={true}
                                               messageRequired={'HOUSE NAME is required'}
                                               onChange={this.textChanged}
                                               value={this.props.subject && this.props.subject.house_name}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="ui bottom attached segment">
                            <button type="button" onClick={this.props.saveSubject} className="ui primary button">Save
                            </button>
                            <button type="button" onClick={this.props.cancelSubject} className="ui red button">Cancel
                            </button>
                        </div>
                    </div>
                </div>

            </div>,
            modalRoot,


        );
    }
});
/**
 * Page Loader component
 * @type {*|Function}
 */
var Loader = createReactClass({
    displayName: "Loader",

    render: function render() {
        return (

            <div className="ui active transition visible inverted dimmer">
                <div className="content"><div className="ui large text loader">Loading ...</div></div>
            </div>



        );
    }
});


