# Fingerprint Authentication System

Multi-backend biometric authentication system using:

- 🖼️ React (Frontend)
- 🧠 Java (Spring Boot) for scanning + matching
- 💽 PHP (MariaDB) for template storage and retrieval

This is a complete Guide on how to setup the project with the Secugen Hamster Plus Scanner

> 💡 **Note:** You need to install Maven, Springboot and Java * before running this project

# Setup

1. ## Download

-  Download and Install the Java 2 SDK v1.8.0_51 [here](https://www.oracle.com/technetwork/java)
- Download the Secugen Windows driver [here](https://www.dropbox.com/t/w8kk93pfWRiMWF1Z) and install
- Download the Secugen FDxSDK Pro for Windows. Got to [here](https://secugen.com/request-free-software/) and check on the FDxSDK Pro for Windows option, fill in your details in the field below and click on submit and a download link will sent to your email
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
    ```xml
        <properties>
            <java.version>1.8</java.version>
        </properties>
    ```
    ```xml
        <parent>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-parent</artifactId>
            <version>2.7.18</version>
            <relativePath/> <!-- lookup parent from repository -->
        </parent>
    ```
    ```xml
        <dependency>
			<groupId>com.secugen</groupId>
			<artifactId>fdx-sdk-pro</artifactId>
			<version>1.0</version>
		</dependency>
    ```
- Run `mvn spring-boot:run` in the terminal to start the java  springboot project


## Endpoints

**The java endpoint is available over the `localhost:8080` port**
***Below are the endpoints via the `8080` port***
- **scan:** `/api/fingerprint/scan`
- **match:** `/api/fingerprint/match`

# How to use
To run and use the project
- Plug in the scanner
- Open the frontend and run it `npm run dev`
- Open the backend and run it `mvn spring-boot:run`
- Write a simple fetch request or use the existing one in the project 
    ```javascript
        const scan = async(e)=>{
            const res = await fetch("http://localhost:8080/api/fingerprint/scan");
            const data = await res.json();
            
            console.log(data)
        }
    ```
    ```javascript
        const match = async()=>{
            const encodedTemp1 = encodeURIComponent(template1);
            const encodedTemp2 = encodeURIComponent(template2);
            const res = await fetch(`http://localhost:8080/api/fingerprint/match?template1=${encodedTemp1}&template2=${encodedTemp2}`);
            const data = await res.json();
            
            console.log(data);
        }
    ```

> 💡 **Note:** The match function pass in two template in the url one fetched from the databas and second front the user and send it to the java backend to match and return a `true` or `false` if matched

## Addition
This project comes with a `PHP` backend that can be used just follow the setup

- Navigate the `PHP` directory in the backend
- open the `config` folder and setup your database details there

*Run XAMPP*
- Create Database and name it **`evoting`**

*Run the following SQL queries*

- Create User Table
    ```sql
        CREATE TABLE users(
            id INT PRIMARY KEY AUTO_INCREMENT,
            f_name VARCHAR(15) NOT NULL,
            l_name VARCHAR(15) NOT NULL,
            email VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL
        )
    ```
- Create Biometric Table
    ```sql
        CREATE TABLE biometric(
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            template VARCHAR(540) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ```

This is pretty much it for the setup. If further assitance is needed you can reach me
- Via [WhatsApp](https://wa.me/2349122241964)
- Via [Email](mailto:jataujustice200@gmail.com)