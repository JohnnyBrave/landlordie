package utils;

import models.Departments;

import java.util.Comparator;

public class DepartmentComparator implements Comparator<Departments> {
    @Override
    public int compare(Departments o1, Departments o2) {
        return o1.getDepartment_name().compareTo(o2.getDepartment_name());
    }

}
