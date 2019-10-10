var networksURL = '/list/networks';
var departmentsURL = '/list/departments';
var Dash = createReactClass({

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

    render: function () {
        return (
            <div className={'ui fluid container'}>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui equal width grid">
                    <div className={'sixteen wide mobile eight wide tablet sixteen wide computer column'}>
                        <div className="sixteen wide column">
                            <div className="ui horizontal segment">
                                <h2>Overview</h2>

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
            Visitors_Graph: [{
                name: 'Mission Grow 1',

                data: [43934, 52503, 57177, 69658, 9703, 101993, 13713, 320357],
                color: '#42AD4A'

            }, {
                name: 'Mission Grow 2',

                data: [33934, 42503, 47177, 39658, 67031, 109931, 97133, 120175],
                color: '#ad7a24'

            }, {
                name: 'Mission Grow 4',

                data: [null, null, null, null, null, null, null, 14175, 34175],
                color: '#ad2f21'

            }, {
                name: 'McKnight',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                color: '#b91c18'
            }, {
                name: 'KCD',
                data: [33934, 82503, 47177, 99658, 77031, 109931, 107133, 134175],
                color: '#aca1b9'
            }, {
                name: 'KCD 2',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: '#1077B9'
            }
            ],
            Visitors_Graph1: [{
                name: 'Village Based Advisors',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: '#AB3A8E'
            }, {
                name: 'Farmers',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                color: '#501E70'
            }],
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
                onDismiss: 'onDismiss'
            }
        }
    },


    componentDidMount: function () {
        //this._loadTransactions();
    },

    render: function () {
        return (
            <div className={'ui fluid container'}>
                <div className="ui equal width grid">
                    <div className={'sixteen wide mobile eight wide tablet sixteen wide computer column'}>
                        <div className="sixteen wide column">
                            <div className="ui horizontal segment">
                                <h2>content begins here</h2>
                                <div className="row">
                                    <div className="ui equal width grid">
                                        <div className="sixteen wide tablet eight wide computer column">
                                            <div className="ui segments">
                                                <div className="ui segment"><Charts chartId="Line_Graph"
                                                                                    chartType="line"
                                                                                    chartTitle="Farmers Reached Across Programs,2011-2019"
                                                                                    yAxisLable="Farmers Reached"
                                                                                    chartData={this.state.Visitors_Graph}/>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="sixteen wide tablet eight wide computer column">
                                            <div className="ui segments">
                                                <div className="ui segment">
                                                    <Charts chartId="Line_Graph1" chartType="line"
                                                            chartTitle="Program Activities "
                                                            yAxisLable="VBAs & Farmers"
                                                            chartData={this.state.Visitors_Graph1}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ui hidden divider"></div>
                                </div>

                                content ends here

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
            <div>
                <Dash/>
                <SysAdminDashboard/>
                <div className="ui hidden divider"></div>
            </div>
        );
    }
});


ReactDOM.render(<Dashboard/>, document.getElementById('appContent'));
// render(<Dash/>,document.getElementById('appContent'));
