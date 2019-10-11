function RegularUserDashboard() {
    return (
        <div className="admin">


            <div className="pusher">
                <div className="full height">
                    {/*Load Sidebar Menu In App.js loadhtml function*/}
                    <Sidebar/>


                    {/*Load Sidebar Menu In App.js loadhtml function*/}
                    <div className="article">
                        {/*Load Navbar Menu In App.js loadhtml function*/}
                        <div className="navbarmenu">
                            {/*<Header/>*/}
                        </div>
                        {/*Load Navbar Menu In App.js loadhtml function*/}
                        {/*container begins here*/}
                        <div className="containerli">
                            {/*dashboard content begins here*/}
                            <e>the dashboard content will go here</e>

                            <div className="ui equal width left aligned padded grid stackable">

                                {/*first row begins here*/}
                                <div className="row">

                                    {/*columns will go here*/}
                                    {/*first column*/}
                                    <div className="eight wide tablet four wide computer column">


                                        <div className="ui horizontal segments">
                                            <div className="ui inverted teal segment center aligned">

                                                <div className="ui inverted  statistic">
                                                    <div className="value">
                                                        15,000
                                                    </div>
                                                    <div className="label">
                                                        FARMERS
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted teal tertiary segment center aligned">
                                                <div id="sparkline1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*second column*/}
                                    <div className="eight wide tablet four wide computer column">
                                        <div className="ui horizontal segments">
                                            <div className="ui inverted blue segment center aligned">

                                                <div className="ui inverted statistic">
                                                    <div className="value">
                                                        15
                                                    </div>
                                                    <div className="label">
                                                        NETWORKS
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted blue tertiary segment center aligned">
                                                <div id="sparkline3">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*third column*/}
                                    <div className="eight wide tablet four wide computer column">
                                        <div className="ui horizontal segments">
                                            <div className="ui inverted green segment center aligned">

                                                <div className="ui inverted statistic">
                                                    <div className="value">
                                                        205
                                                    </div>
                                                    <div className="label">
                                                        VILLAGE BASED ADVISORS
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted green tertiary segment center aligned">
                                                <div id="sparkline4">
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                {/*first row ends here*/}

                                {/*second row begins here*/}
                                <div className="row">
                                    {/*columns will go here*/}
                                    {/*first column*/}
                                    <div className="eight wide tablet four wide computer column">


                                        <div className="ui horizontal segments">
                                            <div className="ui inverted teal segment center aligned">

                                                <div className="ui inverted  statistic">
                                                    <div className="value">
                                                        15,000
                                                    </div>
                                                    <div className="label">
                                                        FARMERS
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted teal tertiary segment center aligned">
                                                <div id="sparkline1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*second column*/}
                                    <div className="eight wide tablet four wide computer column">
                                        <div className="ui horizontal segments">
                                            <div className="ui inverted blue segment center aligned">

                                                <div className="ui inverted statistic">
                                                    <div className="value">
                                                        15
                                                    </div>
                                                    <div className="label">
                                                        NETWORKS
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted blue tertiary segment center aligned">
                                                <div id="sparkline3">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*third column*/}
                                    <div className="eight wide tablet four wide computer column">
                                        <div className="ui horizontal segments">
                                            <div className="ui inverted green segment center aligned">

                                                <div className="ui inverted statistic">
                                                    <div className="value">
                                                        205
                                                    </div>
                                                    <div className="label">
                                                        VILLAGE BASED ADVISORS
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted green tertiary segment center aligned">
                                                <div id="sparkline4">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title">
                                        <i className="music icon"></i>
                                        POET
                                        <i className="group icon"></i>
                                    </div>


                                </div>
                                {/*second row ends here*/}


                            </div>
                            {/*dashboard content will end here*/}


                        </div>
                        {/*comntainer ends here*/}

                    </div>


                </div>

            </div>
        </div>


    );
}

//ReactDOM.render() method takes 3 parameters, ReactElement, a regular DOMElement
//and a callback function
//     document.getElementById('content')
ReactDOM.render(<RegularUserDashboard/>, document.getElementById('pusher'));

