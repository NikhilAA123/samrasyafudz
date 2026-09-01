plugins {
    id("org.springframework.boot") version "3.4.0" apply false
    id("io.spring.dependency-management") version "1.1.7" apply false
}

allprojects {
    group = "in.samrasyafudz"
    version = "1.0-SNAPSHOT"

    repositories {
        mavenCentral()
    }
}

subprojects {
    apply(plugin = "java")
    apply(plugin = "org.springframework.boot")
    apply(plugin = "io.spring.dependency-management")

    configure<JavaPluginExtension> {
        sourceCompatibility = JavaVersion.VERSION_17
    }

    dependencies {
        "implementation"("org.springframework.boot:spring-boot-starter-web")
        "implementation"("org.springframework.boot:spring-boot-starter-validation")
        "testImplementation"("org.springframework.boot:spring-boot-starter-test")
        "developmentOnly"("org.springframework.boot:spring-boot-devtools")
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}