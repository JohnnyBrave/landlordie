package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Tenants;
import play.data.DynamicForm;
import play.data.Form;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.List;

public class TenantsController extends AppController {
    // variable definitions
    FormFactory formFactory;

    // We inject a FormFactory, which is a helper class to create forms.
    @Inject
    public TenantsController(FormFactory formFactory) {
        this.formFactory = formFactory;
    }
    public Result landing() {
        System.out.println("## INSIDE SEARCH");
        DynamicForm boundForm = formFactory.form().bindFromRequest();
        String activity = boundForm.get("activity");
        System.out.println("The activity is: " + activity);
        if ("tenantinfo".equals(activity)) {
            //Return the Manage Tenants page
            return ok(views.html.tenants.render(isLoggedIn(), getUserJson()));
        } else if ("leaseagreements".equals(activity)) {
            //Return the Manage Tenants page
            return ok(views.html.tenants.render(isLoggedIn(), getUserJson()));
        }
        return badRequest(Json.toJson("Managing Tenants has failed"));


//        return ok(views.html.tenants.render(isLoggedIn(), getUserJson()));
    }

    public Result editTenant(String id_number) {
        System.out.println("Thre ID Number of thisuser is: "+id_number);
        Tenants tenant = Tenants.find.byId(id_number);
        ObjectNode tenantNode = (ObjectNode) Json.toJson(tenant);
        System.out.println("The records of the selected Tenant are: " + tenantNode.toString());
        return ok(tenantNode);
    }



}
