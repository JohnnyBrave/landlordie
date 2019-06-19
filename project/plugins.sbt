logLevel := Level.Warn

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.6.0")
addSbtPlugin("com.typesafe.sbt" % "sbt-rjs" % "1.0.1")
//sbt-babel an sbt plugin to perform babel compilation
addSbtPlugin("io.teamscala.sbt" % "sbt-babel" % "1.2.0")
//eBeans
addSbtPlugin("com.typesafe.sbt" % "sbt-play-ebean" % "4.0.2")