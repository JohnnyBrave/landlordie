"use strict";

/**
 * Date Formating functions
 */
//date formatter helper
var allAvailableOptions = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

var monthYearOptions = {
    year: "numeric",
    month: "short"
};

//
function formatDate(dateValue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : monthYearOptions;

    return new Date(dateValue).toLocaleTimeString("en-us", options);
}

//default param is all options
function formatDateMonthDay(dateValue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : monthYearOptions;

    return new Date(dateValue).toLocaleTimeString("en-us", options);
}

/**
 *Single select component
 * Used when you expect user to make a single selection from a list
 *
 * Pass parameters :
 * selectUrl - url that returns json data
 * name - distinct name for your field
 * selectedValue - field holding the selected value in your jsx file
 * valueChanged - function to be called when selected option changes
 */

var SingleSelectWithOptions = createReactClass({
    displayName: "SingleSelectWithOptions",


    render: function render() {
        var options = [];
        $.each(this.props.data, function (index, item) {
            options.push(
                {value: item.value, label: item.label}
            );
        });
        return (
            <Select
                name={this.props.name}
                ref={this.props.name}
                required={true}
                clearable={false}
                noResultsText={this.props.noResultsText}
                placeholder={this.props.placeholder}
                value={this.props.selectedValue}
                options={options}
                onChange={this.props._valueChanged}
            />
        )
    }
});

var SingleSelect = createReactClass({
    displayName: "SingleSelect",


    getInitialState: function getInitialState() {
        return {
            options: []
        };
    },
    componentDidMount: function componentDidMount() {
        // get your data
        $.ajax({
            url: this.props.selectUrl,
            dataType: 'json',
            cache: false,
            success: this.successHandler
        });
    },

    successHandler: function successHandler(data) {
        // assuming data is an array of {name: value}
        var self = this,
            options = [];
        $.each(data, function (index, item) {
            options.push({ value: item.value, label: item.label });
        });

        this.setState({
            options: options
        });
    },

    render: function render() {

        return (
            <Select
                name= {this.props.name}
                ref= {this.props.name}
                required= {true}
                clearable= {false}
                noResultsText= {this.props.noResultsText}
                placeholder= {this.props.placeholder}
                value= {this.props.selectedValue}
                options= {this.state.options}
                onChange= {this.props.valueChanged}
            />


        )
    }
});

var SingleSelectWithRefresh = createReactClass({
    displayName: "SingleSelectWithRefresh",


    getInitialState: function getInitialState() {
        return {
            options: []
        };
    },

    _getOptions: function _getOptions() {
        // get your data
        $.ajax({
            url: this.props.selectUrl,
            dataType: 'json',
            cache: false,
            success: this.successHandler
        });
    },

    componentDidMount: function componentDidMount() {
        this._getOptions();
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.refresh && this.props._stopRefresh !== undefined) {
            // if refresh is true, refresh data
            this._getOptions();
            this.props._stopRefresh();
            // this.setState({requestsSent: this.state.requestsSent += 1});  // increment to stop infinte looping (fail safe)
        }
    },


    successHandler: function successHandler(data) {
        // assuming data is an array of {name: value}
        var myOptions = [];
        $.each(data, function (index, item) {
            myOptions.push({ value: item.value, label: item.label });
        });
        this.setState({ options: myOptions });
    },

    render: function render() {
        return (
            <Select
                name= {this.props.name}
                ref= {this.props.name}
                delimiter={","}
                clearable= {false}
                noResultsText= {this.props.noResultsText}
                placeholder= {this.props.placeholder}
                multi= {false}
                value= {this.props.selectedValue}
                options= {this.state.options}
                onChange= {this.props.valueChanged}
            />


        )
    }
});

var AsyncSingleSelect = createReactClass({
    displayName: "AsyncSingleSelect",


    getInitialState: function getInitialState() {
        return {
            options: []
        };
    },
    componentDidMount: function componentDidMount() {
        // get your data
        $.ajax({
            url: this.props.selectUrl,
            dataType: 'json',
            cache: false,
            success: this.successHandler
        });
    },

    successHandler: function successHandler(data) {
        // assuming data is an array of {name: value}
        var self = this,
            options = [];
        $.each(data, function (index, item) {
            options.push({ value: item.value, label: item.label });
        });

        this.setState({
            options: options
        });
    },

    getOptions: function getOptions(input, callback) {
        var _this = this;
        setTimeout(function () {
            callback(null, {
                options: _this.state.options,
                // CAREFUL! Only set this to true when there are no more options,
                // or more specific queries will not be sent to the server.
                complete: true
            });
        }, 500);
    },

    render: function render() {
        return (
            <Select.Async
                name={this.props.name}
                ref={this.props.name}
                required={true}
                clearable={false}
                noResultsText={this.props.noResultsText}
                placeholder={this.props.placeholder}
                value={this.props.selectedValue}
                onChange={this.props._valueChanged}
                loadOptions={this.getOptions}
            />

        )

    }
});

