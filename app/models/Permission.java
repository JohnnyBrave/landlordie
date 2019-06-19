package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "permission")
public class Permission extends Model implements be.objectify.deadbolt.java.models.Permission {
    public static Finder<String, Permission> find = new Finder<String, Permission>(Permission.class, "fips_db");
    @Id
    @Column(name = "id")
    private Integer id;
    @Column(name = "module_name")
    private String name;
    @ManyToMany
    @JoinTable(name = "role_permission")
    private List<RefUserRole> userRole;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getValue() {
        return name;
    }
}
