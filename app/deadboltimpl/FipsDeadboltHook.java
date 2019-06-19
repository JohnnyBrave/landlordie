package deadboltimpl;


import be.objectify.deadbolt.java.cache.HandlerCache;
import play.api.Configuration;
import play.api.Environment;
import play.api.inject.Binding;
import play.api.inject.Module;
import scala.collection.Seq;

import javax.inject.Singleton;

//here we are updating the bindings to use the qualifiers
/*https://deadbolt-java.readme.io/v2.5.4/docs/integrating-deadbolt

exposing  handlers to Deadbolt. To do this, you create a samll module that binds the handler cache by type
* */
public class FipsDeadboltHook extends Module {
    @Override
    public Seq<Binding<?>> bindings(final Environment environment,
                                    final Configuration configuration) {
        return seq(bind(HandlerCache.class).to(FipsHandlerCache.class).in(Singleton.class));
    }
}
