const path = require('path');
const version = require('./package.json').version.replace(/\+.+$/, ''); // omit "+build" postfix

const jsiiRuntime = {
    version: require('jsii-java-runtime/package.json').version,
    repo: path.join(path.dirname(require.resolve('jsii-java-runtime')), 'maven-repo'),
};

process.stdout.write(`<?xml version="1.0" encoding="UTF-8"?>
<project
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
        xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <!-- Generated by ${__filename} at ${new Date().toISOString()} -->

    <modelVersion>4.0.0</modelVersion>

    <groupId>com.amazonaws.cdk</groupId>
    <artifactId>aws-cdk</artifactId>
    <version>${version}</version>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <repositories>
        <repository>
            <id>jsii</id>
            <url>file://${jsiiRuntime.repo}</url>
        </repository>
    </repositories>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.6.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>3.0.1</version>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <!-- Deploys the jars to a local maven repo -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-deploy-plugin</artifactId>
                <version>2.8.2</version>
                <executions>
                    <execution>
                        <id>deploy-file</id>
                        <phase>package</phase>
                        <goals>
                            <goal>deploy-file</goal>
                        </goals>
                        <configuration>
                            <file>\${project.build.directory}/\${project.artifactId}-\${project.version}.jar</file>
                            <sources>\${project.build.directory}/\${project.artifactId}-\${project.version}-sources.jar</sources>
                            <url>file:../maven-repo</url>
                            <groupId>\${project.groupId}</groupId>
                            <artifactId>\${project.artifactId}</artifactId>
                            <version>\${project.version}</version>
                            <packaging>jar</packaging>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>jsii-runtime</artifactId>
            <version>${jsiiRuntime.version}</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.9.5</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.5</version>
        </dependency>

    </dependencies>
</project>
`);
