var proxyFacilityUrl = '/list/proxyDepartments';
var proxyRoleUrl = '/list/proxyRole';
var proxyUrl = '/proxy';
var clearProxyUrl = '/sentinel/clearProxy';
var dashboardUrl = '/dashboard';
var getUserURL = '/list/currentuser';


var TopMenuBar = createReactClass({

    getInitialState: function () {
        return {
            userData: [],
            serverResponse: "",
            selectedProxyRole: identity.proxyRole,
            selectedProxyFacility: identity.proxyDepartments
        };
    },

    componentDidMount: function () {
        $('.ui.sidebar')
            .sidebar({
                context: $('.bottom.segment'),
                dimPage: false
            })
            .sidebar('setting', 'transition', 'push');
        $('.ui.dropdown')
            .dropdown();
        // $('.ui.accordion')
        //     .accordion();
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
                console.log("The user's email is: " + data.email.toString())
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(getUserURL, status, err.toString());
            }.bind(this)
        });
    },
    _logout: function(){
        location.href = "/LoggedOut";
    },


    //applies the proxy selection to the session
    _executeProxy: function () {
        //only look for the role if the user is a sys admin
        //otherwise the selection of a facility is sufficient to make the proxy call
        if (this.state.selectedProxyFacility && (!this.state.selectedProxyRole || (this.state.selectedProxyRole && ($.inArray('SUP', identity.roles) >= 0)))) {
            var paramArray = {};
            paramArray.selectedProxyFacility = this.state.selectedProxyFacility;
            paramArray.selectedProxyRole = this.state.selectedProxyRole;
            var params = JSON.stringify(paramArray);
            $.ajax({
                url: proxyUrl,
                contentType: "application/json; charset=utf-8",
                method: 'POST',
                cache: false,
                data: params,
                success: function (data) {
                    console.log("proxy is ok");
                    window.location.replace(dashboardUrl);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(proxyUrl, status, err.toString());
                }.bind(this)
            });
        }
    },


    _proxyFacilityChanged: function (passedValue) {
        var tmp = this.state.selectedProxyFacility;
        tmp = passedValue.value;
        console.log("Selected: val >> " + tmp);
        this.setState({
            selectedProxyFacility: tmp
        }, function () {
            this._executeProxy()
        }.bind(this));
    },

    _proxyRoleChanged: function (passedValue) {
        var tmp = this.state.selectedProxyRole;
        tmp = passedValue.value;
        console.log("Selected: val >> " + tmp);
        this.setState({
            selectedProxyRole: tmp
        }, function () {
            this._executeProxy()
        }.bind(this));
    },


    _clearProxy: function () {
        $.ajax({
            url: clearProxyUrl,
            //contentType: "application/json; charset=utf-8",
            method: 'POST',
            cache: false,
            success: function (data) {
                window.location.reload();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(proxyUrl, status, err.toString());
            }.bind(this)
        });
    },


    render: function () {
        return (

            <div className="ui fixed inverted menu" id="top-menu">


                <a id="menuToggle" className="item">
                    <i className="sidebar icon"/>
                </a>
                <div className={'item'}>
                    <div className="content">
                        <div className="header">
                            <h2>MENU</h2>
                        </div>
                    </div>
                </div>

                <div id={'topmenulabel'} className="item">
                    <div className="ui avatar image">
                        <img src="/assets/images/tom.jpg"/>
                    </div>
                    <div className="content">
                        <div className="header">
                            <h2>{this.state.userData.email}</h2>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div  className="ui blue animated button" tabIndex="0" onClick={this._logout}>
                        <div className="visible content">Sign Out</div>
                        <div className="hidden content">
                            <i id="menuLabel" className="sign out icon"/>
                        </div>
                    </div>
                </div>


                {/*<a id={'topmenulabel'} className="ui right aligned label">*/}
                    {/*<img src="/assets/images/15.png"/>*/}
                        {/*{this.state.userData}*/}
                {/*</a>*/}
                {/*<h2 className="ui header">*/}

                {/*<div className="content">*/}
                {/*FIPS AFRICA DATABASE SYSTEM*/}
                {/*</div>*/}
                {/*</h2>*/}
                <Permit id="top-menu-item" role='' permission='REG'>
                    <div id="top-menu-item" className="three wide column">
                        <SingleSelect
                            id="top-menu-item"
                            name="proxyRole"
                            placeholder="Select a Role"
                            selectedValue={this.state.selectedProxyRole}
                            _valueChanged={this._proxyRoleChanged}
                            selectUrl={proxyRoleUrl}/>
                    </div>
                </Permit>
                <Permit id="top-menu-item" role='' permission='proxy'>
                    <div id="top-menu-item" className="three wide column">
                        <SingleSelect
                            id="top-menu-item"
                            name="proxyFacility"
                            placeholder="Select a Facility"
                            selectedValue={this.state.selectedProxyFacility}
                            _valueChanged={this._proxyFacilityChanged}
                            selectUrl={proxyFacilityUrl}/>
                    </div>
                </Permit>
                <Permit id="top-menu-item" role='' permission='sysadmin'>
                    <div id="top-menu-item" className="one wide column">
                        <button className="ui icon secondary submit button"
                                onClick={this._clearProxy}>
                            <i className="remove icon"/>
                        </button>

                    </div>
                </Permit>
                {/*<div id="topDropDown" className="ui dropdown item" >*/}
                {/*<img className="ui mini circular image"  src="/sentinel/assets/images/15.png"/>*/}
                {/*<i className="dropdown icon"></i>*/}

                {/*<div id="menu" className="menu">*/}
                {/*<a id="menuLabel" className="item" href={"/sentinel/logout"}>*/}
                {/*<i className="sign out icon"/>*/}
                {/*Log Out*/}
                {/*</a>*/}

                {/*</div>*/}

                {/*</div>*/}

            </div>

        );
    }
});

ReactDOM.render(<TopMenuBar/>, document.getElementById('menu'));
