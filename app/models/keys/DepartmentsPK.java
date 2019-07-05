package models.keys;


import javax.persistence.Embeddable;

@Embeddable
public class DepartmentsPK {
    public String department_id;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime + result + ((department_id == null) ? 0 : department_id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        DepartmentsPK other = (DepartmentsPK) obj;
        if (department_id == null) {
            if (other.department_id != null)
                return false;
        } else if (!department_id.equals(other.department_id))
            return false;

        return true;
    }

}
