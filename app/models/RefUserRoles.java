package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_ref_role")
public class RefUserRoles extends Model {
    public static Finder<String, RefUserRoles> find = new Finder<>(RefUserRoles.class, "fips_db");
    @Id
    @Column(name = "role_code")
    private String role_code;
    @Column(name = "role")
    private String role;
    @ManyToMany(mappedBy = "userRole", cascade = CascadeType.ALL)
    private List<Permission> permissions;

    public String getRole_code() {
        return role_code;
    }

    public void setRole_code(String role_code) {
        this.role_code = role_code;
    }

    public String getRole() {
        return role;
    }

    public void setName(String role) {
        this.role = role;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    @Override
    public String toString() {
        System.out.println("The role code is" + "RefUserRole [role_code=" + role_code + ", name=" + role + "]");
        return "RefUserRole [role_code=" + role_code + ", name=" + role + "]";

    }


}