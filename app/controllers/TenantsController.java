package controllers;

import play.mvc.Result;

public class TenantsController extends AppController {
    public Result tenants() {
        return ok(views.html.tenants.render(isLoggedIn(), getUserJson()));
    }


}
