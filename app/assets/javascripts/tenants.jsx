var listVBAsURL = '/list/tenants';
var editTenantsURL = '/manage/edit_tenants';
var listTenantsURL = '/list/tenants'

var ManageTenants = createReactClass({
    getInitialState: function () {
        return {
            items: [],
            selectedVba: null,
            selectedSubject: null,
            task: "",
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
            }
        }

    },
    _loadVbas: function () {
        $.ajax({
            url: listVBAsURL,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({items: data, messageResponses: {message: 'VBAs loaded', type: 'info', hidden: false}});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(listVBAsURL, status, err.toString());
            }.bind(this)
        });

    },
    componentDidMount: function () {
        $('.ui.dropdown')
            .dropdown();
        this._loadVbas();
    },
    showModal: function () {
        $('Add_VBA_Modal.ui.basic.modal')
            .modal('setting', 'closable', false)
            .modal('setting', 'transition', 'vertical flip')
            .modal('show');

    },
    hideModal: function () {
        $('Add_VBA_Modal')
            .modal('hide');
    },
    _handleEditClick: function (id_number) {
        $.ajax({
            url: editTenantsURL + "?id_number=" + id_number,
            method: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({selectedSubject: data, task: "Edit "});

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(editTenantsURL, status, err.toString());
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
    _textChanged: function (event) {
        var values = this.state.selectedVba;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({selectedVba: values});

    },

    render: function () {
        var tenantForm = "";
        {
            this.state.selectedVba && (
                tenantForm = <TenantForm
                    person={this.state.selectedSubject}
                    textChanged={this._textChanged}
                    fullForm={true}
                    task={this.state.task}
                />
            )
        }
        return (
            <div className={'ui fluid container'}>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
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
                                                        onClick={this._handleEditClick}>
                                                    Add
                                                </button>

                                            </div>


                                        </div>

                                    </div>

                                </div>
                                <VbasTable
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
var VbasTable = createReactClass({
    render: function () {
        var vbaItems = null;
        var _this = this;
        {
            this.props.items && this.props.items.length > 0 && (
                vbaItems = this.props.items.map(function (vbaItem, i) {
                    var boundEditClick = _this.props._handleEditClick.bind(null, vbaItem.id_number);
                    var boundDeleteClick = _this.props._handleDeleteClick.bind(null, vbaItem.id_number);
                    return (
                        <VbaRow key={vbaItem.id_number} index={i}
                                vbaItem={vbaItem}
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
                        <th>House Id</th>
                        <th>Tenant Name</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th className="collapsing one wide">&emsp;</th>
                        <th className="collapsing one wide">&emsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vbaItems}
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
                <td>{this.props.vbaItem.vbacode}</td>
                <td>{this.props.vbaItem.vba_name}</td>
                <td>{this.props.vbaItem.gender}</td>
                <td>{this.props.vbaItem.phone_no}</td>
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
