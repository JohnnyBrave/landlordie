package controllers;

import play.mvc.Result;

public class SearchController extends AppController {
    public Result landing() {

        return ok(views.html.search.render(isLoggedIn(), getUserJson()));

    }
}
