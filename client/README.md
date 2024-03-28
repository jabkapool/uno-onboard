# Uno-Onboard

This is the client application of the Uno-Onboard project. It's in the client folder of the project.
Clone the entire project from:
https://github.com/EQSDigital/uno-onboard

Open the UnoWebApi.sln in Visual Studio, in the folder Backend and run the backend Web APi.
Open this client in Visual Studio Code, in the folder client. type `ng serve` and open the browser in `http://localhost:4200/`.

## Folder structure
The project will be structured this way: (folders will be in lowercase, but are in Uppercase here to better view the structure)<br/>
<b>Src</b><br/>
_____________________________________<b>Assets</b>______<br/>
_______________________________<b>Environments</b><br/>
________________________________________<b>App</b>_________<br/>
_______________________________<b>Services</b><br/>
_________________________________________api-version.service.ts<br/>
__________________________________________user.service.ts<br/>
__________________________________<b>Data</b>____<br/>
_________________________________________api-version.ts (Interface)<br/>
_________________________________________user.ts (class)<br/>
_____________________________<b>Api-version</b><br/>
_________________________________________api-version.component.css<br/>
_________________________________________api-version.component.html<br/>
_________________________________________api-version.component.spec.ts<br/>
_________________________________________api-version.component.ts<br/>
__________________________________________<b>User</b>_______<br/>
__________________________________________<b>Create-User</b><br/>                              
_____________________________________________________________create-user.component.css<br/>
_____________________________________________________________create-user.component.html<br/>
_____________________________________________________________create-user.component.spec.ts<br/>
_____________________________________________________________create-user.component.ts<br/>
__________________________________________<b>Update-User</b><br/>
_____________________________________________________________update-user.component.css<br/>
_____________________________________________________________update-user.component.html<br/>
_____________________________________________________________update-user.component.spec.ts<br/>
_____________________________________________________________update-user.component.ts<br/>

## Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

