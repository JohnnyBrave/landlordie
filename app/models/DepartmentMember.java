package models;

import io.ebean.Finder;
import io.ebean.Model;
import models.keys.DepartmentMemberPK;

import javax.persistence.*;

@Entity
@Table(name = "department_member")
public class DepartmentMember extends Model {
    public static Finder<String, DepartmentMember> find = new Finder<>(DepartmentMember.class, "fips_db");
    @EmbeddedId
    private DepartmentMemberPK departmentMemberPK;
    @Column(name = "default_department")
    private Boolean defaultDepartment;
    @ManyToOne
    @JoinColumn(name = "email", insertable = false, updatable = false)
    private Users user;
    @ManyToOne
    @JoinColumn(name = "department_id", insertable = false, updatable = false)
    private Departments department;

    public DepartmentMember(Departments department, Users user, Boolean defaultDepartment) {
        this.departmentMemberPK = new DepartmentMemberPK();
        setDepartment(department);
        setUser(user);
        this.defaultDepartment = defaultDepartment;
    }

    public DepartmentMember() {
        super();
    }

    public DepartmentMemberPK getDepartmentMemberPK() {
        return departmentMemberPK;
    }

    public void setDepartmentMemberPK(DepartmentMemberPK departmentMemberPK) {
        this.departmentMemberPK = departmentMemberPK;
    }

    public Departments getDepartment() {

        return department;
    }

    public void setDepartment(Departments department) {
        this.departmentMemberPK.department_id = department.getDepartment_id();
        this.department = department;
    }

    public Boolean isDefaultDepartment() {
        return defaultDepartment;
    }

    public void setDefaultDepartment(Boolean defaultDepartment) {
        this.defaultDepartment = defaultDepartment;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.departmentMemberPK.email = user.getEmail();
        this.user = user;
    }


}
