package controllers;

import play.mvc.Controller;
import play.mvc.Result;

public class LoginController extends Controller {
    public Result start(){
        return ok(views.html.login.render());
    }

}
