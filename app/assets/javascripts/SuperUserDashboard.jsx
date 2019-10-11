var SuperUserDashboard = React.createClass({
    getInitialState: function () {
        return {
            items: [],
            messageResponses: {
                message: '',
                type: '',
                hidden: true,
                onDismiss: 'onDismiss'
            },
            Visitors_Graph: [{
                name: 'Visits',

                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: '#AB3A8E'

            }, {
                name: 'Appointments',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                color: '#501E70'
            }],
            Visitors_Graph1: [{
                name: 'Visits',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: '#AB3A8E'
            }, {
                name: 'Appointments',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                color: '#501E70'
            }],
            Visitors_Graph2: [{
                name: 'Visits',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: '#AB3A8E'
            }, {
                name: 'Appointments',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                color: '#501E70'
            }],
            Visitors_Graph3: [{
                name: 'Visits',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: '#AB3A8E'
            }, {
                name: 'Appointments',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
                color: '#501E70'
            }]

        }

    },
    componentDidMount: function () {

    },
    render: function () {
        return (
            <div className="ui container">
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>
                <VehicleActivityTiles/>
                <div className="ui equal width grid">
                    <div className="sixteen wide tablet eight wide computer column">
                        <div className="ui segments">
                            <div className="ui segment"><Charts chartId="Line_Graph" chartType="pie"
                                                                chartTitle="Visitor Activity "
                                                                chartData={this.state.Visitors_Graph}/>

                            </div>
                        </div>
                    </div>
                    <div className="sixteen wide tablet eight wide computer column">
                        <div className="ui segments">
                            <div className="ui segment"><Charts chartId="Line_Graph1" chartType="pie1"
                                                                chartTitle="Activity by Entrance "
                                                                chartData={this.state.Visitors_Graph1}/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="ui equal width grid">
                    <div className="sixteen wide tablet eight wide computer column">
                        <div className="ui segments">
                            <div className="ui segment"><Charts chartId="Line_Graph2" chartType="pie"
                                                                chartTitle="Vehicle Entry Activity"
                                                                chartData={this.state.Visitors_Graph2}/></div>

                        </div>
                    </div>
                    <div className="sixteen wide tablet eight wide computer column">
                        <div className="ui segments">
                            <div className="ui segment"><Charts chartId="Line_Graph3" chartType="pie1"
                                                                chartTitle="Vehicle Exit Activity"
                                                                chartData={this.state.Visitors_Graph3}/></div>

                        </div>
                    </div>
                </div>
                <div className="ui hidden divider"></div>
            </div>

        );
    }
});
ReactDOM.render(<SuperUserDashboard/>, document.getElementById('appContent'))