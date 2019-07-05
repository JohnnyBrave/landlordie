/**
 * This component checks the rights and displays the child component if the rights are correct
 */

/**
 * TO DO: Implement A global setState that will hold the identity object
 * this will remove the need to do a refresh on the page when using proxy
 */


var Permit = React.createClass({

    _hasRole: function (role) {
        if (identity != null && identity.roles != null && identity.roles.length > 0) {
            for (var i = 0; i < identity.roles.length; i++) {
                var roleArray = role.split(",");
                var result = $.inArray(identity.roles[i], roleArray);
                if (result >= 0) {
                    if (identity.roles[i] == 'SUP' && identity.isProxy == 'true') {
                        continue;//if the sysdmin is proxied to another role, ignore the SYSADMIN and use the other role
                    }
                    return true;
                }
            }
            return false;
        }
    },

    _hasPermission: function (permission) {
        if (identity != null && identity.permissions != null && identity.permissions.length > 0) {
            for (var i = 0; i < identity.permissions.length; i++) {
                var permissionArray = permission.split(",");
                var result = $.inArray(identity.permissions[i], permissionArray);
                if (result >= 0) {
                    return true;
                }
            }
            return false;
        }
    },

    render: function () {
        if (this._hasRole(this.props.role) || this._hasPermission(this.props.permission)) {
            return this.props.children;
        } else {
            return null;
        }
    }
});
