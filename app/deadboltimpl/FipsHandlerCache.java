package deadboltimpl;

import be.objectify.deadbolt.java.DeadboltHandler;
import be.objectify.deadbolt.java.cache.HandlerCache;

import javax.inject.Singleton;
import java.util.HashMap;
import java.util.Map;

/*exposing the handlers to Deadbolt.
You have to implement the be.objectify.deadbolt.java.cache.HandlerCache trait.
* */
@Singleton
public class FipsHandlerCache implements HandlerCache {
    private final DeadboltHandler defaultHandler = new FipsHandler();
    private final Map<String, DeadboltHandler> handlers = new HashMap<>();


    public FipsHandlerCache() {


        handlers.put(HandlerKeys.DEFAULT.key, defaultHandler);
        handlers.put(HandlerKeys.ALT.key, new FipsHandler());
    }

    @Override
    public DeadboltHandler apply(final String key) {
        return handlers.get(key);
    }

    @Override
    public DeadboltHandler get() {
        return defaultHandler;
    }
}