var MultiSelectWithOptions = createReactClass({
    displayName: "MultiSelectWithOptions",

    render: function render() {
        ////console.log('@@@ inside the multiselect with options');
        // var options = [];
        // $.each(this.props.options, function (index, item) {
        //     ////console.log('@@@label '+ item.label);
        //     ////console.log('@@@value '+ item.value);
        //     options.push(
        //         {value: item.value, label: item.label}
        //     );
        // });

        <Select
            name={this.props.name}
            ref={this.props.name}
            clearable={false}
            delimiter={","}
            noResultsText={this.props.noResultsText}
            placeholder={this.props.placeholder}
            multi={true}
            value={this.props.selectedValue}
            options={options}
            onChange={this.props._valueChanged}
        />
    }
});

/**
 *Multielect component
 * Used when you expect user to make/ pick multiple choices from a list
 *
 * Pass parameters :
 * selectUrl - url that returns json data
 * name - distinct name for your field
 * selectedValue - field holding the selected value in your jsx file
 * valueChanged - function to be called when selected option changes
 */

var MultiSelect = createReactClass({
    displayName: "MultiSelect",


    getInitialState: function getInitialState() {
        return {
            options: []
        };
    },

    componentDidMount: function componentDidMount() {

        // get your data
        $.ajax({
            url: this.props.selectUrl,
            dataType: 'json',
            cache: false,
            success: this.successHandler
        });
    },

    successHandler: function successHandler(data) {
        // assuming data is an array of {name: value}
        var self = this;
        $.each(data, function (index, item) {
            self.state.options.push({ value: item.value, label: item.label });
        });

        // this.forceUpdate();
    },

    render: function render() {

        return (
            <Select
                name={this.props.name}
                ref={this.props.name}
                clearable={false}
                delimiter={","}
                noResultsText={this.props.noResultsText}
                placeholder={this.props.placeholder}
                multi={true}
                value={this.props.selectedValue}
                options={this.state.options}
                onChange={this.props._valueChanged}
            />
        )
    }
});

var MultiSelectWithRefresh = createReactClass({
    displayName: "MultiSelectWithRefresh",


    getInitialState: function getInitialState() {
        return {
            options: []
        };
    },

    _getOptions: function _getOptions() {
        // get your data
        $.ajax({
            url: this.props.selectUrl,
            dataType: 'json',
            cache: false,
            success: this.successHandler
        });
    },

    componentDidMount: function componentDidMount() {
        this._getOptions();
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.refresh && this.props._stopRefresh !== undefined) {
            // if refresh is true, refresh data
            this._getOptions();
            this.props._stopRefresh();
            // this.setState({requestsSent: this.state.requestsSent += 1});  // increment to stop infinte looping (fail safe)
        }
    },


    successHandler: function successHandler(data) {
        // assuming data is an array of {name: value}
        var myOptions = [];
        $.each(data, function (index, item) {
            myOptions.push({ value: item.value, label: item.label });
        });
        this.setState({ options: myOptions });
    },

    render: function render() {

        return (
            <Select
                name={this.props.name}
                ref={this.props.name}
                clearable={false}
                delimiter={","}
                noResultsText={this.props.noResultsText}
                placeholder={this.props.placeholder}
                multi={true}
                value={this.props.selectedValue}
                options={this.state.options}
                onChange={this.props._valueChanged}
            />
        )
    }
});

