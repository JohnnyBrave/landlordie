var usernameURL = '/list/currentuser';
var searchURL = "/executeSearch";
var exportURL = "/exportResults";
var networksURL = '/list/networks';
var departmentsURL = '/list/departments';
var editVBAsURL = '/editVBAs';
var addVbaURL = '/addVBA'
var saveVbaURL  = '/saveVBAs';
var updateVbaURL = '/updateVBAs';
var SearchActivity = createReactClass({
    getInitialState: function () {
        return {
            width: window.innerWidth,
            selectedVba: null,
            task: "",
            showModal: false,
            departmentOptions: [],
            networkOptions: [],
            searchResults: [],

            searchParameters: {
                username: '',
                searchType: null,
                department: '',
                network: '',
                fromDate: '',
                toDate: '',
            },
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
            }

        }
    },
    componentDidMount: function () {
        $('#startDate').calendar({
            type: 'date',
            endCalendar: $('#endDate')
        });
        $('#endDate').calendar({
            type: 'date',
            startCalendar: $('#startDate')
        });

    },
    handleWindowSizeChange: function (){
        this.setState({width: window.innerWidth})
    },
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    },

// make sure to remove the listener
// when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    },

    /*
     *listener for facility selection changed
     */
    _departmentChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        //a fix has been made, now value selected is showing
        //it was actually obtaining a whole network object, while we had specified passedValue.value
        tmp.department = passedValue;
        this.setState({searchParameters: tmp});
        this._loadNetworkOptions(passedValue.value)
    },
    /*
    * listener for network selection changed
    * */
    _networkChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.network = passedValue;
        this.setState({searchParameters: tmp});
    },
    /*
    * handles start date changed
    */

    _handleFromDate: function (date) {
        var dateStart = this.state.searchParameters;
        dateStart.fromDate = date;
        this.setState({
            searchParameters: dateStart
        });
    },


    /*
    * handles end date changed
    */

    _handleToDate: function (date) {
        var dateEnd = this.state.searchParameters;
        dateEnd.toDate = date;
        this.setState({
            searchParameters: dateEnd
        });
    },

    /* Handles option change for radio button search type*/
    _handleSearchOptionChange: function (event) {
        var values = this.state.searchParameters;
        values.searchType = event.target.value;
        this.setState({
            searchParameters: values
        });

    },

    /* Handles option change for checkbox With Photo*/
    toggleCheckboxChange: function (event) {
        var values = this.state.searchParameters;
        if (event.target.checked) {
            values.withPhoto = true;
        } else {
            values.withPhoto = false;
        }
        this.setState({searchParameters: values});
    },


    /*
    *Thuis function loads networks based upon which department the user is from by default(if they are regular) and also according to
    * which department they have selected on the departments field
    * */
    _loadNetworkOptions: function (department) {
        var params = JSON.stringify(department)
        $.ajax({
            url: networksURL,
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {

                this.setState({networkOptions: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(networksURL, status, err.toString());
            }.bind(this)
        });
    },
    //show results
    //The showResults method puts the results into the state, which is done by the this.setState method

    showResults: function (data) {
        this.setState({
            searchResults: data

        })
    },

    //test export to xls
    _handleExcelExport: function () {
        this._startPageLoader();
        var paramArray = this.state.searchParameters;
        var params = JSON.stringify(paramArray);


        $.ajax({
            url: exportURL,
            contentType: "application/json; charset=utf-8",
            method: 'POST',
            //  cache: false,
            responseType: 'arraybuffer',
            ///  dataType: 'json',
            data: params,
            xhrFields: {
                responseType: 'blob'
            },
            success: function (response, status, xhr) {
                var filename = "";
                //Content-Disposition header to specify how the web browser should handle this response
                var disposition = xhr.getResponseHeader('Content-Disposition');

                if (disposition) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                }
                var linkelem = document.createElement('a');
                try {
                    var blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            //creating a temporary HTML link element
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");

                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                document.body.appendChild(a);
                                a.target = "_blank";
                                //set the file name and save with current date as file name extension
                                a.download = filename + new Date() + '.xlsx';
                                //triggering the function
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }
                        this._stopPageLoader();
                    }

                } catch (ex) {
                    console.log(ex);
                    this._stopPageLoader();
                }

            }.bind(this),

            error: function (xhr, status, err) {
                //log error found here
                console.log("Data not sent" + err.toString());
                this._stopPageLoader();

            }.bind(this)
        });
    },
    /* handles submit */
    _handleSearchClick: function () {
        this._startPageLoader();
        var paramArray = this.state.searchParameters;
        var params = JSON.stringify(paramArray);

        $.ajax({
            // async: false,
            url: searchURL,
            contentType: "application/json; charset=utf-8",
            method: 'POST',
            headers: {
                "cache-control": "no-cache"
            },
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {
                var _this3 = this;
                if (data.length === 0) {
                    this.setState({ searchResults: [], showResults: false}, function () {
                        _this3._notificationAlert('No results found', 'info');
                        _this3._stopPageLoader();
                    });
                } else {
                    this.setState({ searchResults: data ,showResults: true}, function () {
                        _this3._notificationAlert('Search Results', 'info');
                        _this3._stopPageLoader();
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                this._stopPageLoader();
                console.log("form not sent" + err.toString());
            }.bind(this)
        });

    },

    /*clears all input on the form on cancel button click*/
    _cancelSearch: function () {
        console.log("the values that will be reset are: " + JSON.stringify(this.state.searchParameters))
        var searchParameters = {
            searchType: '',
            department:'',
            network: '',
            fromDate: '',
            toDate: '',
        };

        this.setState({
            searchParameters: searchParameters,
            searchResults: []
        });
        console.log("the values that have been reset are: " + JSON.stringify(this.state.searchParameters))
    },

    _notificationAlert: function (message, type) {
        var _this2 = this;

        this.setState({
            messageResponses: {
                message: message,
                type: type,
                hidden: false
            }
        }, function () {
            return setTimeout(function () {
                return _this2.setState({
                    messageResponses: {
                        message: '',
                        type: '',
                        hidden: true
                    }
                });
            }, 1500);
        });
    },
    _startPageLoader: function () {
        this.setState({ isLoading: true });
    },

    _stopPageLoader: function () {
        this.setState({ isLoading: false });
    },
    showVbaEditModal: function () {
        this.setState({showModal: true});
        $('#modal')
            .modal('setting', 'closable', false)
            .modal('setting', 'transition', 'swing down')
            .modal('show');

    },
    _handleCloseModal: function () {
        this.setState({selectedVba: null, task: '', messageResponses: {message: '', type: 'info', hidden: false},showModal: false});
        $('#modal')
            .modal('hide')
            .modal('hide dimmer');
    },
    _handleEditClick: function (vbacode) {
        $.ajax({
            url: editVBAsURL + "?vbacode=" + vbacode,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({selectedVba: data, task: "Edit "});
                this.showVbaEditModal();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editVBAsURL, status, err.toString());
            }.bind(this)
        });

    },
    _handleAddVbaClick: function () {
        $.ajax({
            url: addVbaURL,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                data.vba={}// vba cannot be null
                this.setState({selectedVba: data, task: "Add ", messageResponses:{message:'Add VBA problem ', type:'info', hidden:false}});
                this.showVbaEditModal();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(addVbaURL, status, err.toString());
            }.bind(this)
        });
    },
    /*
* Handler for text changes on Modal input components
*/
    _textChanged: function (event) {
        var values = this.state.selectedVba;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({selectedVba: values});
        console.log("the values are" + JSON.stringify(values))
    },
    _handleSaveClick: function () {
        var submitUrl;
        var myTask = this.state.task;
        if (myTask == 'Add ') {
            submitUrl = saveVbaURL;
        } else if (myTask == 'Edit ') {
            submitUrl = updateVbaURL;
        }
        var params = JSON.stringify(this.state.selectedVba);
        $.ajax({
            async: true,
            url: submitUrl,
            contentType: "application/json; charset=utf-8",
            method: 'POST',
            headers: {
                "cache-control": "no-cache"
            },
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {
                this.setState({
                        selectedVba: null,
                        task: "",
                        messageResponses: {message: data.message, type: data.type, hidden: false},
                    },
                    function () {
                        //reload the list of VBAs
                        // this._loadVbas();
                        //then close the modal
                        this._handleCloseModal();

                    });

            }.bind(this),
            error: function (xhr, status, err) {
                console.log("form not sent" + err.toString());
            }.bind(this)
        });
    },
    _handleDeleteClick: function (vbacode) {
        $.ajax({
            url: editVBAsURL + "?userId=" + userId,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({selectedVba: data, task: "Edit "});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editVBAsURL, status, err.toString());
            }.bind(this)
        });

    },


    render: function () {
        const { width } = this.state;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width <= 1250;
        var vbaForm = "";
        {

            this.state.selectedVba && (
                vbaForm =
                    <EditVBAModal
                        task={this.state.task}
                        fullForm={true}
                        vba={this.state.selectedVba}
                        textChanged={this._textChanged}
                        saveVba={this._handleSaveClick}
                        cancelVba={this._handleCloseModal}/>
            )
        }


        <VbaTable searchResults={this.state.searchResults}/>
        if (isMobile) {
            return (
                <div>
                    <div className="center aligned row">
                        {vbaForm}
                        <form className="ui form">
                            <div className="ui segments">
                                <div className={'ui segment'}>
                                    <div className="four inline fields">
                                        <div className="field">
                                            <div className="ui toggle checkbox">
                                                <input
                                                    type="radio"
                                                    name="searchType"
                                                    value="Vba"
                                                    checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Vba'}
                                                    onChange={this._handleSearchOptionChange}
                                                />
                                                <label>VBAs</label>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui toggle checkbox">
                                                <input
                                                    type="radio"
                                                    name="searchType"
                                                    value="Farmers"
                                                    checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Farmers'}
                                                    onChange={this._handleSearchOptionChange}
                                                />
                                                <label>Farmers</label>
                                            </div>

                                        </div>
                                        <div className="field">
                                            <div className="ui toggle checkbox">
                                                <input
                                                    type="radio"
                                                    name="searchType"
                                                    value="Trainings"
                                                    checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Trainings'}
                                                    onChange={this._handleSearchOptionChange}
                                                />
                                                <label>Trainings</label>
                                            </div>

                                        </div>
                                        <div className="field">
                                            <div className="ui toggle checkbox">
                                                <input
                                                    type="radio"
                                                    name="searchType"
                                                    value="Interventions"
                                                    checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Interventions'}
                                                    onChange={this._handleSearchOptionChange}
                                                />
                                                <label>Interventions</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="two inline fields">
                                        <div className="field">
                                            <label>Program: <span className={'ui text red'}>*</span></label>
                                            <SingleSelect
                                                name='country.code'
                                                placeholder='type program name here'
                                                selectedValue={this.state.searchParameters && this.state.searchParameters.department}
                                                valueChanged={this._departmentChanged}
                                                selectUrl={departmentsURL}/>
                                        </div>
                                        <div className="field">
                                            <label>Network: <span className={'ui text red'}>*</span></label>
                                            <SingleSelectWithOptions
                                                name="country.code"
                                                placeholder="type network name here"
                                                selectedValue={this.state.searchParameters && this.state.searchParameters.network}
                                                _valueChanged={this._networkChanged}
                                                data={this.state.networkOptions}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {this.state.searchParameters.searchType !== null ?
                                    <div className="ui bottom attached segment">

                                        <div className="ui buttons">
                                            <button type="button"
                                                    className="ui primary button"
                                                    tabIndex="0"
                                                    onClick={this._handleSearchClick}>Search</button>
                                            <div className="or"></div>
                                            <button type="button"
                                                    className="ui red button"
                                                    tabIndex="0"
                                                    onClick={this._cancelSearch}>Cancel</button>
                                            <div className="or"></div>
                                            <button type="button" className="ui positive button"
                                                    tabIndex="0"
                                                    onClick={this._handleExcelExport}>Export</button>



                                        </div>


                                    </div> : null}



                            </div>

                        </form>
                        {this.state.searchParameters.searchType == 'Vba' && this.showResults ?
                            <VbaTable
                                searchResults={this.state.searchResults}
                                _handleEditClick={this._handleEditClick}
                                _handleDeleteClick={this._handleDeleteClick}/> : null}
                        {this.state.searchParameters.searchType == 'Farmers' && this.showResults ?
                            <FarmersTable searchResults={this.state.searchResults}/> : null}
                        {this.state.searchParameters.searchType == 'Trainings' && this.showResults ?
                            <TrainingsTable searchResults={this.state.searchResults}/> : null}
                        {this.state.searchParameters.searchType == 'Interventions' && this.showResults ?
                            <InterventionsTable searchResults={this.state.searchResults}/> : null}
                    </div>
                </div>);
        }
        else {
            return (
                <div  className={'ui fluid container'}>
                    <div   className="ui equal width stretched grid">
                        <div className="sixteen wide column">
                            <div  className="ui segment">
                                <div>
                                    {vbaForm}
                                </div>
                                <div className="row">

                                    <div className="ui grid attached top header">

                                        <div className="two column row">
                                            <div className="left floated left aligned column"><h4>Search for VBAs,
                                                Farmers, Trainings & Interventions</h4>
                                            </div>
                                            <div className="right floated right aligned column">
                                                <button className="ui primary button" type="button"
                                                        onClick={this._handleAddVbaClick}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <form className="ui form">
                                    <div className="ui segments">
                                        <div className={'ui segment'}>
                                            <div className="four inline fields">
                                                <div className="field">
                                                    <div className="ui toggle checkbox">
                                                        <input
                                                            type="radio"
                                                            name="searchType"
                                                            value="Vba"
                                                            checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Vba'}
                                                            onChange={this._handleSearchOptionChange}
                                                        />
                                                        <label>VBAs</label>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="ui toggle checkbox">
                                                        <input
                                                            type="radio"
                                                            name="searchType"
                                                            value="Farmers"
                                                            checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Farmers'}
                                                            onChange={this._handleSearchOptionChange}
                                                        />
                                                        <label>Farmers</label>
                                                    </div>

                                                </div>
                                                <div className="field">
                                                    <div className="ui toggle checkbox">
                                                        <input
                                                            type="radio"
                                                            name="searchType"
                                                            value="Trainings"
                                                            checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Trainings'}
                                                            onChange={this._handleSearchOptionChange}
                                                        />
                                                        <label>Trainings</label>
                                                    </div>

                                                </div>
                                                <div className="field">
                                                    <div className="ui toggle checkbox">
                                                        <input
                                                            type="radio"
                                                            name="searchType"
                                                            value="Interventions"
                                                            checked={this.state.searchParameters && this.state.searchParameters.searchType === 'Interventions'}
                                                            onChange={this._handleSearchOptionChange}
                                                        />
                                                        <label>Interventions</label>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className={'ui segment'}>
                                            <div className="four fields">

                                                <div className="field">
                                                    <label>Program: <span className={'ui text red'}>*</span></label>
                                                    <SingleSelect
                                                        name='country.code'
                                                        placeholder='type program name here'
                                                        selectedValue={this.state.searchParameters && this.state.searchParameters.department}
                                                        valueChanged={this._departmentChanged}
                                                        selectUrl={departmentsURL}/>
                                                </div>
                                                <div className="field">
                                                    <label>Network: <span className={'ui text red'}>*</span></label>
                                                    <SingleSelectWithOptions
                                                        name="country.code"
                                                        placeholder="type network name here"
                                                        selectedValue={this.state.searchParameters && this.state.searchParameters.network}
                                                        _valueChanged={this._networkChanged}
                                                        data={this.state.networkOptions}
                                                    />
                                                </div>
                                                <div className="field">
                                                    <label>From: <span className={'ui text red'}>*</span></label>

                                                    <Input type="month"

                                                           id={'fromDate'}
                                                           name={'fromDate'}
                                                           isrequired={false}
                                                           selected={this.state.fromDate}
                                                           onChange={this._handleFromDate}
                                                           value={this.state.searchParameters && this.state.searchParameters.fromDate}/>

                                                </div>
                                                <div className="field">
                                                    <label>To: <span className={'ui text red'}>*</span></label>

                                                    <Input type="month"
                                                           id={'toDate'}
                                                           name={'toDate'}
                                                           isrequired={false}
                                                           selected={this.state.toDate}
                                                           onChange={this._handleToDate}
                                                           value={this.state.searchParameters && this.state.searchParameters.toDate}/>
                                                </div>
                                            </div>

                                        </div>
                                        {this.state.searchParameters.searchType !== null ?
                                            <div className="ui bottom attached segment">

                                                <div className="ui buttons">
                                                    <button type="button"
                                                            className="ui primary button"
                                                            tabIndex="0"
                                                            onClick={this._handleSearchClick}>Search</button>
                                                    <div className="or"></div>
                                                    <button type="button"
                                                            className="ui red button"
                                                            tabIndex="0"
                                                            onClick={this._cancelSearch}>Cancel</button>
                                                    <div className="or"></div>
                                                    <button type="button" className="ui positive button"
                                                            tabIndex="0"
                                                            onClick={this._handleExcelExport}>Export</button>



                                                </div>


                                            </div> : null}



                                    </div>

                                </form>

                                {this.state.searchParameters.searchType == 'Vba' && this.showResults ?
                                    <VbaTable
                                        searchResults={this.state.searchResults}
                                        _handleEditClick={this._handleEditClick}
                                        _handleDeleteClick={this._handleDeleteClick}/> : null}
                                {this.state.searchParameters.searchType == 'Farmers' && this.showResults ?
                                    <FarmersTable searchResults={this.state.searchResults}/> : null}
                                {this.state.searchParameters.searchType == 'Trainings' && this.showResults ?
                                    <TrainingsTable searchResults={this.state.searchResults}/> : null}
                                {this.state.searchParameters.searchType == 'Interventions' && this.showResults ?
                                    <InterventionsTable searchResults={this.state.searchResults}/> : null}


                            </div>

                        </div>
                        {this.state.isLoading && <Loader/>}
                    </div>

                </div>

            );

        }

    }
});

