package controllers;

import play.mvc.Result;


public class DashboardController extends AppController {
    public Result renderDashboard() {
        System.out.println("Inside renderDashboard");

        System.out.println("request().path() " + request().path());
        System.out.println("request().uri() " + request().uri());
        System.out.println("request().host() " + request().host());
        System.out.println("request().remoteAddress() " + request().remoteAddress());

        return ok(views.html.dashboard.render(isLoggedIn(), getUserJson()));


    }
}
