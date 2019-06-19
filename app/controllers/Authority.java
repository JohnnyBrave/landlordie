package controllers;
/*
 * this class is used ro implement security on the application
 * It extends the Security.Authenticator class to check whether the user is logged in or not.
 * getUsername method is used to return the user name if the user is logged in and onUnauthorized method is
 * used to perform a redirect
 * */

import models.Users;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;
import utils.Util;

public class Authority extends Security.Authenticator {

    /* the play.mvc.Http.Context class creates a new HTTP context whose parameters are id(unique context id), header(the request header), sessionData(the session data extracted from the session cookie) among others */
    /*Return the email of the user logged in , or null if the user is not logged in
     * */

    public static String getRoleOfCurrentUser(Context context) {
        return context.session().get(Util.ROLE);
    }

    /*
     * Return the email of the logged in user, or null if no logged in user
     * @param ctx the context containing the session
     * @return the email of the logged in user, or null if the user is not logged in
     *
     * */
    public static String getUser(Context ctx) {
        return ctx.session().get(Util.AUTH_TOKEN);
    }

    /*
     *returns true if there is a user logged in, and false otherwise
     * @param context is the context containing the session
     * @return true if the user is logged in
     *  */
    public static boolean isLoggedIn(Context context) {
        return (getUser(context) != null);
    }

    /*
     * Return the user info of the logged in user, or null if no user is logged in
     * @param context the Context object
     * @return the user info (email) or null
     * */
    public static Users getPerson(Context context) {
        return (isLoggedIn(context) ? Users.find.byId(getUser(context)) : null);

    }

    @Override
    public String getUsername(Context context) {
        return context.session().get(Util.AUTH_TOKEN);
    }

    /*
     * Instruct Authentication to automatically redirect to the login page if unuthorized
     * */
    @Override
    public Result onUnauthorized(Context context) {
        System.out.println("###Inside UnAuthorised");
        /* return redirect(routes.LoginController.redirectUnauthorized()); */
        return redirect(routes.LoginController.redirectUnauthorized());
    }


}