//Search results table component called VbaTable begins here
//This component will display the visit search results
var VbaTable = createReactClass({
    render: function () {
        var resultItems = "";
        var _this = this;
        {
            this.props.searchResults && this.props.searchResults.length > 0 && (
                resultItems = this.props.searchResults.map(function (resultItem, i) {
                    var boundEditClick = _this.props._handleEditClick.bind(null, resultItem.vbacode);
                    var boundDeleteClick = _this.props._handleDeleteClick.bind(null, resultItem.vbacode);
                    return (
                        <VbasearchResultsRow
                            key={resultItem.vbacode}
                            index={i}
                            resultItem={resultItem}
                            _handleDeleteClick={boundDeleteClick}
                            _handleEditClick={boundEditClick}

                        />
                    )
                }, this))
        }

        return (

            <div className="row">

                <div id="vbaTable">
                    <h3 className="ui top attached header">VBAs Search Results</h3>
                    <div id='tblcontainer'>
                        <table className="ui compact celled definition unstackable table">
                            <thead>
                            <tr>
                                <th>VBA Code</th>
                                <th>VBA Name</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th className="collapsing one wide">Edit</th>
                                <th className="collapsing one wide">Delete</th>
                            </tr>
                            </thead>
                            <tbody>{resultItems}</tbody>

                        </table>
                    </div>

                </div>
            </div>
        )
    }
});

var VbasearchResultsRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.vbacode}</td>
                <td>{this.props.resultItem.vba_name}</td>
                <td>{this.props.resultItem.gender}</td>
                <td>{this.props.resultItem.phone_no}</td>
                <td>{this.props.resultItem.latitude}</td>
                <td>{this.props.resultItem.longitude}</td>
                <td>
                    <button type="button" className="ui icon green submit button" onClick={this.props._handleEditClick}>
                        <i className="edit icon"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="ui icon red submit button" onClick={this.props._handleDeleteClick}>
                        <i className="trash alternate icon"/>
                    </button>
                </td>

            </tr>
        );
    }
});

//Search results table component called DriveinsTable begins here
//This component will display the drive search results
var FarmersTable = createReactClass({
    render: function () {
        var resultItems = "";
        var _this = this;
        {
            this.props.searchResults && this.props.searchResults.length > 0 && (
                resultItems = this.props.searchResults.map(function (resultItem, i) {
                    return (
                        <FarmersSearchResultsRow
                            key={resultItem.hhcode}
                            index={i}
                            resultItem={resultItem}
                        />
                    )
                }, this))
        }

        return (

            <div className="row">

                <div id="farmersTable">
                    <div id='tblcontainer'>
                        <h3 className="ui top attached header">Farmers Search Results</h3>
                        <table className="ui fixed single line celled tablet unstackable striped attached table">
                            <thead>
                            <tr>
                                <th>Network</th>
                                <th>HHCODE</th>
                                <th>Farmer Name</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Subcounty</th>
                                <th>Ward</th>
                                <th>Sublocation</th>
                                <th>Village</th>
                            </tr>
                            </thead>
                            <tbody>{resultItems}</tbody>

                        </table>
                    </div>
                </div>
            </div>

        )
    }
});

var FarmersSearchResultsRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.network}</td>
                <td>{this.props.resultItem.hhcode}</td>
                <td>{this.props.resultItem.gender}</td>
                <td>{this.props.resultItem.phone_no}</td>
            </tr>
        );
    }
});

//Trainings table results table component called TrainingsTable begins here
//This component will display the visit search results
var TrainingsTable = createReactClass({
    render: function () {
        var resultItems = "";
        var _this = this;
        {
            this.props.searchResults && this.props.searchResults.length > 0 && (
                resultItems = this.props.searchResults.map(function (resultItem, i) {
                    return (
                        <TrainingssearchResultsRow
                            key={resultItem.vbacode}
                            index={i}
                            resultItem={resultItem}

                        />
                    )
                }, this))
        }

        return (
            <div className="row">

                <div id="trainingsTable" >
                    <div id='tblcontainer'>
                        <h3 className="ui top attached header">Trainings Search Results</h3>
                        <table className="ui fixed single line celled tablet unstackable striped attached table">
                            <thead>
                            <tr>
                                <th>Training Topic</th>
                                <th>Attendee</th>
                                <th>HHCD</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Boy(s) Below 2 Years</th>
                                <th>Girl(s) Below 2 Years</th>
                            </tr>
                            </thead>
                            <tbody>{resultItems}</tbody>

                        </table>
                    </div>
                </div>
            </div>

        )
    }
});

var TrainingssearchResultsRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.age}</td>
                <td>{this.props.resultItem.age}</td>
                <td>{this.props.resultItem.age}</td>
                <td>{this.props.resultItem.age}</td>
                <td>{this.props.resultItem.age}</td>
                <td>{this.props.resultItem.age}</td>

            </tr>
        );
    }
});


//Interventions table results table component called InterventionsTable begins here
//This component will display the visit search results
var InterventionsTable = createReactClass({
    render: function () {
        var resultItems = "";
        var _this = this;

        {
            this.props.searchResults && this.props.searchResults.length > 0 && (
                resultItems = this.props.searchResults.map(function (resultItem, i) {
                    return (
                        <InterventionssearchResultsRow
                            key={resultItem.hhcode}
                            index={i}
                            resultItem={resultItem}

                        />
                    )
                }, this))
        }

        return (

            <div className="row">

                <div id="interventionsTable" >
                    <div id='tblcontainer'>
                        <h3 className="ui top attached header">Interventions Search Results</h3>
                        <table className="ui fixed single line celled tablet unstackable striped attached table">
                            <thead>
                            <tr>
                                <th>HHCODE</th>
                                <th>Maize</th>
                                <th>Brachiaria</th>
                                <th>Sweetpotatoes</th>
                            </tr>
                            </thead>
                            <tbody>{resultItems}</tbody>

                        </table>
                    </div>
                </div>
            </div>

        )
    }
});

var InterventionssearchResultsRow = createReactClass({

    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.hhcode}</td>
                <td>{this.props.resultItem.vba_name}</td>
                <td>{this.props.resultItem.gender}</td>
                <td>{this.props.resultItem.phone_no}</td>

            </tr>
        );
    }
});

var Search = createReactClass({
    getInitialState: function () {
        return {
            options: []
        }
    },

    componentDidMount: function () {
        $('.ui.dropdown')
            .dropdown();
    },

    render: function () {
        return (
            <div id={'asd'} className={'asd'}>
                <SearchActivity/>
            </div>
        );
    }
});
//ReactDOM.render() method takes 3 parameters, ReactElement, a regular DOMElement
//and a callback function
ReactDOM.render(<Search/>, document.getElementById('appContent'));