var usernameURL = '/list/currentuser';
var searchURL = '/executeSearch';
var housesURL = '/list/houses';
var listTenantsURL = '/list/tenants';
var editTenantsURL = '/editTenants';
var saveTenantURL  = '/saveTenants';
var updateTenantURL = '/updateTenants';
var list

var ManageVbas = createReactClass({

    getInitialState: function () {
        return {
            items: [],
            selectedTenant: null,
            task: "",
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
            },
            showModal: false,
        }

    },
    _loadTenants: function () {
        $.ajax({
            url: listTenantsURL,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({items: data, messageResponses: {message: 'VBAs loaded', type: 'info', hidden: false}});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(listTenantsURL, status, err.toString());
            }.bind(this)
        });

    },
    componentDidMount: function () {
        $('.ui.dropdown')
            .dropdown();
        this._loadTenants();
    },

    showTenantEditModal: function () {
        this.setState({showModal: true});
        $('#modal')
            .modal('setting', 'closable', false)
            .modal('setting', 'transition', 'vertical flip')
            .modal('show');

    },
    _handleCloseModal: function () {
        this.setState({showModal: false});
        $('#modal')
            .modal('hide modal');
    },

    _handleEditClick: function (vbacode) {
        $.ajax({
            url: editTenantsURL + "?vbacode=" + vbacode,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({selectedTenant: data, task: "Edit "});
                this.showTenantEditModal();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editTenantsURL, status, err.toString());
            }.bind(this)
        });

    },
    /*
    * Handler for text changes on Modal input components
    */
    _textChanged: function (event) {
        var values = this.state.selectedTenant;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({selectedTenant: values});
        console.log("the values are" + JSON.stringify(values))
    },
    _handleSaveClick: function () {
        var submitUrl;
        var myTask = this.state.task;
        if (myTask == 'Add ') {
            submitUrl = saveTenantURL;
        } else if (myTask == 'Edit ') {
            submitUrl = updateTenantURL;
        }
        var params = JSON.stringify(this.state.selectedTenant);
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
                        selectedTenant: null,
                        task: "",
                        messageResponses: {message: data.message, type: data.type, hidden: false},
                    },
                    function () {
                        //close the modal
                        this._handleCloseModal();
                        //then reload the list of VBAs
                        this._loadTenants();
                    });


            }.bind(this),
            error: function (xhr, status, err) {
                console.log("form not sent" + err.toString());
            }.bind(this)
        });
    },

    _handleCancelClick: function () {
        this.setState({selectedTenant: null, task: '', messageResponses: {message: '', type: 'info', hidden: false}});
        this._handleCloseModal();

    },

    _handleDeleteClick: function (vbacode) {
        $.ajax({
            url: editTenantsURL + "?userId=" + userId,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({selectedTenant: data, task: "Edit "});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editTenantsURL, status, err.toString());
            }.bind(this)
        });

    },

    render: function () {

        var tenantForm = "";
        {

            this.state.selectedTenant && (
                tenantForm = <Modal
                    task={this.state.task}
                    fullForm={true}
                    vba={this.state.selectedTenant}
                    textChanged={this._textChanged}
                    saveVba={this._handleSaveClick}
                    cancelVba={this._handleCloseModal}/>
            )
        }
        return (
            <div className={'ui fluid container'}>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui equal grid">
                    <div className={'sixteen wide mobile eight wide tablet sixteen wide computer column'}>
                        <div className="sixteen wide column">
                            <div className="ui horizontal segment">

                                <div>
                                    {tenantForm}
                                </div>
                                <div className="row">
                                    <div className="ui grid attached top header">
                                        <div className="two column row">
                                            <div className="ui hidden divider"></div>
                                            <div className="left floated left aligned column">
                                                <h3>Manage Tenants</h3>
                                            </div>
                                            <div className="right floated right aligned column">
                                                <button className="ui primary button" type="button"
                                                        onClick={this.showTenantEditModal}>
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
        )
    }
});
var TenantsTable = createReactClass({

    render: function () {
        var tenantItems = null;
        var _this = this;
        {
            this.props.items && this.props.items.length > 0 && (
                tenantItems = this.props.items.map(function (tenantItem, i) {
                    var boundEditClick = _this.props._handleEditClick.bind(null, tenantItem.vbacode);
                    var boundDeleteClick = _this.props._handleDeleteClick.bind(null, tenantItem.vbacode);
                    return (
                        <VbaRow key={tenantItem.vbacode} index={i}
                                tenantItem={tenantItem}
                                _handleDeleteClick={boundDeleteClick}
                                _handleEditClick={boundEditClick}/>
                    )
                }, this)
            )
        }
        return (
            <div className="row">
                <table className="ui fixed single line celled unstackable striped table">
                    <thead>
                    <tr>
                        <th>Household Code</th>
                        <th>VBA Name</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th className="collapsing one wide">Edit</th>
                        <th className="collapsing one wide">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tenantItems}
                    </tbody>

                </table>


            </div>
        )

    }
});
var VbaRow = createReactClass({

    render: function () {
        return (
            <tr>
                <td>{this.props.tenantItem.vbacode}</td>
                <td>{this.props.tenantItem.vba_name}</td>
                <td>{this.props.tenantItem.gender}</td>
                <td>{this.props.tenantItem.phone_no}</td>
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
})
ReactDOM.render(<ManageVbas/>,document.getElementById('appContent'));

