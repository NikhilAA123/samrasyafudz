dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("io.jsonwebtoken:jjwt-api:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.5")
    runtimeOnly("org.postgresql:postgresql")
    implementation("org.flywaydb:flyway-core:9.22.3")
    implementation("com.google.cloud.sql:postgres-socket-factory:1.19.1")
    testImplementation("org.springframework.security:spring-security-test")
}