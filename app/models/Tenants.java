package models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.*;

@Entity
@Table(name = "tenants")
public class Tenants extends Model {
    public static Finder<String, Tenants> find = new Finder<String, Tenants>(Tenants.class, "landlordie");
    @Id
    @Column(name = "tenant_id")
    private String tenant_id;
    @Column(name = "id_type")
    private String id_type;
    @Column(name = "id_number")
    private String id_number;
    @Column(name = "first_name")
    private String first_name;
    @Column(name = "middle_name")
    private String middle_name;
    @Column(name = "last_name")
    private String last_name;
    @Column(name = "phone_no")
    private String phone_no;
    @ManyToOne
    @JoinColumn(name = "tenant_house_no", referencedColumnName = "house_no")
    @JsonBackReference
    private Houses house_no;

    public String getTenant_id() {
        return tenant_id;
    }

    public void setTenant_id(String tenant_id) {
        this.tenant_id = tenant_id;
    }

    public String getId_type() {
        return id_type;
    }

    public void setId_type(String id_type) {
        this.id_type = id_type;
    }

    public String getPhone_no() {
        return phone_no;
    }

    public void setPhone_no(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getMiddle_name() {
        return middle_name;
    }

    public void setMiddle_name(String middle_name) {
        this.middle_name = middle_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public Houses getHouse_no() {
        return house_no;
    }

    public void setHouse_no(Houses house_no) {
        this.house_no = house_no;
    }

}
