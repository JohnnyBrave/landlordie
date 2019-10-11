/**
 * Created by kevinn on 12/6/16.
 */



var noop = function () {
};

function formatButtons(buttons) {
    if (typeof buttons === 'string')
        buttons = [buttons];
    if (buttons) {
        buttons = buttons.map(function (button) {
            if (typeof button === 'string')
                return {
                    name: button
                };
            return button;
        });
    }
    return buttons || null;
}

window.Notify = React.Component({

    displayName: 'Notify',

    propTypes: {
        id: PropTypes.number.isRequired,
        onDismiss: PropTypes.func,
        hidden: PropTypes.bool,
        timeout: PropTypes.number,
        autoMiss: PropTypes.bool,
        message: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]).isRequired,
        type: PropTypes.string.isRequired,

        /**
         * Buttons can be either `string` or `array`
         *
         * Example:
         *
         *  <Notify buttons='close'/>
         *  or
         *  <Notify buttons=[{name: 'close'}, {name: 'retry'}] />
         *  or
         *  <Notify buttons=[{name: 'close', listener: somefunction}] />
         *  or
         *  <Notify buttons=[{name: 'close', className: 'btn close', listener: somefunction}] />
         *
         */

        buttons: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            })),
            PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                className: PropTypes.string,
                listener: PropTypes.func
            }))
        ])
    },

    getDefaultProps: function () {
        return {
            // onDismiss: noop,
            onDismiss: function () {
            },
            // 2000 ms
            timeout: 5000,
            autoMiss: true
        };
    },

    getInitialState: function () {
        return {
            hidden: false,
            timeToDismiss: null
        };
    },

    dismiss: function () {
        this.setState({
            hidden: true
        });
        // this.props.onDismiss();
        this.clearTimeout();
        return this;
    },

    clearTimeout: function () {
        if (this.state.timeToDismiss) {
            clearTimeout(this.state.timeToDismiss);
            this.setState({
                timeToDismiss: null
            });
        }
        return this;
    },

    handleClick: function (event) {
        this.dismiss();
        var item = this.state.buttons.filter(function (button) {
            return button.name.toLowerCase() === event.target.id
        })[0];
        if (item && item.listener) {
            item.listener(event);
        }
    },

    componentWillMount: function () {
        this.changeState(this.props);
    },

    componentWillUnmount: function () {
        this.clearTimeout();
    },

    changeState: function (nextProps) {
        var buttons = formatButtons(nextProps.buttons),
            message = nextProps.message;

        if (typeof message === 'string')
            message = [message];
        var autoMiss = nextProps.autoMiss ? (buttons ? false : true) : nextProps.autoMiss;
        if (autoMiss && !nextProps.hidden) {
            var timeToDismiss = setTimeout(this.dismiss, nextProps.timeout || this.props.timeout);
            // this.dismiss();
            this.setState({
                timeToDismiss: timeToDismiss,
                hidden: nextProps.hidden,
                buttons: buttons,
                message: message,
                type: nextProps.type
            });
        } else {
            this.setState({
                hidden: nextProps.hidden,
                buttons: buttons,
                message: message,
                type: nextProps.type
            });
        }
    },

    componentWillReceiveProps: function (nextProps) {
        this.changeState(nextProps);
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.id === this.props.id) {
            return !!nextState.hidden;
        }
        return true
    },

    renderChildren: function () {
        if (this.props.children) return this.props.children;
        return this.state.message.map(function (msg, i) {
            return React.createElement('span', {
                key: i
            }, msg);
        });
    },

    render: function () {
        return React.createElement('div', {
                className: 'notify',
                hidden: this.state.hidden
            },
            React.createElement('div', {
                    className: this.state.type
                },
                this.renderChildren()
                ,
                this.state.buttons ? React.createElement('div', {
                        className: 'buttons'
                    },
                    this.state.buttons.map(function (button, i) {
                        return React.createElement('button', {
                            id: button.name.toLowerCase(),
                            key: i,
                            className: button.className ? button.className : button.name.toLowerCase(),
                            onClick: this.handleClick
                        }, button.name)
                    }, this)
                ) : null
            )
        )
    }
});