var getUserURL = '/list/currentuser';
var listTenantsURL = '/list/tenants';
var Dash = createReactClass({

    getInitialState: function () {
        return {
            userData: [],
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
            }
        }
    },
    _loadUser: function () {
        $.ajax({
            url: getUserURL,
            method: 'GET',
            contentType: "json",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({userData: data});
                console.log("The user's email is: " + data.toString())
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(getUserURL, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this._loadUser();

    },

    render: function () {
        return (
            <div className={'ui fluid container'}>
                <div className="ui equal width grid">
                    <div className={'sixteen wide mobile eight wide tablet sixteen wide computer column'}>
                        <div className="sixteen wide column">
                            <div className="ui horizontal segment">
                                <div className="ui equal width left aligned padded grid stackable">

                                    <div className="row">

                                        <div className="eight wide tablet four wide computer column">
                                            <div className="ui horizontal segments">
                                                <div className="ui inverted teal segment center aligned">

                                                    <div className="ui inverted  statistic">
                                                        <i id="tile_icon"
                                                           className="warehouse icon large own-class"></i>
                                                        <div className="value">
                                                            3
                                                        </div>
                                                        <div className="label">
                                                            Houses Vacant
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ui inverted teal tertiary segment center aligned">
                                                    <div id="sparkline1">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="eight wide tablet four wide computer column">
                                            <div className="ui horizontal segments">
                                                <div className="ui inverted green segment center aligned">

                                                    <div className="ui inverted statistic">
                                                        <i id="tile_icon"
                                                           className="shipping fast icon large own-class"></i>
                                                        <div className="value">
                                                            1
                                                        </div>
                                                        <div className="label">
                                                            Moving Out
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ui inverted green tertiary segment center aligned">
                                                    <div id="sparkline3">
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="eight wide tablet four wide computer column">
                                            <div className="ui horizontal segments">
                                                <div className="ui inverted red segment center aligned">

                                                    <div className="ui inverted statistic">
                                                        <i id="tile_icon"
                                                           className="money bill alternate icon large own-class"></i>
                                                        <div className="value">
                                                            12
                                                        </div>
                                                        <div className="label">
                                                            RENT OVERDUE
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ui inverted red tertiary segment center aligned">
                                                    <div id="sparkline3">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="eight wide tablet four wide computer column">
                                            <div className="ui horizontal segments">
                                                <div className="ui inverted blue segment center aligned">

                                                    <div className="ui inverted statistic">
                                                        <i id="tile_icon"
                                                           className="home  alternate icon large own-class"></i>
                                                        <div className="value">
                                                            9
                                                        </div>
                                                        <div className="label">
                                                            HOUSES OCCUPIED
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ui inverted blue tertiary segment center aligned">
                                                    <div id="sparkline3">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                    {/*the graphs begin here*/}
                                </div>
                            </div>
                        </div>
            </div>
                </div>
            </div>
        );
    }
});

var SysAdminDashboard = createReactClass({
    getInitialState: function () {
        return {
            items: [],
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
                onDismiss: 'onDismiss'
            }
        }
    },


    componentDidMount: function () {
        this._loadTenants();
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
                console.log(data);
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


    render: function () {
        return (
            <div id='fluidcontainer' className={'ui fluid container'}>
                <div className="ui equal width grid">
                    <div className={'sixteen wide mobile eight wide tablet sixteen wide computer column'}>
                        <div className="sixteen wide column">
                            <div className="ui bottom attached segment">

                                <TenantsTable
                                    items={this.state.items}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

var Dashboard = createReactClass({
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
                <Dash/>
                <SysAdminDashboard/>
            </div>
        );
    }
});
/*display tenants on the dashboard*/
var TenantsTable = createReactClass({
    render: function () {
        var subjectItems = null;
        var _this = this;
        {
            this.props.items && this.props.items.length > 0 && (
                subjectItems = this.props.items.map(function (subjectItem, i) {
                    // var boundEditClick = _this.props._handleEditClick.bind(null, subjectItem.id_number);
                    // var boundDeleteClick = _this.props._handleDeleteClick.bind(null, subjectItem.id_number);
                    return (
                        <TenantRow key={subjectItem.id_number} index={i}
                                   subjectItem={subjectItem}
                        />
                    )
                }, this)
            )
        }
        return (
            <div className="row">


                <div id="tblcontainer">
                    <h2>Overview of Tenants</h2>
                    {/*<h3 className="ui top attached header">VBAs Search Results</h3>*/}
                    <div >
                        <table className="ui unstackable table">
                            <thead>
                            <tr>
                                <th>House Number</th>
                                <th>ID Type</th>
                                <th>ID Number</th>
                                <th>Tenant Name</th>
                                <th>Phone Number</th>
                            </tr>
                            </thead>
                            <tbody>{subjectItems}</tbody>

                        </table>
                    </div>

                </div>

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
            </tr>

        );
    }
})

ReactDOM.render(<Dashboard/>, document.getElementById('appContent'));
// render(<Dash/>,document.getElementById('appContent'));
