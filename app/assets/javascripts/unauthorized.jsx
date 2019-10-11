function Unauthorized() {
    return (
        <div className="ui middle aligned center aligned grid">


            <div className="column twelve wide">

                <div className="ui segment">
                    <h2 id="fipsimage" className="ui header">


                        <img className="ui image" src="/assets/images/fips_logo.png"/>

                    </h2>

                    <div className="container">
                        <div className="row">
                            <div className="column">
                                <p><i className="security-button-bar"></i><br/>Status Code: 403</p>
                            </div>
                            <div className="column">
                                <h2>SORRY</h2>
                                <h3>Sorry, your access is refused due to security reasons of our server and also our
                                    sensitive data.<br/>Please go back to the previous page to continue browsing.</h3>
                                <a className="red button" href="javascript:history.back()">Go Back</a>
                            </div>
                        </div>
                    </div>



                </div>


            </div>
        </div>

    );
}

ReactDOM.render(<Unauthorized/>, document.getElementById('unauthorized'));

