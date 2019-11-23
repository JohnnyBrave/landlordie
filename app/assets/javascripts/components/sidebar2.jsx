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
                    console.log("The user's email is: " + JSON.stringify(data))
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(getUserURL, status, err.toString());
                }.bind(this)
            });
        },

        render: function () {
            return (
                    <div className="ui segment" id="userIcon">
                        <img className="ui centered tiny circular image" src="/assets/images/tom.jpg"/>
                        <div id="logo_desc" className="content">
                            {this.state.userData.first_name}'s Apartments

                        </div>
                        <label id="sidebarLabel">
                            <h2>Hi,&nbsp;{this.state.userData.first_name}&nbsp;{this.state.userData.last_name}<i className="smile icon"></i></h2>
                        </label>
                    </div>
            );
        },

    }
);


var Menu = createReactClass({

    componentDidMount: function () {
        $(".openbtn").on("click", function() {
            $(".ui.sidebar").toggleClass("very thin icon");
            $(".asd").toggleClass("marginlefting");
            $(".sidebar z").toggleClass("displaynone");
            $(".ui.accordion").toggleClass("displaynone");
            $(".ui.dropdown.item").toggleClass("displayblock");

            $(".logo").find('img').toggle();

        })
        $(".ui.dropdown").dropdown({
            allowCategorySelection: true,
            transition: "fade up",
            context: 'sidebar',
            on: "hover"
        });


        $('.ui.accordion').accordion({
            selector: {

            }
        });
    },

    render: function () {
        return (
            <div >
                <div id={'asdsidebar'} className="ui sidebar vertical left menu overlay visible">
                    <div className="item logo">
                        <img src="/assets/images/ekodiesystem.png"/><img id={'asdimg2'}
                                                                      src="/assets/images/apartments.png" />
                    </div>

                    <div className="ui accordion">
                        <Username/>

                        <a id="sidebarLabel" className="item" href={"/dashboard"}>
                            <i className="bar chart icon"></i> Dashboard
                        </a>
                        <a id="sidebarLabel" className="item" href={"/search"}>
                            <i className="search icon"/>
                            Search
                        </a>
                        <a id="sidebarLabel" className="item">
                            <b>Coming Soon <i className="spinner icon"/></b>
                        </a>
                        <div id="sidebarLabel" className="title item">
                            <i  className="dropdown icon"></i> <i className="users icon"/>Manage Tenants
                        </div>
                        <div className="content">
                            <a id="sidebarLabel2" className="item" href="/tenants">Tenant Information<i className="info icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="/#">Lease Agreements<i className="file outline icon"></i>
                            </a>
                            {/*<a id="sidebarLabel2" className="item" href="/maps">Agro-dealers<i className="building icon"></i>*/}
                            {/*</a>*/}
                        </div>

                        <div id="sidebarLabel"  className="title item">
                            <i className="dropdown icon"></i> <i className="money bill alternate icon"/>Payments & Bills
                        </div>
                        <div className="content">
                            <a id="sidebarLabel2" className="item" href="#"> Rent Deposit<i className="dollar sign icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> Rent Bills<i className="dollar sign icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> Rent Bills<i className="dollar sign icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> Water Bills<i className="dollar sign icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> Electricity Bills<i className="dollar sign icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> Garbage Collection  Bills<i className="dollar sign icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#">Rent  Deposit Bills <i className="dollar sign icon"></i>
                            </a>
                        </div>
                        <div id="sidebarLabel"  className="title item">
                            <i className="dropdown icon"></i> <i className="volume up icon"/>Broadcasts
                        </div>
                        <div className="content">
                            <a id="sidebarLabel2" className="item" href="#"> SMS Tenants<i className="paper plane icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> Email Tenants<i className="envelope icon"></i>
                            </a>
                            <a id="sidebarLabel2" className="item" href="#"> WhatsApp Tenants<i className="whatsapp icon"></i>
                            </a>
                        </div>
                        <a id="sidebarLabel" className="item" href={"/search"}>
                            <i className="book icon"/>
                            Receipts
                        </a>
                        {/*<div id="sidebarLabel"  className="title item">*/}
                        {/*<i className="dropdown icon"></i> Chart*/}
                        {/*</div>*/}
                        {/*<div className="content">*/}
                        {/*<a id="sidebarLabel2" className="item" href="chart.html">Charts 1*/}
                        {/*</a>*/}
                        {/*<a id="sidebarLabel2" className="item" href="chart-2.html">Charts 2*/}
                        {/*</a>*/}
                        {/*<a id="sidebarLabel2" className="item" href="chart-3.html">Charts 3*/}
                        {/*</a>*/}
                        {/*</div>*/}
                    </div>

                </div>

            </div>
        );
    }
});



ReactDOM.render(<Menu/>, document.getElementById('sideBar'));