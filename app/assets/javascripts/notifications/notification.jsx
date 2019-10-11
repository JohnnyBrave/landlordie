var Notification = createReactClass({

    displayName: 'Notification',

    getInitialState: function () {
        return {
            notification: {}
        }
    },

    show: function (data) {
        $('html, body').animate({scrollTop: 0}, 'slow');
        this.setState({
            notification: data
        });
    },

    onDismiss: function () {
        this.setState({
            result: 'dismiss trigger',
            notification: {hidden: true}
        });
    },

    listener: function (event) {
        event.preventDefault();
        console.log('Event', event.target.id);
        this.setState({
            result: event.target.id + ' button click '
        });
    },


    /*  ----------------------------------------
     Trigger notification with a click event
     ---------------------------------------- */

    handleClick: function () {
        var data = this.props.messageResponses;
        if (data['onDismiss']) {
            data['onDismiss'] = this.onDismiss;
        }
        if (data.buttons) {
            if (typeof data.buttons !== 'string') {
                data.buttons = data.buttons.map(function (button) {
                    if (button.listener) {
                        button.listener = this.listener;
                    }
                    return button;
                }, this)
            }
        }
        this.show(data);
    },

    /*  --------------------------------------------------------
     Trigger notification After component Props are updated
     -------------------------------------------------------- */

    componentWillReceiveProps: function (prevProps) {

        var data = prevProps.messageResponses;
        if (data['onDismiss']) {
            data['onDismiss'] = this.onDismiss;
        }
        if (data.buttons) {
            if (typeof data.buttons !== 'string') {
                data.buttons = data.buttons.map(function (button) {
                    if (button.listener) {
                        button.listener = this.listener;
                    }
                    return button;
                }, this)
            }
        }
        this.show(data);

    },

    /*  ------------------------------------------------
     Trigger notification After component has Loaded/Mounted
     ------------------------------------------------ */

    componentDidMount: function () {
        this.handleClick();
    },

    render: function () {
        var notification = this.state.notification || {};
        return (
            <div className="message">
                {
                    notification && notification.message ?
                        <Notify
                            id={Date.now()}
                            message={notification.message}
                            type={notification.type}
                            autoMiss={notification.autoMiss}
                            onDismiss={notification.onDismiss}
                            buttons={notification.buttons}
                            hidden={notification.hidden}
                            timeout={notification.timeout}>
                            {
                                notification.children ? <h2>{notification.message}</h2> : null
                            }
                        </Notify>
                        : null
                }
            </div>
        )
    }
});