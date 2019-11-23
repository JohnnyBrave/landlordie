var getUserURL = '/list/currentuser';

var Username = createReactClass(
    {
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
        componentDidMount: function () {
            this._loadUser();
        },
        /*
*definition of handler for collecting username
*/

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

        render: function () {
            return (
                <div>
                    <h2 className="ui center aligned icon header">
                        <img id="apartmentslogo" className="ui image" src="/assets/images/apartments.png"/>
                        <div id="logo_desc" className="content">
                            Oasis
                        </div>
                    </h2>
                    <label>
                        <h2>Hi,&nbsp;{this.state.userData.first_name}<i className="smile icon"></i></h2>
                    </label>
                </div>
            );
        },

    }
);


var Menu = createReactClass({

    componentDidMount: function () {
        $('.ui.dropdown')
            .dropdown();
        $('.ui.sidebar')
            .sidebar({
                context: $('#content'),
                dimPage: false
            })
            .sidebar('setting', 'transition', 'push')
            .sidebar('attach events', '#menuToggle');


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
            <div id="menuItems" className="ui inverted left vertical sidebar menu ">
                <div className="ui segment" id="userIcon">

                    {/*<img className="ui centered tiny circular image" src="/assets/images/apartments.png"/>*/}

                    <h3 id="userIconText"><Username/></h3>
                </div>
                <a id="menuLabel" className="item" href={"/dashboard"}>
                    <i className="dashboard icon"></i> Dashboard
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
                                Deposit Refunds <i className="dollar sign icon"></i>
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
                    Receipts
                </a>

            </div>
        );
    }
});


ReactDOM.render(<Menu/>, document.getElementById('sideBar'));