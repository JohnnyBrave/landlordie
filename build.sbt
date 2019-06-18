name := "landlordie"
 
version := "1.0" 
      
lazy val `landlordie` = (project in file(".")).enablePlugins(PlayJava,SbtWeb)
  .settings(
    // Disable NPM node modules
    JsEngineKeys.npmNodeModules in Assets := Nil,
    JsEngineKeys.npmNodeModules in TestAssets := Nil,
    JsEngineKeys.engineType := JsEngineKeys.EngineType.Node
  )
BabelKeys.options := WebJs.JS.Object(
  "presets" -> List("@babel/preset-react", "@babel/preset-env")
  // More options ...
)


resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
scalaVersion := "2.12.6"

libraryDependencies ++= Seq( javaJdbc , cache , javaWs ,guice)

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  

      