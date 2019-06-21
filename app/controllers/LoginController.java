package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Users;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Result;
import utils.Util;

import javax.inject.Inject;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

//import play.data.FormFactory;

/**
 * Controller used to authenticate users
 *
 * @author JohnnyBrave
 */

public class LoginController extends LandlordieController {
    // variable definitions
    FormFactory formFactory;
    //this string declaration is what holds the message to be sent back to the frontend
    String message;

    // We inject a FormFactory, which is a helper class to create forms.
    @Inject
    public LoginController(FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    //This method renders the login page, which happens to be the first page that gets displayed
    public Result start() {
        return ok(views.html.login.render());

    }

    public Result login() {

        //serving a JSON response
        ObjectNode responseNode = Json.newObject();
        DynamicForm requestData = formFactory.form().bindFromRequest();
        String username = requestData.get("username");
        String password = requestData.get("password");
        System.out.println("the username is " + username);
//        return ok("Hello " + username + " " + password);

        if (Util.isEmpty(username) || Util.isEmpty(password)) {
            System.out.println("The username or password is null");
            message = "invalid login";
            responseNode.put("message", message);
            return badRequest(responseNode);

        }
        try {
            Users currentUser = null;
            if (isAuthenticated(username, password)) {
                System.out.println("Trying to authenticate");
                System.out.println("The current authtoken before resolving roles is " + session(Util.AUTH_TOKEN));
                System.out.println("The role current user before resolving roles is " + session(Util.ROLE));
                System.out.println("The department of the current user before resolving roles is " + session(Util.DEPARTMENT));

                resolveRoles();
                System.out.println("The current authtoken after resolving roles is " + session(Util.AUTH_TOKEN));
                System.out.println("The role current user after resolving roles is " + session(Util.ROLE));
                System.out.println("The department of the current user after resolving roles is " + session(Util.DEPARTMENT));

//                set the proxy as false by default
                session(Util.IS_PROXY, "false");
//                set the proxy department to null by default
                session(Util.PROXY_DEPARTMENT, "");
                responseNode.put("message", "Login Successful");

                System.out.println("Redirecting to the Dashboard Controller for the user of the role " + session(Util.ROLE));
                System.out.println("Redirecting to the Dashboard Controller for the user of the department " + session(Util.DEPARTMENT));
                return redirect(routes.DashboardController.renderDashboard());

            } else {
                System.out.println("Inside unauthorized");

                redirectUnauthorized();
                responseNode.put("message", message);
                return badRequest(responseNode);
            }
        } catch (Exception e) {
            e.printStackTrace(System.out);
            message = "Login Failed. Contact Admin";
            responseNode.put("message", message);
            return badRequest(responseNode);
        }


    }

    /*this method redirects to the login page*/
    public Result redirectUnauthorized() {
        session().clear();
        return ok(views.html.login.render());
    }

    //function to check if the user is on the database
    private boolean isAuthenticated(String username, String password) throws NoSuchAlgorithmException, InvalidKeyException {
        System.out.println("### INSIDE isAuthenticated");
        System.out.println("The username we want to authenticate is " + Util.AUTH_TOKEN);
        Users currentUser = Users.find.query().where().eq("email", username).findUnique();

        if (currentUser == null) {
            currentUser = Users.find.query().where().eq("email", username).findUnique();
            if (currentUser == null) {
                message = "No such user in FIPS Africa, contact Admin";
                return false;
            }
        }
        // TODO: 2/5/2019
        //going to introduce password encryption
        //will be dealt with in the Password Utility
//            String encryptPassword = currentUser.getPassword();
//            byte[] salt = currentUser.getPassword().get;
        String dbPassword = currentUser.getPassword();
//            check if the password entered by the user is the same as the password in the db
        if (dbPassword.equals(password)) {
            System.out.println("###Passwords Match###");
            System.out.println("Logged in with username " + username + " and password " + password);
            System.out.println(currentUser.getEmail() + " has the role of: " + currentUser.getRolesList().get(0) + " and the permission to view: " + currentUser.getPermissionsList().toString());

            session().clear();
            session(Util.AUTH_TOKEN, currentUser.getEmail());
            return true;
        } else {
            message = "Invalid Password";
            System.out.println("###Passwords Do Not Match");
            return false;
        }


    }


}
