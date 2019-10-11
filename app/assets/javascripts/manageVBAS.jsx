var usernameURL = '/list/currentuser';
var facilityURL = '/list/departments';

// var idTypeURL = '/sentinel/list/idType';
var searchURL = "/executeSearch";
var networksURL = '/list/networks';
var departmentsURL = '/list/departments';
var listVBAsURL = '/list/vbas';
var editVBAsURL = '/editVBAs';
var saveVbaURL  = '/saveVBAs';
var updateVbaURL = '/updateVBAs';

var ManageVbas = createReactClass({

    getInitialState: function () {
        return {
            items: [],
            selectedVba: null,
            task: "",
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
            },
            showModal: false,
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

    showVbaEditModal: function () {
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
                        //close the modal
                        this._handleCloseModal();
                        //then reload the list of VBAs
                        this._loadVbas();
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

    render: function () {

        var vbaForm = "";
        {

            this.state.selectedVba && (
                vbaForm = <Modal
                    task={this.state.task}
                    fullForm={true}
                    vba={this.state.selectedVba}
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
                                    {vbaForm}
                                </div>
                                <div className="row">
                                    <div className="ui grid attached top header">
                                        <div className="two column row">
                                            <div className="ui hidden divider"></div>
                                            <div className="left floated left aligned column">
                                                <h3>Manage VBAs</h3>
                                            </div>
                                            <div className="right floated right aligned column">
                                                <button className="ui primary button" type="button"
                                                        onClick={this.showVbaEditModal}>
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
                        <th>Household Code</th>
                        <th>VBA Name</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th className="collapsing one wide">Edit</th>
                        <th className="collapsing one wide">Delete</th>
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
                        <i className="trash alternate icon"/>
                    </button>
                </td>


            </tr>

        );
    }
})
ReactDOM.render(<ManageVbas/>,document.getElementById('appContent'));

