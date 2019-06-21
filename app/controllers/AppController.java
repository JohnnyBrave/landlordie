package controllers;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.*;
import play.libs.Json;
import play.mvc.Result;
import play.mvc.Security;
import utils.Util;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Utility Controller for handling scenarios like proxying
 * boolean calls the
 *
 * @author root
 */
@Security.Authenticated(Authority.class)
@SubjectPresent
public class AppController extends LandlordieController {


//    protected Users getSystemUser(){
//        UserRole superUserRole = UserRole.find.query().where()
//                .eq("role_code","SUP").findList().get(0);
//        return superUserRole.getUser();
//    }

    public static String[] getSuperUserCodes() {
        String[] adminRoles = {"SUP", "REG"};
        return adminRoles;
    }

    public static String[] getRegularUserCodes() {
        String[] adminRoles = {"REG"};
        return adminRoles;
    }

    public static String[] getTestingUserCodes() {
        String[] adminRoles = {"TES"};
        return adminRoles;
    }

    public Result clearProxy() {
        session(Util.IS_PROXY, "false");
        session(Util.PROXY_DEPARTMENT, "");
        session(Util.PROXY_ROLE, "");
        return ok("Proxy cleared");
    }

    protected Departments getDefaultMemberDepartment(Users user) {
        DepartmentMember departmentMember = DepartmentMember.find.query().where()
                .eq("email", user)
                .eq("default_department", Boolean.TRUE).findOne();
        if (departmentMember == null) {
            return null;
        } else {
            return departmentMember.getDepartment();
        }
    }

    public Result proxy() {
        JsonNode proxyValues = request().body().asJson();
        JsonNode departmentNode = proxyValues.get("selectedProxyDepartment");
        JsonNode roleNode = proxyValues.get("selectedProxyRole");

        String selectedProxyDepartmentId = null;
        String selectedProxyRole = null;
        if (!departmentNode.isNull()) {
            selectedProxyDepartmentId = departmentNode.asText();
        }
        if (!roleNode.isNull()) {
            selectedProxyRole = roleNode.asText();
        }

        if (Util.isEmpty(selectedProxyDepartmentId) && Util.isEmpty(selectedProxyRole)) {//cleared out so clear out
            session(Util.IS_PROXY, "false");
            session(Util.PROXY_DEPARTMENT, "");
            session(Util.PROXY_ROLE, "");
            return ok(views.html.dashboard.render(isLoggedIn(), getUserJson()));
            //return redirect(routes.DashboardController.landing());// reload the dashboard with the new rights

        }


        if (Util.isEmpty(selectedProxyDepartmentId) && !isSuper()) {//user who has access to several departments
            session(Util.IS_PROXY, "false");//this guy is here just to confirm
            session(Util.PROXY_DEPARTMENT, null);
//            return ok(views.html.dashboard.render(isLoggedIn(), getUserJson()));
            return redirect(routes.DashboardController.renderDashboard());// reload the dashboard with the new rights
            //return redirect(routes.DashboardController.landing());// reload the dashboard with the new rights
        }

        if (Util.isNotEmpty(selectedProxyDepartmentId) || Util.isNotEmpty(selectedProxyRole)) {
            if (isSuper()) {
                session(Util.IS_PROXY, "true");
            }
            if (Util.isNotEmpty(selectedProxyDepartmentId)) {
                session(Util.PROXY_DEPARTMENT, selectedProxyDepartmentId);
            }
            if (Util.isNotEmpty(selectedProxyRole)) {
                session(Util.PROXY_ROLE, selectedProxyRole);
            }
//            return ok(views.html.dashboard.render(isLoggedIn(), getUserJson()));
            return redirect(routes.DashboardController.renderDashboard());// reload the dashboard with the new rights
        }

        //TODO: flesh out the proxy functionality after setting the values herein
        return badRequest(Json.stringify(responseMessage("info", "Proxy failed")));
    }

    /**
     * This function checks to see if the user is proxied and if so returns true
     * @return
     */
    protected boolean isProxy() {
        String proxyString = session().get(Util.IS_PROXY);
        if (Util.isEmpty(proxyString)) {
            return false;
        }
        return (new Boolean(proxyString)).booleanValue();
    }

    /**
     * This function returns a JSON representation of the privileges for the
     * current user for conditional rendering on the client side
     *
     * @return
     */

    protected ObjectNode responseMessage(String status, String message) {
        ObjectNode responseNode = Json.newObject();
        responseNode.put("status", status);
        responseNode.put("message", message);
        return responseNode;
    }

