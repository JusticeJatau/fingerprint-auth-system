# Fingerprint Authentication System

Multi-backend biometric authentication system using:

- 🖼️ React (Frontend)
- 🧠 Java (Spring Boot) for scanning + matching
- 💽 PHP (MariaDB) for template storage and retrieval

This is a complete Guide on how to setup the project with the Secugen Hamster Plus Scanner

> 💡 **Note:** You need to install Maven, Springboot and Java * before running this project

# Setup

1. ## Download

-  Download and Install the Java 2 SDK v1.8.0_51 [here] (https://www.oracle.com/technetwork/java)
- Download the Secugen Windows driver [here](https://www.dropbox.com/t/w8kk93pfWRiMWF1Z) and install
- Download the Secugen FDxSDK Pro for Windows. Go to (this link)[https://secugen.com/request-free-software/] and check on the FDxSDK Pro for Windows option, fill in your details in the field below and click on submit and a download link will sent to your email
- Open the link from your email and download the SDK
- Extract the FDxSDK Pro for Windows to a separate folder.

2. ## Setup
- Open the folder ```FDx SDK Pro for Windows v4.3.1_J1.12\FDx SDK Pro for Windows v4.3.1_J1.12\FDx SDK Pro for Java v1.12\jnisgfplib```
- Copy the following files from "win32" to C:\windows\system32 
    - jnifplib\win32\jnisgfplib.dll 
    - jnifplib\win32\jnisgwsqlib.dll 
    - jnifplib\win32\sgwsqlib.dll 
    - jnifplib\win32\jnisgnfiqlib.dll 
    - jnifplib\win32\sgnfiqlib.dll 
    - jnifplib\win32\ sgfplib.dll 
    - jnifplib\win32\sgfpamx.dll 
- Copy the following files from "x64" to C:\windows\SysWOW64 
    - jnifplib\x64\jnisgfplib.dll 
    - jnifplib\x64\jnisgwsqlib.dll 
    - jnifplib\x64\sgwsqlib.dll 
    - jnifplib\x64\jnisgnfiqlib.dll 
    - jnifplib\x64\sgnfiqlib.dll 
    - jnifplib\x64\ sgfplib.dll 
    - jnifplib\x64\sgfpamx.dll
- Clone the Repo 
- Extract the repo and open in your code editor
- Enter the ```frontend``` directory and run ```npm install```
- run ```npm run dev``` in the terminal to run the frontend
- Enter the ```backend/java``` directory
- Download and intsall ```Maven``` from [here](https://maven.apache.org/download.cgi) and choose the ```Binary Zip archive```
- install the `FDxSDKPro.jar` package in your project by running 
```mvn install:install-file \
  -Dfile=/FDx SDK Pro for Windows v4.3.1_J1.12\FDx SDK Pro for Windows v4.3.1_J1.12\FDx SDK Pro for Java v1.12/FDxSDKPro.jar \
  -DgroupId=com.secugen \
  -DartifactId=fdx-sdk-pro \
  -Dversion=1.0.0 \
  -Dpackaging=jar
```
- Edit the ```pom.xml``` file
    ```
        <properties>
            <java.version>1.8</java.version>
        </properties>
    ```
    ```
        <parent>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-parent</artifactId>
            <version>2.7.18</version>
            <relativePath/> <!-- lookup parent from repository -->
        </parent>
    ```
    ```
        <dependency>
			<groupId>com.secugen</groupId>
			<artifactId>fdx-sdk-pro</artifactId>
			<version>1.0</version>
		</dependency>
    ```
- Run `mvn spring-boot:run` in the terminal to start the java  springboot project
