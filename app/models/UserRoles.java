package models;

import be.objectify.deadbolt.java.models.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import io.ebean.Finder;
import io.ebean.Model;
import models.keys.UserRolePK;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_role")
public class UserRoles extends Model implements Role {
    public static Finder<UserRolePK, UserRoles> find = new Finder<UserRolePK, UserRoles>(UserRoles.class, "landlordie");

    //    @Column(name = "role_id")
//    private UserRole role_id;
    @EmbeddedId
    private UserRolePK userRolePK;
    @ManyToOne
    @JoinColumn(name = "role_code", insertable = false, updatable = false)
    private RefUserRoles role;
    @ManyToOne
    @JoinColumn(name = "email", insertable = false, updatable = false)
    @JsonBackReference
    private Users user;
    @ManyToOne
    @JoinColumn(name = "department_id", insertable = false, updatable = false)
    @JsonBackReference
    private Departments department;

    public UserRoles() {
        userRolePK = new UserRolePK();
    }

    public static List<UserRoles> getRolesByUser(Users users) {

        return find.query().where().eq("user", users).findList();
    }

    public UserRolePK getUserRolePK() {
        return userRolePK;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.userRolePK.email = user.getEmail();
        this.user = user;
    }

    public RefUserRoles getRole() {
        return role;
    }

    public void setRole(RefUserRoles role) {
        this.userRolePK.email = user.getEmail();
        this.role = role;
    }

    public Departments getDepartment() {
        return department;
    }

    public void setDepartment(Departments department) {
        this.userRolePK.department_id = department.getDepartment_id();
        this.department = department;
    }

    @Override
    public String toString() {
        return this.userRolePK.toString();
    }

    /*Implementation of the method getName() method from the Roles class in Deadbolt library
     * Here we are getting the role of this user*/
    @Override
    public String getName() {
        return this.role.getRole_code();
    }










    /*the Role here is a class from the package import be.objectify.deadbolt.java.models.Role
     * Deadbolt 2 is an authorization library for Play 2, and features APIs for both Java- and Scala-based applications. It allows you to apply constraints to controller actions, and to customize template rendering based on the current user.
     * https://github.com/schaloner/deadbolt-2-java*/


//    @Override
//    public String getName() {
//        return String.valueOf(this.getRole());
//    }
//    /*this method brings the list of role by a certain user*/
//
//    public List<? extends UserRole> getRoles() {
//        return UserRole.find.query().where().eq("department", this).findList();
//        //return this.getRoles();
//    }
//
//
//    public List<AllowedModules> getPermissions() {
//        return permissions;
//    }
//    public void setPermissions(List<AllowedModules> permissions) {
//        this.permissions = permissions;
//    }
//    @Override
//    public String toString(){
//        return "UserRole [role_id=" +role_id + "role=" +role + "]";
//    }
}




