package models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.*;

@Entity
@Table(name = "vbas")
public class Tenants extends Model {
    public static Finder<String, Tenants> find = new Finder<String, Tenants>(Tenants.class, "fips_db");
    @Id
    @Column(name = "vbacode")
    private String vbacode;
    @Column(name = "vba_name")
    private String vba_name;
    @Column(name = "phone_no")
    private String phone_no;
    @Column(name = "gender")
    private String gender;
    @Column(name = "age")
    private String age;
    @Column(name = "latitude")
    private String latitude;
    @Column(name = "longitude")
    private String longitude;
    //    @ManyToOne
//    @JoinColumn(name = "REF_ROLE_CD", insertable = false, updatable = false)
//    private RefPersonRole role;
    @ManyToOne
    @JoinColumn(name = "vba_network_id", referencedColumnName = "network_id")
    @JsonBackReference
    private Houses house_id;

    public String getVbacode() {
        return vbacode;
    }

    public void setVbacode(String vbacode) {
        this.vbacode = vbacode;
    }

    public String getVba_name() {
        return vba_name;
    }

    public void setVba_name(String vba_name) {
        this.vba_name = vba_name;
    }

    public String getPhone_no() {
        return phone_no;
    }

    public void setPhone_no(String phone_no) {
        this.phone_no = phone_no;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Houses getNetwork_id() {
        return house_id;
    }

    public void setNetwork_id(Houses network_id) {
        this.house_id = network_id;
    }
}
