var usernameURL = '/list/currentuser';

var Username = React.createClass(
    {

        getInitialState: function () {
            return {
                usernameOptions: [],

                usernameParameters: {
                    username: 'Landlordie',
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
                <div>
                    <label id="logo_desc">
                        Landlordie
                    </label>
                </div>
            );
        },

        /*
*definition of handler for collecting username
*/

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

        /*a listener for username changed*/

        _usernameChanged: function (passedValue) {
            var tmp = this.state.usernameParameters;
            tmp.username = passedValue.value;
            this.setState({usernameParameters: tmp});
            this._loadUserOptions(passedValue.value);
        },


    }
);


var Sidebar = React.createClass({

    componentDidMount: function () {
        $('.ui.dropdown')
            .dropdown();

        // $(window).width()
        $('.ui.accordion')
            .accordion({
                selector: {
                    trigger: '#open'
                }
            });


        $('#content').css({minHeight: $(window).innerHeight() - 0});
        $(window).resize(function () {
            $('#content').css({minHeight: $(window).innerHeight() - 0});
        });
    },
    render: function () {
        return (
            <div id="menuItems" className="ui left vertical inverted visible sidebar menu">

                <div className="ui segment" id="userIcon">
                    <img className="ui centered tiny circular image" src="/assets/images/apartments.png"/>
                    <h3 id="userIconText"><Username/></h3>
                </div>
                <a id="menuLabel" className="item" href={"/dashboard"}>
                    <i className="bar chart icon"></i> Dashboard
                </a>
                <div className="item">
                    <div className="ui accordion">
                        <a id="open" className="active title">
                            <i className="users icon"/>
                            Manage Tenants
                            <i id="openIcon" className="dropdown icon"/>
                        </a>

                        <div className="content">
                            <a className="item" href="/manage/tenantinfo">
                                Tenant Information<i className="info icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_dom">
                                Lease Agreements <i className="file outline icon"></i>
                            </a>

                        </div>
                    </div>

                </div>
                <div className="item">
                    <div className="ui accordion">
                        <a id="open" className="title">
                            <i className="money bill alternate icon"/>
                            Payments & Bills
                            <i id="openIcon" className="dropdown icon"/>
                        </a>

                        <div className="content">

                            <a className="item" href="biodata_mnc_rh.php">
                                Rent Deposit<i className="dollar sign icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_dom">
                                Rent Bills <i className="dollar sign icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_pam.php">
                                Water Bills <i className="dollar sign icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_dom">
                                Electricity Bills <i className="dollar sign icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_dom">
                                Garbage Collection<i className="dollar sign icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_rh.php">
                                Rent Deposit Refunds <i className="dollar sign icon"></i>
                            </a>

                        </div>
                    </div>

                </div>
                <div className="item">
                    <div className="ui accordion">
                        <a id="open" className="title">
                            <i className="volume up icon"/>
                            Broadcasts
                            <i id="openIcon" className="dropdown icon"/>
                        </a>

                        <div className="content">

                            <a className="item" href="biodata_mnc_rh.php">
                                SMS Tenants <i className="paper plane icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_dom">
                                Email Tenants <i className="envelope icon"></i>
                            </a>
                            <a className="item" href="biodata_mnc_dom">
                                WhatsApp Tenants <i className="whatsapp icon"></i>
                            </a>

                        </div>
                    </div>

                </div>


                <a id="menuLabel" className="item" href={"/search"}>
                    <i className="search icon"/>
                    Search
                </a>
                <a id="menuLabel" className="item" href={"/fips/reports"}>
                    <i className="book icon"/>
                    Reports
                </a>


                <a id="menuLabel" className="item" href={"/landlordie"}>
                    <i id="menuLabel" className="sign out icon"/>
                    Log Out
                </a>


            </div>
        );
    }
});

ReactDOM.render(<Sidebar/>, document.getElementById('sideBar'));