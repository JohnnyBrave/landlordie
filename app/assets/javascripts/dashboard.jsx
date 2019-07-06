var networksURL = '/list/networks';
var departmentsURL = '/list/departments';
var Dash = React.createClass({

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
            <div className="ui container">


                <div className="ui page grid">

                    <div className="ui segment">

                        <div className="ui  stackable cards">
                            <div className="card">
                                <div className="content">
                                    <h2 className="header">Ram Usage by accounts</h2>
                                    <div className="ui divider"></div>
                                    <table>
                                        <tr>
                                            <td>
                                                <canvas id="ramUsageChart"></canvas>
                                            </td>
                                            <td className="chartData"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <h2 className="header">Ram Usage by accounts</h2>
                                    <div className="ui divider"></div>
                                    <table>
                                        <tr>
                                            <td>
                                                <canvas id="ramUsageChart"></canvas>
                                            </td>
                                            <td className="chartData"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <h2 className="header">Ram Usage by accounts</h2>
                                    <div className="ui divider"></div>
                                    <table>
                                        <tr>
                                            <td>
                                                <canvas id="ramUsageChart"></canvas>
                                            </td>
                                            <td className="chartData"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <h2 className="header">Disc Usage</h2>
                                    <div className="ui divider"></div>
                                    <table>

                                        <tr>
                                            <td>
                                                <canvas id="discUsageChart"></canvas>
                                            </td>
                                            <td className="chartData"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <h2 className="header">Bandwidth Usage by accounts</h2>
                                    <div className="ui divider"></div>
                                    <canvas id="bandwidthUsageChart"></canvas>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <h2 className="header">New Accounts Report</h2>
                                    <div className="ui divider"></div>
                                    <canvas id="newAccountsChart"></canvas>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>


        );
    }
});


ReactDOM.render(<Dash/>, document.getElementById('appContent'));