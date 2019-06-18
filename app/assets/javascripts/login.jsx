function Login (){
    return (
        <div className="ui middle aligned center aligned grid">


            <div className="column twelve wide">


                <div className="ui segment">
                    <h2 className="ui center aligned icon header">
                        <img id="apartmentslogo" className="ui image" src="/assets/images/apartments.png"/>
                            <div id="logo_desc" className="content">
                                Landlordie
                            </div>
                        <div id="logo_desc2" className="content">
                            Managing tenants and bills for landlords made easy
                        </div>

                    </h2>


                    <form id="loginForm" className="ui form" method="post" action="/login">

                        <div className="ui basic segment">

                            <div className="field">
                                <input id="email" placeholder="Username" type="text" name="username"/>

                                <span className="highlight"/><span className="bar"/>
                                <label></label>
                            </div>
                            <div className="field">
                                <input id="password" placeholder="Password" type="password" name="password"/>
                                <span className="highlight"/><span className="bar"/>
                                <label></label>
                            </div>

                            <button className="ui fluid blue   submit button">Login
                                <div className="ripples buttonRipples">
                                    <span className="ripplesCircle"/>
                                </div>
                            </button>
                        </div>
                        <div className="row">
                            <a className="lostPassword">I lost my password</a>
                        </div>
                    </form>

                </div>


            </div>
        </div>

    );
}

ReactDOM.render(<Login/>,document.getElementById('login'));
