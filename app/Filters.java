import filters.FipsFilter;
import play.Environment;
import play.Mode;
import play.http.HttpFilters;
import play.mvc.EssentialFilter;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Singleton
public class Filters implements HttpFilters {


    private final Environment env;
    //    private final EssentialFilter exampleFilter;
    private final EssentialFilter exampleFilter;

    @Inject
    public Filters(Environment env, FipsFilter fipsFilter) {
        this.env = env;
//        this.exampleFilter = exampleFilter;
        this.exampleFilter = fipsFilter.asJava();
    }

    @Override
    public List<EssentialFilter> getFilters() {
        try {
            if (env.mode().equals(Mode.DEV)) {
                return Collections.singletonList(exampleFilter);
            } else {
            }
            {
                return Arrays.asList(new EssentialFilter[]{});
            }

        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
        return Arrays.asList(new EssentialFilter[]{});


    }

//    @Override
//    public EssentialFilter[] filters() {
//        // Use the example filter if we're running development mode. If
//        // we're running in production or test mode then don't use any
//        // filters at all.
//        if (env.mode().equals(Mode.DEV)) {
//            return new EssentialFilter[]{exampleFilter};
//        } else {
//            return new EssentialFilter[]{};
//        }
//    }

}