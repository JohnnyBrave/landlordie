package deadboltimpl;

import be.objectify.deadbolt.java.DeadboltHandler;
import be.objectify.deadbolt.java.DynamicResourceHandler;
import be.objectify.deadbolt.java.models.Subject;
import controllers.Authority;
import models.Users;
import play.mvc.Http;
import play.mvc.Result;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/*
Implementations of the be.objectify.deadbolt.java.DeadboltHandler interface are used to provide Deadbolt with what it needs to satisfy your project's authorization constraints.
This interface has 4 primary functions.
getSubjecct , beforeAuthCheck, onAuthFailure, getDynamicResourceHnadler
* */
public class FipsHandler implements DeadboltHandler {
    /*
     *beforeAuthcheck function -> run a pre-authorization task that can block further execution
     * */
    @Override
    public CompletionStage<Optional<Result>> beforeAuthCheck(Http.Context context) {
        return null;
    }
    /*
     * getSubject gets the current user from, e.g the cache or the database
     * */

    @Override
    public CompletionStage<Optional<? extends Subject>> getSubject(Http.Context context) {
        Optional<Users> user = Optional.ofNullable(Authority.getPerson(context));
        return (CompletionStage) CompletableFuture.completedFuture(user);
    }

    /*
     *onAuthFailure defines behaviour for when authorization requirements are not met
     * */
    @Override
    public CompletionStage<Result> onAuthFailure(Http.Context context, Optional<String> content) {
        return null;
    }
    /*
     * getDynamicResourceHandler provides a hook into the dynamic constraint types
     * */

    @Override
    public CompletionStage<Optional<DynamicResourceHandler>> getDynamicResourceHandler(Http.Context context) {
        return null;
    }
}
