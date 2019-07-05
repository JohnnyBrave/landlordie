var listVBAsURL = '/list/tenants';
var editVBAsURL = '/editVBAs';
var listTenantsURL = '/list/tenants'

var ManageTenants = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            selectedVba: null,
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
    _handleEditClick: function (vbacode) {
        $.ajax({
            url: editVBAsURL + "?vbacode=" + vbacode,
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
    _textChanged: function (event) {
        var values = this.state.selectedVba;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({selectedVba: values});

    },

    render: function () {
        var vbaForm = "";
        {
            this.state.selectedVba && (
                vbaForm = <VbaForm
                    vba={this.state.selectedVba}
                    textChanged={this._textChanged}
                    fullForm={true}
                    task={this.state.task}
                />
            )
        }
        return (
            <div className="ui container">
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                {vbaForm}
                <div className="row">
                    <div className="ui hidden divider"></div>
                    <div className="ui grid attached top header">
                        <div className="two column row">
                            <div className="left floated left aligned column">
                                <h3>Manage VBAs</h3>
                            </div>
                            <div className="right floated right aligned column">
                                <button className="ui primary button" type="button" onClick={this._handleEditClick}>
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
        )
    }
});
var VbasTable = React.createClass({
    render: function () {
        var vbaItems = null;
        var _this = this;
        {
            this.props.items && this.props.items.length > 0 && (
                vbaItems = this.props.items.map(function (vbaItem, i) {
                    var boundEditClick = _this.props._handleEditClick.bind(null, vbaItem.vbacode);
                    var boundDeleteClick = _this.props._handleDeleteClick.bind(null, vbaItem.vbacode);
                    return (
                        <VbaRow key={vbaItem.vbacode} index={i}
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
var VbaRow = React.createClass({
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
