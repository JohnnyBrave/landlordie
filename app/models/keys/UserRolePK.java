package models.keys;


import javax.persistence.Embeddable;

@Embeddable
public class UserRolePK {
    public String role_id;
    public String email;
    public String department_id;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime + result + ((role_id == null) ? 0 : role_id.hashCode());
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
        UserRolePK other = (UserRolePK) obj;
        if (role_id == null) {
            if (other.role_id != null)
                return false;
        } else if (!role_id.equals(other.role_id))
            return false;

        return true;
    }

}
