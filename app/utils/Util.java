package utils;

import java.util.Collection;
import java.util.Map;

public class Util {
    //    private static final String USERNAME = "fips";
//    private static final String API_KEY = "APIKEY";
    public static String AUTH_TOKEN = "authToken";
    public static String PROGRAM = "PROGRAM";
    public static String DEPARTMENT = "DEPARTMENT";
    public static String ROLE = "ROLE";
    public static String PROXY_ROLE = "PROXY_ROLE";
    public static String PROXY_DEPARTMENT = "PROXY_DEPARTMENT";
    public static String IS_PROXY = "IS_PROXY";
    public static String NO_TIME = "00:00:00";

    /**
     * This method returns true if the collection is null or is empty.
     *
     * @param collection
     * @return true | false
     */
    public static boolean isEmpty(Collection<?> collection) {
        if (collection == null || collection.isEmpty()) {
            return true;
        }
        return false;
    }

    /**
     * This method returns true of the map is null or is empty.
     *
     * @param map
     * @return true | false
     */
    public static boolean isEmpty(Map<?, ?> map) {
        if (map == null || map.isEmpty()) {
            return true;
        }
        return false;
    }

    /**
     * This method returns true if the objet is null.
     *
     * @param object
     * @return true | false
     */
    public static boolean isEmpty(Object object) {
        if (object == null) {
            return true;
        }
        return false;
    }

    /**
     * This method returns true if the input array is null or its length is zero.
     *
     * @param array
     * @return true | false
     */
    public static boolean isEmpty(Object[] array) {
        if (array == null || array.length == 0) {
            return true;
        }
        return false;
    }

    /**
     * This method returns true if the input string is null or its length is zero.
     *
     * @param string
     * @return true | false
     */
    public static boolean isEmpty(String string) {
        if (string == null || string.trim().length() == 0) {
            return true;
        }
        return false;
    }

    public static <T> boolean isNotEmpty(Collection<T> collection) {
        return !isEmpty(collection);
    }


    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

}
