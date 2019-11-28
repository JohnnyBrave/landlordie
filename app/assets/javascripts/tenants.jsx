var editTenantsURL = '/editTenants';
var listTenantsURL = '/list/tenants';
var addSubjectURL = '/addTenant'
var saveSubjectURL  = '/saveTenants';
var updateSubjectURL = '/updateTenants';

var ManageTenants = createReactClass({
    getInitialState: function () {
        return {
            items: [],
            selectedSubject: null,
            task: "",
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
            }
        }

    },
    _loadTenants: function () {
        this._startPageLoader();
        $.ajax({
            url: listTenantsURL,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({items: data, messageResponses: {message: 'Tenants loaded', type: 'info', hidden: false}});
                this._stopPageLoader();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(listTenantsURL, status, err.toString());
            }.bind(this)
        });

    },
    _startPageLoader: function () {
        this.setState({ isLoading: true });
    },

    _stopPageLoader: function () {
        this.setState({ isLoading: false });
    },

    componentDidMount: function () {
        $('.ui.dropdown')
            .dropdown();
        this._loadTenants();
    },
    showModal: function () {
        this.setState({showModal: true});
        $('#modal')
            .modal('setting', 'closable', false)
            .modal('setting', 'transition', 'swing down')
            .modal('show');

    },
    _handleCloseModal: function () {
        this.setState({selectedSubject: null, task: '',messageResponses: {message: '',type: 'info', hidden: false},showModal: false})
        $('#modal')
            .modal('hide')
            .modal('hide dimmer');

    },

    _handleEditClick: function (id_number) {
        $.ajax({
            url: editTenantsURL + "?id_number=" + id_number,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({selectedSubject: data, task: "Edit "});
                this.showModal();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editTenantsURL, status, err.toString());
            }.bind(this)
        });

    },
    _handleAddClick: function () {
        $.ajax({
            url: addSubjectURL,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                /*Subject cannot be null hence we assign an empty object*/
                data.subject={}
                this.setState({selectedSubject: data, task: "Add ",messageResponses:{message:'Error occured while performing add ',type:'info',hidden:false}});
                this.showModal();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(addSubjectURL, status, err.toString());
            }.bind(this)
        });
    },
    _handleDeleteClick: function (vbacode) {
        $.ajax({
            url: editTenantsURL + "?userId=" + userId,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({editTenantsURL: data, task: "Edit "});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editVBAsURL, status, err.toString());
            }.bind(this)
        });

    },
    _handleSaveClick: function () {
        var submitUrl;
        var myTask = this.state.task;
        if (myTask == 'Add ') {
            submitUrl = saveSubjectURL;
        } else if (myTask == 'Edit ') {
            submitUrl = updateSubjectURL;
        }
        var params = JSON.stringify(this.state.selectedSubject);
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
                        //reload the list of Subjects
                        this._loadTenants();
                        //then close the modal
                        this._handleCloseModal();

                    });

            }.bind(this),
            error: function (xhr, status, err) {
                console.log("form not sent" + err.toString());
            }.bind(this)
        });
    },
    _handleCancelClick: function () {
        this.setState({selectedVba: null, task: '', messageResponses: {message: '', type: 'info', hidden: false}});
        this._handleCloseModal();

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

    /*
* Handler for text changes on Modal input components
*/
    _textChanged: function (event) {
        var values = this.state.selectedSubject;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({selectedSubject: values});
        console.log("the values are" + JSON.stringify(values));

    },


    render: function () {
        var tenantForm = "";
        {
            this.state.selectedSubject && (
                tenantForm = <SubjectForm
                    subject={this.state.selectedSubject}
                    textChanged={this._textChanged}
                    fullForm={true}
                    task={this.state.task}
                    saveSubject={this._handleSaveClick}
                    cancelSubject={this._handleCloseModal}
                />
            )
        }
        return (
            <div className={'asd'} id={'asd'}>
                <div className={'ui fluid container'}>
                    <div className="ui equal width grid">
                        <div className={'sixteen wide mobile eight wide tablet sixteen wide computer column'}>
                            <div className="sixteen wide column">
                                <div className="ui horizontal segment">

                                    <div className="ui hidden divider"></div>
                                    {tenantForm}
                                    <div className="row">
                                        <div className="ui grid attached top header">
                                            <div className="two column row">
                                                <div className="left floated left aligned column">
                                                    <h3>Manage Tenants</h3>
                                                </div>
                                                <div className="right floated right aligned column">
                                                    <button className="ui primary button" type="button"
                                                            onClick={this._handleAddClick}>
                                                        Add
                                                    </button>

                                                </div>


                                            </div>

                                        </div>

                                    </div>
                                    <TenantsTable
                                        items={this.state.items}
                                        _handleEditClick={this._handleEditClick}
                                        _handleDeleteClick={this._handleDeleteClick}/>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        )
    }
});
var TenantsTable = createReactClass({
    render: function () {
        var subjectItems = null;
        var _this = this;
        {
            this.props.items && this.props.items.length > 0 && (
                subjectItems = this.props.items.map(function (subjectItem, i) {
                    var boundEditClick = _this.props._handleEditClick.bind(null, subjectItem.id_number);
                    var boundDeleteClick = _this.props._handleDeleteClick.bind(null, subjectItem.id_number);
                    return (
                        <TenantRow key={subjectItem.id_number} index={i}
                                subjectItem={subjectItem}
                                _handleDeleteClick={boundDeleteClick}
                                _handleEditClick={boundEditClick}/>
                    )
                }, this)
            )
        }
        return (
            <div className="row">
                <table className="ui fixed single line celled stackable striped table">
                    <thead>
                    <tr>
                        <th>House Number</th>
                        <th>ID Type</th>
                        <th>ID Number</th>
                        <th>Tenant Name</th>
                        <th>Phone Number</th>
                        <th className="collapsing one wide">&emsp;</th>
                        <th className="collapsing one wide">&emsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjectItems}
                    </tbody>

                </table>

            </div>
        )

    }
});
var TenantRow = createReactClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.subjectItem.house_name.name}</td>
                <td>{this.props.subjectItem.id_type}</td>
                <td>{this.props.subjectItem.id_number}</td>
                <td>{this.props.subjectItem.first_name}&nbsp;{this.props.subjectItem.middle_name}&nbsp;{this.props.subjectItem.last_name}</td>
                <td>{this.props.subjectItem.phone_no}</td>
                <td>
                    <button type="button" className="ui icon green submit button" onClick={this.props._handleEditClick}>
                        <i className="edit icon"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="ui icon red submit button" onClick={this.props._handleDeleteClick}>
                        <i className="trash icon"/>
                    </button>
                </td>

            </tr>

        );
    }
})


ReactDOM.render(<ManageTenants/>, document.getElementById('appContent'));
