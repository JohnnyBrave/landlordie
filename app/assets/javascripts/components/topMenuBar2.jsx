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
        $('.ui.dropdown')
            .dropdown();
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

            <div id={'topmenubar'} className="ui top fixed menu asd borderless">
                <a id="sidebarLabel" className="item openbtn">
                    <i className="icon content"></i>
                </a>
                {/*<a id="sidebarLabel" className="item">FIPS-AFRICA DATA MANAGEMENT PORTAL*/}
                {/*</a>*/}

                <div className="right menu">

                    <div className={'item'}>
                        <a className="ui tag blue label">
                            <img className="ui right spaced avatar image" src="/assets/images/tom.jpg"/>
                            {this.state.userData.first_name}&nbsp;{this.state.userData.last_name}
                        </a>

                    </div>
                    <div className={'item'}>
                        <a>
                            <div  className="ui blue animated button" tabIndex="0" onClick={this._logout}>
                                <div className="visible content">Sign Out</div>
                                <div className="hidden content">
                                    <i id="menuLabel" className="sign out icon"/>
                                </div>
                            </div>
                        </a>
                    </div>

                </div>




            </div>


        );
    }
});

ReactDOM.render(<TopMenuBar/>, document.getElementById('menu'));