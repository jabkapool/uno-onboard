# Uno-Onboard

This is the client application of the Uno-Onboard project. It's in the client folder of the project.
Clone the entire project from:
https://github.com/EQSDigital/uno-onboard

Open the UnoWebApi.sln in Visual Studio, in the folder Backend and run the backend Web APi.
Open this client in Visual Studio Code, in the folder client. type `ng serve` and open the browser in `http://localhost:4200/`.

# Folder structure
The project will be structured this way:
src-
	assets       -
	environments -
	app          -
		         services    -
                               api-version.service.ts
                               user.service.ts                             
		         data        - 
                               api-version.ts (Interface)
                               user.ts (class)
                 api-version -
                               api-version.component.css
                               api-version.component.html
                               api-version.component.spec.ts
                               api-version.component.ts
		         user        -
			                   Create-User -                                
                                             create-user.component.css
                                             create-user.component.html
                                             create-user.component.spec.ts
                                             create-user.component.ts
			                   Update-User -
                                             update-user.component.css
                                             update-user.component.html
                                             update-user.component.spec.ts
                                             update-user.component.ts
                ...
    ...

# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