/* input for validation*/
var Input = createReactClass({


    //onchange event
    handleChange: function (e) {
        this.props.onChange(e);
    },

    //onblur event
    handleBlur: function (e) {
        // var isValidField = this.isValid(e.target);
        if (this.props.type == 'file') {
            var isValidField = this.isValid(e.target.nextSibling)
        } else {
            var isValidField = this.isValid(e.target);
        }
    },

    getMessageDisplayElement: function (element, validationText) {
        if (this.props.type == 'checkbox') {
            return element.nextSibling.textContent = validationText
        } else if (this.props.type == 'dateOnly' || this.props.type == 'textarea' || this.props.type == 'text' || this.props.type == 'number'
            || this.props.type == 'email' || this.props.type == 'password' || this.props.type == 'file' || this.props.type == 'readonly' || this.props.type == 'month') {
            return element.nextSibling.textContent = validationText
        }
    },

    //validation function
    isValid: function (input) {
        //check required field
        if (input.getAttribute('required') != null && input.value === "") {
            input.classList.add('error'); //add class error
            this.getMessageDisplayElement(input, this.props.messageRequired); // show error message
            return false;
        }
        else {
            input.classList.remove('error');
            this.getMessageDisplayElement(input, "");
        }

        // //check data type // here I will show you email validation // we can add more and will later
        if (input.getAttribute('type') == "email" && input.value != "") {
            if (!this.validateEmail(input.value)) {
                input.classList.add('error');
                input.nextSibling.textContent = this.props.messageEmail;
                return false;
            }
            else {
                input.classList.remove('error');
                input.nextSibling.textContent = "";
            }
        }
        //
        // //check data type // validate password length
        // if (input.getAttribute('type') == "password" && input.value != "") {
        //     if (!this.validatePassword(input.value)) {
        //         input.classList.add('error');
        //         input.nextSibling.textContent = "Password should contain atleast 6 characters";
        //         return false;
        //     }
        //     else {
        //         password = input.value;
        //         input.classList.remove('error');
        //         input.nextSibling.textContent = "";
        //     }
        // }


        return true;
    },
    //email validation function
    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },

    //password validation function
    validatePassword: function (value) {
        if (value) {
            var trimmedValue = value.replace(/^\s+|\s+$/gm, '');
            if (trimmedValue) {
                return trimmedValue.length > 5
            } else {
                return false;
            }
        } else {
            return false;
        }
    },


    //email validation function
    validateRe_enterPassword: function (value) {

        return value.match(passw);
    },


    componentDidMount: function () {
        if (this.props.onComponentMounted) {
            this.props.onComponentMounted(this); //register this input in the form
        }
        var _this = this;
        // $("#" + this.props.id).calendar({
        //     type: 'date',
        //     onChange: function (date) {
        //         _this.props.onChange(date);
        //     }
        // });
        $("#" + this.props.id).calendar({
            type: 'month',
            onChange: function (month) {
                _this.props.onChange(month);
            }
        });
    },


    //render
    render: function () {
        var inputField;
        if (this.props.type == 'textarea') {
            inputField =
                <textarea id={this.props.id} value={this.props.value} ref={this.props.name} name={this.props.name}
                          placeholder={this.props.placeholder} rows={this.props.rows}
                          required={this.props.isrequired}
                          onChange={this.handleChange} onBlur={this.handleBlur}/>

        }
        else if (this.props.type == 'dateOnly') {
            inputField = (
                <div className="datePicker ui calendar" id={this.props.id}>
                    <div className="ui input left icon">
                        <i className="calendar icon"/>
                        <input id={this.props.id} type={this.props.type}
                               value={this.props.value}
                               ref={this.props.name}
                               name={this.props.name}
                               autoFocus={this.props.autoFocus}
                               className='datePickerInput'
                               required={this.props.isrequired}
                               onChange={this.props.onChange}
                               onBlur={this.props.handleBlur}/>
                    </div>
                </div>

            )
        }
        else if (this.props.type == 'month') {
            inputField = (
                <div className="datePicker ui calendar" id={this.props.id}>
                    <div className="ui input left icon">
                        <i className="calendar icon"/>
                        <input id={this.props.id} type={this.props.type}
                               value={this.props.value}
                               ref={this.props.name}
                               name={this.props.name}
                               autoFocus={this.props.autoFocus}
                               className='datePickerInput'
                               required={this.props.isrequired}
                               onChange={this.props.onChange}
                               onBlur={this.props.handleBlur}/>
                    </div>
                </div>

            )
        }
        else if (this.props.type == 'file') {
            //support for accepted types
            inputField = (
                <div className="ui fluid left action input">
                    <div onClick={this.props.onClick} className="ui icon usaidBlue button">
                        <i className="attach icon"/>
                    </div>
                    <input onClick={this.props.onClick} type="text" readOnly
                           value={this.props.fileName}
                           onBlur={this.handleBlur}/>
                    <input id={this.props.id} type={this.props.type} ref={this.props.name}
                           name={this.props.name}
                           style={{display: "none"}}
                           required={this.props.isrequired} onChange={this.handleChange} accept={this.props.accept}
                           onBlur={this.handleBlur}/>
                </div>
            )
        }
        else if (this.props.type == 'password') {
            //support for accepted types
            inputField = (
                <div className="ui left icon input">
                    <i className="lock icon"/>
                    <input id={this.props.id} type={this.props.type} value={this.props.value} ref={this.props.name}
                           name={this.props.name} onBlur={this.handleBlur}
                           required={this.props.isrequired} onChange={this.handleChange}
                           accept={this.props.accept}/>
                </div>
            )

        }
        else if (this.props.type == 'email') {
            //support for accepted types
            inputField =
                <div className="ui left icon input">
                    <i className="user icon"/>
                    <input id={this.props.id} type={this.props.type} value={this.props.value} ref={this.props.name}
                           name={this.props.name} onBlur={this.handleBlur}
                           required={this.props.isrequired} onChange={this.handleChange} accept={this.props.accept}/>
                </div>
        }
        else if (this.props.type == 'readonly') {
            //support for accepted types
            inputField =
                <div className="ui left icon input">
                    <i className="user icon"/>
                    <input id={this.props.id} readonly="" type={this.props.type} value={this.props.value} ref={this.props.name}
                           name={this.props.name} onBlur={this.handleBlur}
                           required={this.props.isrequired} onChange={this.handleChange} accept={this.props.accept}/>
                </div>
        }
        else {
            inputField =
                <input id={this.props.id} type={this.props.type} value={this.props.value} ref={this.props.name}
                       name={this.props.name}
                       required={this.props.isrequired} onChange={this.handleChange}
                       autoFocus={this.props.autoFocus}
                       placeholder={this.props.placeholder}
                       onBlur={this.handleBlur}/>
        }

        return (
            <div className="field">
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
                {inputField}
                <span className="error"/>
            </div>
        );
    }
});