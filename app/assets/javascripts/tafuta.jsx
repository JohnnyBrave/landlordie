var usernameURL = '/list/currentuser';
var facilityURL = '/list/departments';

var idTypeURL = '/sentinel/list/idType';
var searchURL = "/executeSearch";
var exportURL = "/exportResults";
var networksURL = '/list/networks';
var departmentsURL = '/list/departments';


var SearchActivity = createReactClass({
    getInitialState: function () {
        return {
            departmentOptions: [],
            networkOptions: [],
            usernameOptions: [],
            searchResults: [],

            searchParameters: {
                username: null,
                searchType: null,
                timeRange: null,
                departments: null,
                networks: null,
                facilityId: null,
                withPhoto: false,
                fromDate: null,
                toDate: null,
                checkedInBy: null,
                checkedOutBy: null,
                visitorIdNumber: null,
                visitorIdType: null,
                vehicleNumberPlate: null,
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

    _loadUserOptions: function (username) {
        var params = JSON.stringify(username)
        $.ajax({
            url: usernameURL,
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {
                console.log("The department you selected is: " + params)
                this.setState({usernameOptions: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(usernameURL, status, err.toString());
            }.bind(this)
        });
    },
    _usernameChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.username = passedValue.value;
        this.setState({searchParameters: tmp});
        this._loadUserOptions(passedValue.value);
    },

    /*
     *listener for facility selection changed
     */
    _departmentChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.departments = passedValue.value;
        this.setState({searchParameters: tmp});
        this._loadDepartmentOptions(passedValue.value);
    },

    /*
    * listener for network selection changed
    * */
    _networkChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.networks = passedValue.value;
        this.setState({searchParameters: tmp});
        this._loadNetworkOptions(passedValue.value)
    },


    /*
    *listener for ID Type selection changed
    */
    _idTypeChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.visitorIdType = passedValue.value;
        this.setState({searchParameters: tmp});
    },


    /*
    *listener for checked in by changed
    */
    _checkInByChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.checkedInBy = passedValue.value;
        this.setState({searchParameters: tmp});

    },

    /*
*listener for checked out by changed
*/
    _checkOutByChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.checkedOutBy = passedValue.value;
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

    /*
    * Handler for text changes on Visitor Id component
    */
    _textChangedIdNumber: function (event) {
        var values = this.state.searchParameters;
        values.visitorIdNumber = event.target.value;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({searchParameters: values});

    },
    /*
     * Handler for text changes on Vehicle Number Plate component
     * */
    _textChangedNumberPlate: function (event) {
        var values = this.state.searchParameters;
        values.vehicleNumberPlate = event.target.value;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({searchParameters: values});

    },
    /*
    *Handles the time range radio button options
    */
    _handleTimeRange: function (event) {
        var values = this.state.searchParameters;
        values.timeRange = event.target.value;
        this.setState({searchParameters: values});
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

    /* handles submit */
    _handleSearchClick: function () {
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
                var jsonData = JSON.stringify(data);
                console.log('Search Results : ', jsonData);
                this.setState({searchResults: data, showResults: true});

            }.bind(this),
            error: function (xhr, status, err) {
                console.log("form not sent" + err.toString());
            }.bind(this)
        });

    },
    /*clears all input on the form on cancel button click*/
    _cancelSearch: function () {
        this.setState({
            searchParameters: {
                searchType: null,
                timeRange: null,
                departments: null,
                departmentCode: null,
                facilityId: null,
                withPhoto: false,
                fromDate: null,
                toDate: null,
                checkedInBy: null,
                checkedOutBy: null,
                visitorIdNumber: null,
                visitorIdType: null,
                vehicleNumberPlate: null,
            },
        });
    },


    /*
    *definition of handler for collecting department options
    */

    _loadDepartmentOptions: function (departments) {
        var params = JSON.stringify(departments)
        $.ajax({
            url: departmentsURL,
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {
                console.log("The department you selected is: " + params)
                this.setState({departmentOptions: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(departmentsURL, status, err.toString());
            }.bind(this)
        });
    },
    /*
*definition of handler for collecting network options
*/

    _loadNetworkOptions: function (networks) {
        var params = JSON.stringify(networks)
        $.ajax({
            url: networksURL,
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {
                console.log("The network you selected is: " + params)
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
    _handleVisitExportClickTest: function () {
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
                    var blob = new Blob([response], {type: 'application/vnd.ms-excel'});

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
                                a.download = filename + new Date() + '.xls';
                                //triggering the function
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }
                    }

                } catch (ex) {
                    console.log(ex);
                }

            }.bind(this),

            error: function (xhr, status, err) {
                //log error found here
                console.log("Data not sent" + err.toString());

            }.bind(this)
        });
    },

    render: function () {
        <VbaTable searchResults={this.state.searchResults}/>
        return (
            <div>
                <div className="ui container">
                    <div className="ui hidden divider"></div>
                    <div className="ui hidden divider"></div>
                    <div className="ui hidden divider"></div>
                    <div className="ui hidden divider"></div>
                    <div className="ui segments marginTop40">
                        <div className="row">
                            <div className="ui grid attached top header">
                                <div className="two column row">
                                    <div className="left floated left aligned column"><h3>Search for VBAs, Farmers,
                                        Trainings & Interventions</h3>
                                    </div>
                                    <div className="right floated right aligned column">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="ui form">
                            <div className="ui segments">
                                <div className="field">
                                    <div className="two fields">
                                        <div className="ui hidden divider"></div>
                                        <div className="ui hidden divider"></div>
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


                            </div>


                            <div className="two fields">

                                <div className="field">
                                    <label>Programs</label>
                                    <Select
                                        name="country.code"
                                        placeholder="Department"
                                        options={this.state.departmentOptions}
                                        selectedValue={this.state.searchParameters && this.state.searchParameters.departments}
                                        _valueChanged={this._departmentChanged}
                                        selectUrl={departmentsURL}/>
                                </div>


                                <div className="field">
                                    <label>Network</label>
                                    <Select
                                        name="country.code"
                                        placeholder="Network"
                                        options={this.state.networkOptions}
                                        selectedValue={this.state.searchParameters && this.state.searchParameters.networks}
                                        _valueChanged={this._networkChanged}
                                        selectUrl={networksURL}/>
                                </div>


                            </div>

                            <div className="ui bottom attached segment">

                                <button type="button"
                                        className="ui primary button"
                                        tabIndex="0"
                                        onClick={this._handleSearchClick}>Search
                                </button>
                                <button type="button" className="ui red button"
                                        onClick={this._cancelSearch}>Cancel
                                </button>

                                {this.state.searchParameters.searchType !== null ?
                                    <button type="button" className="right floated ui primary button" tabIndex="0"
                                            onClick={this._handleVisitExportClickTest}>Export</button> : null}
                            </div>

                        </form>


                    </div>
                    {this.state.searchParameters.searchType == 'Vba' && this.showResults ?
                        <VbaTable searchResults={this.state.searchResults}/> : null}
                    {this.state.searchParameters.searchType == 'Farmers' && this.showResults ?
                        <FarmersTable searchResults={this.state.searchResults}/> : null}
                    {this.state.searchParameters.searchType == 'Trainings' && this.showResults ?
                        <TrainingsTable searchResults={this.state.searchResults}/> : null}
                    {this.state.searchParameters.searchType == 'Interventions' && this.showResults ?
                        <InterventionsTable searchResults={this.state.searchResults}/> : null}
                </div>
            </div>


        );
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
                    return (
                        <VbasearchResultsRow
                            key={resultItem.vbacode}
                            index={i}
                            resultItem={resultItem}

                        />
                    )
                }, this))
        }

        return (

            <div className="row">

                <div id="vbaTable" className="vbaTable">
                    <h3 className="ui top attached header">Search Results</h3>
                    <table className="ui fixed single line celled unstackable striped attached table">
                        <thead>
                        <tr>
                            <th>Household Code</th>
                            <th>VBA Name</th>
                            <th>Gender</th>
                            <th>Phone Number</th>


                        </tr>
                        </thead>
                        <tbody>
                        {resultItems}
                        </tbody>
                    </table>
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
                            key={resultItem.id}
                            index={i}
                            resultItem={resultItem}
                        />
                    )
                }, this))
        }

        return (

            <div className="row">

                <div id="vehicleTable" className="vehicleTable">
                    <h3 className="ui top attached header">Search Results</h3>

                    <table className="ui fixed single line celled unstackable striped attached table">
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
                        <tbody>
                        {resultItems}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});

var FarmersSearchResultsRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.vbacode}</td>
                <td>{this.props.resultItem.vba_name}</td>
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

                <div id="trainingsTable" className="vbaTable">
                    <h3 className="ui top attached header">Search Results</h3>
                    <table className="ui fixed single line celled unstackable striped attached table">
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
                        <tbody>
                        {resultItems}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});

var TrainingssearchResultsRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.vbacode}</td>
                <td>{this.props.resultItem.vba_name}</td>
                <td>{this.props.resultItem.gender}</td>
                <td>{this.props.resultItem.phone_no}</td>

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
                            key={resultItem.vbacode}
                            index={i}
                            resultItem={resultItem}

                        />
                    )
                }, this))
        }

        return (


            <div className="row">

                <div id="trainingsTable" className="vbaTable">
                    <h3 className="ui top attached header">Search Results</h3>
                    <table className="ui fixed single line celled unstackable striped attached table">
                        <thead>
                        <tr>
                            <th>HHCODE</th>
                            <th>Maize</th>
                            <th>Brachiaria</th>
                            <th>Sweetpotatoes</th>


                        </tr>
                        </thead>
                        <tbody>
                        {resultItems}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});

var InterventionssearchResultsRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.resultItem.vbacode}</td>
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
            <div className="ui container">
                <SearchActivity/>
            </div>
        );
    }
});
//ReactDOM.render() method takes 3 parameters, ReactElement, a regular DOMElement
//and a callback function
ReactDOM.render(<Search/>, document.getElementById('appContent'));
