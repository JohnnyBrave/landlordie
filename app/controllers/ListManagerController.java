package controllers;


import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import play.libs.Json;
import play.mvc.Result;
import utils.DepartmentComparator;
import utils.Util;

import java.util.*;

public class ListManagerController extends AppController {
    public static String DEPARTMENTS = "Departments";
    public static String FARMERS = "Farmers";
    public static String VBAS = "Vbas";

    /*Returns the current user*/
    public Result currentUser() {
        Users currentUser = Authority.getPerson(ctx());
        System.out.println("The current user is: " + Json.toJson(currentUser));
        return ok(Json.toJson(currentUser));

    }

    /*
     * Returns a list of proxy roles available to the currently logged in user
     * @return
     * */
    public Result proxyRoles() {
        System.out.println("Inside proxy Roles");
        Users currentUser = Authority.getPerson(ctx());
        System.out.println("The current user is: " + currentUser.getEmail());
        System.out.println("The roles of the current user are: " + currentUser.getRolesList());

        if (isSuper()) {
            List<RefUserRoles> results = RefUserRoles.find.query().order("role_code").findList();
            System.out.println("The RefUserRoles results are: " + results.toString());

            return ok(Json.toJson(refactor(results)));
        } else if (currentUser.getRoles().size() > 1) {
            //if the user has more than one role then allow them to proxy as well
            //but only to the roles they have
            return ok(Json.toJson(refactor(currentUser.getRoles())));

        }
        return null;

    }

    /*Returns a listing of proxy departments available to the currently logged in user
     * @return
     * */
    public Result proxyDepartments() {
        List<Departments> result;
        if (isSuper()) {
            result = Departments.find.all();
        } else {
            result = getAuthorizedDepartments();
        }
        System.out.println("The proxy departments are: " + Json.toJson(refactor(result)));
        return ok(Json.toJson(refactor(result)));
    }

    /*
     * Returns a list of all departments/programs as an option list
     * */
//    public Result departments(){
//
//        List<Departments> departments = Departments.find.query()
//                .order("department_name asc").findList();
//        Collections.sort(departments, new DepartmentComparator());
//        System.out.println("The  departments are: "+Json.toJson(refactor(departments)));
//        return ok(Json.toJson(refactor(departments)));
//    }
    /*
     * Returns a listing of authorised departements as an options list depending on the rights of the user
     * */
    public Result listDepartments() {
        List<Departments> departments = new ArrayList<Departments>();
        if (isSuper() && !isProxy()) {
            departments = Departments.find.all();
        } else {
//            departments = getAuthorizedDepartments();
            departments = Departments.find.query().where().eq("department_id", currentDeparment().getDepartment_id()).order("department_name asc").findList();
        }
        return ok(Json.toJson(refactor(departments)));
    }

    /*
     * Returns a list of Houses as an options list based upon which programs/departments they comne from
     * */
    public Result listHousesByDepartment() {
        //we are getting the chosen deepartment
        JsonNode departmentNode = request().body().asJson();
        String selectedDepartment = departmentNode.asText();
        if(departmentNode.isNull()){
            return badRequest(errorMessage("Unable to get Houses in the chosen department"));
        }
        System.out.println("The user has selected the department: "+selectedDepartment);
        String currentDepartment = session().get(Util.DEPARTMENT);
        System.out.println("The current department you're in is: " + currentDepartment);
        List<Houses> Houses = new ArrayList<Houses>();
        /*here the system was only displaying Houses based on if the suer is registered as supper or not.
        * this feature will be scrapped off but may be used in the future. For now we will display Houses based on if the user has selected its parent
        * department*/
//        if (isSuper() && !isProxy()) {
//            Houses = Houses.find.all();
//            System.out.println("This is a super user in the: " + currentDeparment().getDepartment_name() + " program by default and the Houses available for them are: " + Json.toJson(refactor(Houses)));
//        } else {
//            Houses = Houses.find.query().where()
//                    .eq("network_department", currentDepartment).order("network_name asc").findList();
//            System.out.println("This is a regular user in the: " + currentDeparment().getDepartment_name() + " program by default and the Houses available for them are: " + Json.toJson(refactor(Houses)));
//        }
//        if (isSuper()){
//            Houses = Houses.find.query().where()
//                    .eq("network_department",selectedDepartment).order("network_name asc").findList();
//            System.out.println("This is a super user in the: " + currentDeparment().getDepartment_name() + " program by default and the Houses available for them are: " + Json.toJson(refactor(Houses)));
//        } else {
//            Houses = Houses.find.query().where()
//                    .eq("network_department", currentDepartment).order("network_name asc").findList();
//            System.out.println("This is a regular user in the: " + currentDeparment().getDepartment_name() + " program by default and the Houses available for them are: " + Json.toJson(refactor(Houses)));
//        }
        return ok(Json.toJson(refactor(Houses)));


    }
//    public static Users getPerson(C) {
//        return (isLoggedIn(context) ? Users.find.byId(getUser(context)) : null);
//
//    }
//    public Result listHousesBasedOnUserInput(){
//        return (Houses.find.byId())
//    }


