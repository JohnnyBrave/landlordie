package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "departments")
//@NamedQueries({
//        @NamedQuery(name = "DEPARTMENTS_ALL",
//                query="SELECT * FROM ORGANIZATION")
//})

public class Departments extends Model {
    public static Finder<String, Departments> find = new Finder<String, Departments>(Departments.class, "fips_db");
    @Id
    @Column(name = "department_id")
    private String department_id;
    @Column(name = "department_name")
    private String department_name;

    public Departments() {
        this.department_id = "";
        this.department_name = "";
    }

    public String getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(String department_id) {
        this.department_id = department_id;
    }


    public String getDepartment_name() {
        return department_name;
    }

    public void setDepartment_name(String department_name) {
        this.department_name = department_name;
    }

}
