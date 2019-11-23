package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "networks")
public class Networks extends Model {
    @Id
    @Column(name = "network_id")
    private String network_id;
    @Column(name = "network_name")
    private String network_name;
    @Column(name = "network_department")
    private String network_department;

    public static Finder<String, Networks> find = new Finder<String, Networks>(Networks.class, "landlordie");


    public Networks() {
        this.network_id = "";
        this.network_name = "";
        this.network_department = "";
    }

    public String getNetwork_id() {
        return network_id;
    }

    public void setNetwork_id(String network_id) {
        this.network_id = network_id;
    }

    public String getNetwork_name() {
        return network_name;
    }

    public void setNetwork_name(String network_name) {
        this.network_name = network_name;
    }

    public String getDepartment_id() {
        return network_department;
    }

    public void setDepartment_id(String network_department) {
        this.network_department = network_department;
    }

    public String getNetwork_department() {
        return network_department;
    }

    public void setNetwork_department(String network_department) {
        this.network_department = network_department;
    }


}