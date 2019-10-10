package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Tenants;
import play.libs.Json;
import play.mvc.Result;

public class TenantsController extends AppController {
    public Result tenants() {
        return ok(views.html.tenants.render(isLoggedIn(), getUserJson()));
    }

    public Result editTenant(String vbacode) {
        Tenants vba = Tenants.find.byId(vbacode);
        ObjectNode tenantNode = (ObjectNode) Json.toJson(vba);
        System.out.println("The records of the selected Tenant are: " + tenantNode.toString());
        return ok(tenantNode);
    }


}
