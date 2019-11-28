name := "landlordie"
 
version := "1.0"

lazy val `landlordie` = (project in file(".")).enablePlugins(PlayJava, PlayEbean, SbtWeb)
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

libraryDependencies ++= Seq(
  jdbc,
  guice,
  javaJdbc,
  cacheApi,
//  "mysql" % "mysql-connector-java" % "5.1.27",
  /*this below is for the purpose of connecting to MacOS High Sierra*/
  "mysql" % "mysql-connector-java" % "8.0.17",
  javaWs,

  "org.webjars" %% "webjars-play" % "2.6.0",
  // reactjs
  "org.webjars" % "react" % "15.3.1",
  // https://mvnrepository.com/artifact/org.codehaus.jackson/jackson-mapper-asl
  "org.codehaus.jackson" % "jackson-mapper-asl" % "1.5.0",
  //  Deadbolt authentication framework
  //  https://github.com/schaloner/deadbolt-2-java
  "be.objectify" %% "deadbolt-java" % "2.6.3",
  //apache poi
  "org.apache.poi" % "poi-ooxml" % "3.15")

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  

      