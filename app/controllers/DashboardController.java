package controllers;

import play.mvc.Result;

import static play.mvc.Results.ok;

public class DashboardController extends AppController {
    public Result landing(){
        return ok(views.html.dashboard.render());
    }

}
