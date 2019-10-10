package models;

import io.ebean.Finder;
import io.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "houses")
public class Houses extends Model {
    public static Finder<String, Houses> find = new Finder<String, Houses>(Houses.class, "landlordie");
    @Id
    @Column(name = "house_no")
    private String house_no;
    @Column(name = "name")
    private String name;

    public Houses() {
        this.house_no = "";
        this.name = "";
    }

    public String getHouse_no() {
        return house_no;
    }

    public void setHouse_no(String house_no) {
        this.house_no = house_no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }




}