    /**
     * returns a listing of authorized security officers as an options list depending on the unit they belong to
     *
     * @return
     */
//    public Result listGuardsByFacility(){
//        JsonNode facilityIdNode = request().body().asJson();
//        if(facilityIdNode.isNull()){
//            return badRequest(errorMessage("Unable to get a list of guards"));
//        }
//        String facilityId = facilityIdNode.asText();
//        System.out.println("facilityId "+facilityId);
//        List<PersonRole> personRoles = PersonRole.find.where().eq("facility.id", facilityId).eq("role.cd", "SECOF").findList();
//        Set<Person> persons = new HashSet<Person>();
//        for(PersonRole personRole: personRoles){
//            persons.add(personRole.getPerson());
//        }
//        return ok(Json.toJson(refactor(persons)));
//
//    }


    /*
     * Returns the appropriate listing of departments allowed for the user to view
     * @return
     * */
    public Result userDepartment() {
        List<String> roles = new ArrayList<>();
        if (isSuper()) {
            roles.addAll(Arrays.asList(getSuperUserCodes()));
        } else if (isRegular()) {
            roles.addAll(Arrays.asList(getRegularUserCodes()));
        } else if (isTester()) {
            roles.addAll(Arrays.asList(getTestingUserCodes()));
        }
        Set<Departments> departmentsSet = new HashSet<>();
        List<Departments> departmentsList = new ArrayList<Departments>(departmentsSet);
        Collections.sort(departmentsList, new DepartmentComparator());
        return ok(Json.toJson(refactor(departmentsList)));
    }


    /*
     * returns a list og all the roles available for the assignment based on the rights
     * of the user logged in
     * */
    public Result roles() {
        List<String> roles = new ArrayList<String>();
        if (isSuper() && !isProxy()) {
            roles.addAll(Arrays.asList(getSuperUserCodes()));
        } else if (isRegular()) {
            roles.addAll(Arrays.asList(getRegularUserCodes()));
        } else if (isTester()) {
            roles.addAll(Arrays.asList(getTestingUserCodes()));
        }
        List<RefUserRoles> userRoleList = RefUserRoles.find.query()
                .orderBy("role")
                .where()
                .in("role_code", roles)
                .findList();
        return ok(Json.toJson(refactor(userRoleList)));
    }

    /*
     * Returns a list of Department Roles as an option list depending on the role of the
     * currently logged in user
     * @return
     * */
//    public Result listOrganizationRoles(){
//        List<RefOrganizationRole> organizationRoles = new ArrayList<>();
//        List<String> allowedRoles = new ArrayList<>();
//        if(isSysAdmin() && !isProxy()) {
//            allowedRoles.add("MGR");
//            allowedRoles.add("SEC");
//            allowedRoles.add("TEN");
//            allowedRoles.add("SYS");
//        }else if (isBuildingDirector()) {
//            allowedRoles.add("MGR");
//            allowedRoles.add("SEC");
//            allowedRoles.add("TEN");
//        }else if(isBuildingManager()) {
//            allowedRoles.add("TEN");
//        }
//        organizationRoles = RefOrganizationRole.find.where().in("cd", allowedRoles).findList();
//        return ok(Json.toJson(refactor(organizationRoles)));
//    }

    public Result listTenants(){
        List<Tenants> tenants = Tenants.find.query()
                .setMaxRows(100)
                .findList();

        System.out.println("Inside list Tenants");
        System.out.println("The Tenants  are: "+tenants.size()+" in number");
        System.out.println("The Tenants  are: "+Json.toJson(tenants));
        return ok(Json.toJson(tenants));
    }



    private <T> List<Option> refactor(Collection<T> collection) {
        List<Option> result = new ArrayList<>();
        if (Util.isEmpty(collection)) {
            return result;
        }
        for (Object item : collection) {
            if (item instanceof Departments) {
                Departments val = (Departments) item;
                result.add(new Option(val.getDepartment_name(), val.getDepartment_id()));
            } else if (item instanceof RefUserRoles) {
                RefUserRoles val = (RefUserRoles) item;
                result.add(new Option(val.getRole(), val.getRole_code()));
            }
//            else if (item instanceof Houses) {
//                Houses val = (Houses) item;
//                result.add(new Option(val.getNetwork_name(), val.getNetwork_id()));
//            }
            else if (item instanceof Users) {
                Users val = (Users) item;
                result.add(new Option(val.getEmail(), val.getIdentifier()));
            }
//            else if (item instanceof Vbas){
//                Vbas val = (Vbas) item;
//                result.add(new Option(val.getVba_name(),val.getVbacode()));
//            }
            else if (item instanceof Tenants){
                Tenants val = (Tenants) item;
                result.add(new Option(val.getLast_name(),val.getId_number()));
            }
        }
        return result;
    }

    /* this is the object used in the representation of select elements in the UI*/
    private class Option {
        Object label;
        Object value;

        public Option(Object label, Object value) {
            super();
            this.label = label;
            this.value = value;
        }

        public Object getLabel() {
            return label;
        }

        public void setLabel(Object label) {
            this.label = label;
        }

        public Object getValue() {
            return value;
        }

        public void setValue(Object value) {
            this.value = value;
        }
    }
}