    /**
     * If the user has proxied to a facility, this function returns the facility
     * the user has proxied to else it returns the users default facility
     *
     * @return
     */
//    protected Facility currentFacility() {
//        String facilityId = session().get(Util.FACILITY);
//        String proxyFacilityId = session().get(Util.PROXY_FACILITY);
//        if (Util.isEmpty(facilityId) && Util.isEmpty(proxyFacilityId)) {
//            return null;
//        }
//        if(isProxy() && Util.isNotEmpty(proxyFacilityId)){
//            return Facility.find.byId(proxyFacilityId);
//        }
//        return Facility.find.byId(facilityId);
//    }
    /*if the user is proxied to a deparment, this function returns the department
     * the user has proxied to else it returns the user's default department*/
    protected Departments currentDeparment() {
        String department_id = session().get(Util.DEPARTMENT);

        String proxyDepartmentId = session().get(Util.PROXY_DEPARTMENT);

        if (Util.isEmpty(department_id) && Util.isEmpty(proxyDepartmentId)) {
            return null;
        }
        if (isProxy() && Util.isNotEmpty(proxyDepartmentId)) {
            return Departments.find.byId(proxyDepartmentId);
        }
        return Departments.find.byId(department_id);
    }

    /*this method checks whether the user is loggged in*/
    protected boolean isLoggedIn() {
        System.out.println("Inside isLoggedIn  of App Controller");
        return Authority.isLoggedIn(ctx());
    }

    /**
     * If the user is proxied returns the role they are proxied as
     *
     * @return
     */
    protected RefUserRoles getSuperRole() {
        String proxyRole = session().get(Util.PROXY_ROLE);
        if (Util.isEmpty(proxyRole)) {
            return null;
        }
        return RefUserRoles.find.byId(proxyRole);
//        return UserRole.find.query().where().eq("role",proxyRole).query().findOne();
    }

    private ObjectNode getMessage(String type, String message) {
        ObjectNode reponseMessage = play.libs.Json.newObject();
        reponseMessage.put("type", type);
        reponseMessage.put("message", message);
        return reponseMessage;
    }

    protected ObjectNode errorMessage(String message) {
        return getMessage("error", message);
    }

    protected ObjectNode infoMessage(String message) {
        return getMessage("info", message);
    }

    protected ObjectNode warnMessage(String message) {
        return getMessage("warn", message);
    }

    /**
     * Gets the assigned role that the given user has in the system
     *
     * @return
     */
    protected RefUserRoles getRole() {
        Users currentPerson = Authority.getPerson(ctx());
        if (currentPerson.getRoles().size() > 1 || isProxy()) {
            return getSuperRole();
        } else {
            return ((UserRoles) currentPerson.getRoles().get(0)).getRole();

        }
    }

    /*Returns a list of departments/features where the current user is allowed to do stuff*/
    protected List<Departments> getAuthorizedDepartments() {
        List<Departments> departments = new ArrayList<Departments>();

        if (isSuper() && !isProxy()) {
            Departments.find.query()
                    .order("department_name asc").findList();
        } else if (isSuper()) {
//            list only the departments where the user is Super
            System.out.println("Inside getuthorizedDepartments isSuper condition");
            List<UserRoles> userRoles = UserRoles.find.query().where()
                    .eq("role_id", "SUP")
                    .eq("email", Authority.getPerson(ctx())).findList();
            for (UserRoles userRole : userRoles) {
                Departments department = userRole.getDepartment();
                departments.add(department);
            }
        } else if (isRegular()) {
//            list only the features available for a regular user
            System.out.println("Inside getuthorizedDepartments isRegular condition ");
            List<UserRoles> userRoles = UserRoles.find.query().where()
                    .eq("role_id", "REG")
                    .eq("email", Authority.getPerson(ctx())).findList();
            for (UserRoles userRole : userRoles) {
                Departments department = userRole.getDepartment();
                departments.add(department);
            }
        }
        return departments;
    }

    /**
     * This function returns a JSON representation of the privileges for the
     * current user for conditional rendering on the client side
     *
     * @return
     */
    protected ObjectNode getUserJson() {
        Users currentUser = Authority.getPerson(ctx());
        ObjectNode userNode = play.libs.Json.newObject();
        userNode.put("email", currentUser.getEmail());
        //we set this two as they are loaded if a selection is made in the UI
        userNode.put("role", session().get(Util.ROLE));
        userNode.put("program", session().get(Util.DEPARTMENT));
        userNode.put("isProxy", session().get(Util.IS_PROXY));

        Set<String> rolesSet = new HashSet<>();
        Set<String> permissionsSet = new HashSet<>();

        for (String role : currentUser.getRolesList()) {
            rolesSet.add(role);
        }
        for (String permission : currentUser.getPermissionsList()) {
            permissionsSet.add(permission);
        }
        if (isProxy()) {
            rolesSet.add(session().get(Util.PROXY_ROLE));//add the proxy role
            List<Permission> allowedModulesList = Permission.find.query().where().eq("userRole.role_code", session().get(Util.PROXY_ROLE)).findList();
            for (Permission allowedModule : allowedModulesList) {//add the proxy permissions
                permissionsSet.add(allowedModule.getName());
            }
        }

        ArrayNode roles = userNode.putArray("roles");
        for (String role : rolesSet) {
            roles.add(role);
        }
        ArrayNode permissions = userNode.putArray("permissions");
        for (String permission : permissionsSet) {
            permissions.add(permission);
        }

        return userNode;
    }

    protected boolean isSuper() {
        return hasRole("SUP");
    }

    protected boolean isRegular() {
        return "REG".equals(getRole());
    }

    protected boolean isTester() {
        return hasRole("REG");

    }





}
