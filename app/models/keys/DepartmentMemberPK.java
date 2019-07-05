package models.keys;

import javax.persistence.Embeddable;

@Embeddable
public class DepartmentMemberPK {
    public String department_id;
    public String email;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((department_id == null) ? 0 : department_id.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
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
        DepartmentMemberPK other = (DepartmentMemberPK) obj;
        if (department_id == null) {
            if (other.department_id != null) {
                return false;
            }
        } else if (!department_id.equals(other.department_id))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        return true;


    }


}
