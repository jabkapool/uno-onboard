# uno-onboard
Projecto Introdução UNO.

 O Projecto vai ter a seguinte estrutura:
 Backend/
 - UnoWebAPI - Vai ter todos os endpoints necessários                   | WebApi project
 - UnoWebApi.Domain             Entities, database models classes, etc  | Class Library project
 - UnoWebApi.Application        Business logic, services, etc           | Class Library project
 - UnoWebApi.Infrastructure     Database Migrations, DbContext, etc     | Class Library project
 - UnoWebApi.Tests

 FrontEnd/
- Projecto Angular

 Se a estrutura ficar acordada a classe UnoWebApiVersion.cs pode ser movida para o projecto UnoWebApi.Domain
 Clean Architecture
    https://www.c-sharpcorner.com/article/clean-architecture-in-asp-net-core-web-api/

Setup
 - Clone this repository
 Build
 - Open UnoWebAPI solution in Visual Studio
 Run
 - Run solution and execute endpoints in swagger, or use Postman
