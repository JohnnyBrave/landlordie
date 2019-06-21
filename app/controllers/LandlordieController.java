package controllers;

import models.UserRoles;
import models.Users;
import play.mvc.Controller;
import utils.Util;

import java.util.List;

public class LandlordieController extends Controller {
    /*
    @author John Makau

    * Utility functions available functions that need to be available to the subclasses
    *
    * */
    public void resolveRoles() {
        List<UserRoles> userRoles = (List<UserRoles>) Authority.getPerson(ctx()).getRoles();
        if (userRoles == null || userRoles.isEmpty()) {
            return;
        }
        /*if the user has only onr role we set that to the current and keep it moving*/
        if (userRoles.size() == 1) {
            UserRoles singleRole = userRoles.get(0);
            session(Util.DEPARTMENT, singleRole.getDepartment().getDepartment_id());
            session(Util.ROLE, singleRole.getRole().getRole_code());
        } else {
            //make the most senior role the current role by default
            //system admin or the super user
            if (hasRole("SUP")) {
                UserRoles singleRole = getRoleByCode("SUP", userRoles);
                session(Util.DEPARTMENT, singleRole.getDepartment().getDepartment_id());
                session(Util.ROLE, singleRole.getRole().getRole_code());
                return;
            }
            //regular user
            if (hasRole("REG")) {
                UserRoles singleRole = getRoleByCode("REG", userRoles);
                session(Util.DEPARTMENT, singleRole.getDepartment().getDepartment_id());
                session(Util.ROLE, singleRole.getRole().getRole_code());
                return;
            }
        }
    }

    private UserRoles getRoleByCode(String string, List<UserRoles> userRoles) {
        if (Util.isEmpty(string)) {
            return null;
        }
        for (UserRoles userRole : userRoles) {
            if (string.equals(userRole.getRole())) {
                return userRole;
            }
        }
        return null;
    }

    protected boolean hasRole(String role) {
        if (Util.isEmpty(role)) {
            return false;
        }
        Users currentUser = Authority.getPerson(ctx());
        if (Util.isEmpty(currentUser.getRolesList())) {
            return false;
        }
        return currentUser.getRolesList().contains(role);
    }


}
