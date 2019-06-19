package models;

import be.objectify.deadbolt.java.models.Permission;
import be.objectify.deadbolt.java.models.Role;
import be.objectify.deadbolt.java.models.Subject;
import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
//@NamedNativeQueries(
//        {
//                @NamedNativeQuery(name = "users_by_department",
//                query= "SELECT * FROM USERS WHERE ")
//        }
//)
public class Users extends Model implements Subject {
    public static Finder<String, Users> find = new Finder<String, Users>(Users.class, "fips_db");
    @Id
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail() {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword() {
        this.password = password;
    }
    /*this method is supposed to get the roles depending on which department  this user represents
     * it does this by bring a list based on the getRolesByUser method
     * it overrides the getRoles() method in the Deadbolt class Subvject*/


    @Override
    public List<? extends Role> getRoles() {
        return UserRoles.getRolesByUser(this);
        /* return this.getRoles(); */
    }

    /*this method is used to get a list of the modules which the user has permission to
     * access/view
     * It depends on the Permission interface on Deadbolt library and checks in the AllowedModules table*/
    public List<String> getPermissionsList() {
        Set<String> results = new HashSet<>();
        List<? extends Permission> permissions = getPermissions();
        for (Permission permission : permissions) {
            models.Permission module = (models.Permission) permission;
            results.add(module.getName());
        }
        return new ArrayList<String>(results);
    }

    public List<String> getRolesList() {
        Set<String> results = new HashSet<>();
        List<? extends Role> roles = getRoles();
        for (Role role : roles) {
            UserRoles userRole = (UserRoles) role;
//            results.add(userRole.getRole().getRole_code());
        }
        return new ArrayList<String>(results);
    }

    @Override
    public List<? extends Permission> getPermissions() {
        //permissions can be duplicated across a number of roles, and
        //as such we need to return a unique collection of roles available
        Set<models.Permission> result = new HashSet<>();
        List<? extends Role> roles = getRoles();
        for (Role role : roles) {
            UserRoles userRole = (UserRoles) role;
//            result.addAll(userRole.getRole().getPermissions());
        }
        return new ArrayList<>(result);
    }

    @Override
    public String getIdentifier() {
        return this.getEmail();
    }

}
