# Kainda

Kainda is a CLI tool and NodeJS framework (kinda) that help development of backend JavaScript REST APIs on NodeJS.

The CLI can generate new projects on the directory of execution with all the necessary boilerplate code to execute instantly an Express and Mongoose/Sequelize based project.

After that, also can generate new database entities using the chosen ORM/ODM, which generates an empty model for you to complete, CRUD routes, controllers and Middlewares for express, seeders for database initialization, validators and test boilerplate using Mocha testing framework.

## Table of contents

- [Kainda](#kainda)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [CLI](#cli)
    - [Command structure](#command-structure)
    - [Creating a new project](#creating-a-new-project)
    - [Creating a new entity](#creating-a-new-entity)
  - [Project structure](#project-structure)
  - [Entity structure](#entity-structure)
  - [How the framework works](#how-the-framework-works)
    - [Setup file](#setup-file)
    - [Config](#config)
    - [Models](#models)
    - [Routes](#routes)
    - [Middlewares](#middlewares)
    - [Controllers](#controllers)
    - [Exceptions](#exceptions)
    - [Seeders](#seeders)
    - [Test](#tests)
    - [Validators](#validators)
  - [Contributing](#contributing)
  - [License](#license)


## Installation
Kainda can be installed globally or locally using npm (or pnpm):

```bash
npm install -g kainda
```

or 
    
```bash
npm install kainda
```

Currently, there is no support for Yarn, even though it is planned to be added in the future.

##  CLI

All the package functionality can be accessed using the 'kainda' command if it was installed globally, or using 'npx kainda' if it was installed locally.

Additionally, the CLI can be used without parameters, which will show a navigation menu with all the available commands and options to execute it inside the program, or can be used with the desired command and options as parameters, which will execute the command and exit the program immediately after.

If you desire, you can also start a command and execute it halfway, the CLI will ask you for the missing parameters and options needed to complete the command.

Due to the inctuitive nature of the CLI, the following sections will only cover the usage of the CLI with parameters and we will assume that the package was installed globally, but if you need help with any other question, covered here or not, feel free to open an issue on this repository.

### Command structure

All of the commands follow the same structure, which makes them easy to remember and use.

```
    kainda <project|entity> create <name> [options]
```

The first parameter indicates if you are referring to a project or an entity, the second parameter indicates the action to perform (currently only create), and the third parameter is the name of the project or entity to create. The options parameter are optional and can be used to customize the creation of the project or entity, refer to the following sections for more information.

### Creating a new project

To create a new project, you can use the 'project' command, which will ask you for the project name, the ORM/ODM to use (Mongoose or Sequelize) and the port to use for the server.

```
    kainda project create <name> [options]
```

The options parameter can be used to skip the questions and use the provided values instead, the following options are available:

```
    -sql,   --sequelize    Use the Sequelize ORM for the project
    -nosql, --mongoose     Use the Mongoose ODM for the project
```

### Creating a new entity

To create a new entity, you can use the 'entity' command, which will ask you for the entity name, the type of entity and the ORM/ODM to use (Mongoose or Sequelize).

```
    kainda entity create <name> [options]
```

The options parameter can be used to skip the questions and use the provided values instead, the following options are available:

```
    -sql,   --sequelize    Use the Sequelize ORM for the entity
    -nosql, --mongoose     Use the Mongoose ODM for the entity
```

## Project structure

The project structure is designed to be as simple as possible, but also to be as flexible as possible, so you can add or remove any part of the project without breaking anything.

The project structure is as follows:

```
    ├── app
    │   ├── entities
    │   │   └── [entityName]
    │   │          └── ...
    │   └── test
    │       ├── mocha.setup.js
    │       └── utils.setup.js
    │
    ├── config
    │   ├── default.json
    │   ├── development.json
    │   ├── production.json
    │   └── test.json
    │
    ├── .gitignore
    ├── index.js
    ├── setup.js
    └── package.json
```

In the root folder we have the entry point of the project, the index.js file, which is the file that will be executed when the project is started. This file is merely a wrapper for the setup.js file, which is the file that actually starts the server.

The setup.js file imports all the necessary modules, initializes the database connection, the express server and the routes, gets the models and makes them available to all the application, seed the database if specified and finally exports the express instance to be used by the index.js file or by the test suite.

The config folder contains all the configuration files for the project, the default.json file contains the default configuration for the project, which can be overriden by the environment specific configuration files, which are development.json, production.json and test.json. See the [config](https://github.com/node-config/node-config#readme) package documentation for more information.

The app folder contains all the application code, whatever are you creating, the app folder is the place to put it.

The entities folder contains all the entities of the project and all of their components, mostly generated automatically by the CLI. 

Last, the test folder contains the setup for Mocha, which contains a global beforeAll hook to initialize the app to be tested. You can modify this file to add any other global hooks or configuration for the test suite. Additionally, the utils.setup.js file contains some utility functions to help with the testing of the project, like the creation of certain entities or the login of a user. The test folder is also the place to put any test related file that is not strictly related to a specific entity. More details about the test suite can be found in the [Tests](#tests) section or in the Mocha documentation [here](https://mochajs.org/).

## Entity structure

The entity structure is simple, scalable and extremely flexible, so you can add or remove (almost) any part of the entity without breaking anything.

The entity structure is as follows:

```
    ├── [entityName]
    │   ├── controllers
    │   │   ├── src
    │   │   │   └── create.controller.js
    |   |   |   └── delete.controller.js
    |   |   |   └── get.controller.js
    |   |   |   └── update.controller.js
    │   │   └── index.js
    │   │
    │   ├── exceptions
    │   │   ├── src
    │   │   |    └── all.exception.js
    │   │   └── index.js
    │   │
    |   ├── middlewares
    │   │   ├── src
    │   │   |    └── checkRequiredKeys.middleware.js
    │   │   └── index.js
    │   │
    │   ├── model
    │   │   ├── src
    │   │   |    └── [entityName].model.js
    │   │   └── index.js
    │   │
    │   ├── routes
    │   │   ├── src
    │   │   |    └── create.routes.js
    |   |   |    └── delete.routes.js
    |   |   |    └── get.routes.js
    |   |   |    └── update.routes.js
    │   │   └── index.js
    │   │
    │   ├── seeders
    │   │   ├── src
    │   │   |    └── all.seeder.js
    │   │   └── index.js
    |   |
    │   ├── test
    |   |   └── ... *see Testing section
    │   │
    │   └── validators
    │       ├── src
    │       |    └── all.validator.js
    │       └── index.js
    │   
    └── index.js
```

The central file of the entity is the index.js file, which is the file that will be imported by the app every time the entity is used. This file is responsible for exporting the model, which is a KaindaModel class instance that contains all the information about the controllers, exceptions, middlewares, routes, seeders and validators of the entity. This file is also where the seed_options object is defined, which is used to specify wether the entity should be seeded or not and if so, its seeding dependencies and what to do with the existing data.

All of this information will be expanded in the following sections.

## How the framework works

Projects generated with Kainda are designed to be used with the Kainda framework toolset, but every one of these options can be used independently in your project.

The only mandatory requirement (at least for now) is that your project must make the Models available globally for the framework to use them. This can be achieved by the following code line ubicated in the setup.js file at the root of your project:

```javascript
    global.Models = kainda.exportModels();
```

Even though this is the only mandatory requirement, the base project is generated also making available the sequelize/mongoose instance, the config instance and the ExceptionHandler function for now, but in the future is planned to abandon the use of global variables and use dependency injection instead.

### Setup file

The setup file starts using the module module-alias ([see here](https://www.npmjs.com/package/module-alias)) to make the app, entities and test folders available globally withabsolute paths. This is done to avoid the use of relative paths in the project, which can be a pain to maintain in the long run.

After that, the rest of the imports are made, for a further explanation of each one, see the [Required packages](#required) section.

Subsequently, the express app is created, the middlewares are registered, the database connection is initialized, the Models are imported and made available globally, we check if the application needs seeding, we register the routes and then we start listening to connections.

### Config

The config folder contains all the configuration files for the project, the default.json file contains the default configuration for the project, which can be overriden by the environment specific configuration files, which are development.json, production.json and test.json. In the package.json there are some predefined scripts to run the project in development, production and test environments, which will use the corresponding configuration file. If you want to execute the project manually or if you need to use a different environment, you can use the NODE_ENV environment variable to specify the environment you want to use:

```bash
    cross-env NODE_ENV=development npm start
```

The config files are loaded in a way where their properties are merged, so the default.json file will be loaded first, then the environment specific file will be loaded and every property in the environment specific file will override the same property in the default file. This allows us to have a default configuration for the project and then override it with environment specific configuration. For example, if the default.json file contains the following configuration:

```json
    {
        "database": {
            "host": "localhost",
            "port": 27017,
            "name": "kainda"
        }
    }
```

And the development.json file contains the following configuration:

```json
    {
        "database": {
            "host": "SOME_OTHER_HOST",
            "random_property": "random_value"
        }
    }
```

The final configuration for the development environment will be:

```json
    {
        "database": {
            "host": "SOME_OTHER_HOST",
            "port": 27017,
            "name": "kainda",
            "random_property": "random_value"
        }
    }
```

### Models

The Models are the core of the framework, they are the ones that contain all the information about the entity, its controllers, exceptions, middlewares, routes, seeders and validators. Each entity has a unique KaindaModel and its construction is the only difference between a MongooseModel and a SequelizeModel in the app. 

The KaindaModel class is a wrapper class for Mongoose and Sequelize models, which allows us to use the same code for both of them. Inside the KaindaModel class, we have some passthrough methods that standarize the way we interact with the models, like the create, update, delete, get and find methods. It also contains internally a class for creating and managing transactions, used by the default controllers and recommended for all the modifications of the database.

### Routes

The routes are express routes, that means that they assigns a callback function to a specific path and HTTP method. Every entity comes with a predefinition of the following routes:

- POST /entityName              Creates a new entity with the given data in the request body
- GET /entityName               Returns all the entities in the database
- GET /entityName/:id           Returns the entity with the given id
- PUT /entityName/:id           Updates the entity with the given id with the data in the request body
- DELETE /entityName/:id        Deletes the entity with the given id

These routes are created by the default routes of the framework, but you can add your own routes to the entity by creating a new route file in the routes folder of the entity. The route file must export an object that contains named functions that receives the express app instance as parameter. 

For example, a new route file could look like this:

```javascript
    module.exports = {
        createByEmail: (app) => {

            app.post(
                '/entityName/email', 
                [
                    (req, res, next) => {
                        console.log("This is a middleware");
                        next();
                    }
                ],
                async (req, res) => {
                    console.log("This is a controller function");
                }
            );

        }
    }
```

### Middlewares

Middlewares are functions that have access to the request object (req), the response object (res) and the next middleware function in the application’s request-response cycle. The middlewares are executed sequentially, so the order in which they are registered is important. Kainda comes with a pre-built middleware that checks if the request body contains all the required keys for the entity to be created accessible and modifiable in the middlewares folder, and also comes with an internal middleware that checks the authorization header for a valid JWT token. 

You can add your own middlewares to the entity by creating a new middleware file in the middlewares folder of the entity. The middleware file must export an object that contains named functions that receives the request, response and next parameters.

For example, a new middleware file could look like this:

```javascript
    module.exports = {
        checkIfUserIsAdmin: (req, res, next) => {
            if(req.user.role !== "admin") {
                return res.status(403).json({
                    message: "You are not authorized to perform this action"
                });
            }
            next();
        }
    }
```

### Controllers

Controllers are functions that are responsible for handling the requests and sending the responses. They are the ones that interact with the database and return the data to the client. Kainda comes with pre-built controllers that handles all of the CRUD operations for the entity automatically, but you can (and should) modify the existing ones by adapting them to your needs and create new ones if you need to.

All controllers should be wrapped in a try/catch block and throw exceptions whenever an error is encountered. In the catch block, the controller should perform all the necessary actions to rollback the transaction if exists and call the ExceptionHandler function with the error and the response object as parameters. The ExceptionHandler function will handle the error and return the appropriate response to the client.

For example, a controller could look like this:

```javascript
    async function create(req, res) {
        let transaction = Models.MyEntity.transaction();
        try {
            const entity = await Models.MyEntity.createOne(req.body, { transaction });
            await transaction.commit();
            res.status(201).json(entity.toJSON());
        } catch (error) {
            if (transaction) await transaction.rollback();
            ExceptionHandler(error, res);
        }
    }

    module.exports = { create };
```

### Exceptions

Exceptions are the errors that can be produced in the application. They should always be catched to avoid the application to crash. This exceptions are usually thrown by the controllers or middlewares and are specially useful and designed to automatically return the appropriate response to the client. 

Even if its not the case and you need a custom exception that is not handled by the framework, it is recommended to be defined in a separate file inside the exceptions folder of the entity. The custom exception might not be suitable for the framework, so when you throw it, you should handle it a specific catch block and not be passed as an argument to the ExceptionHandler function, but if this happens, the framework will automatically return a 500 Internal Server Error response to the client with the message "An unexpected error has occurred".

Kainda comes with a pre-built ExceptionHandler function that handles all of the KaindaExceptions that are thrown in the application and returns the appropriate response to the client. You can add your own exceptions by creating a new exception file in the exceptions folder of the entity. The exception file must export an object that contains classes that extends the KaindaException class.

It also comes with a per-class exception handler that handles all of the exceptions of the class and returns the appropriate response to the client. It is designed as a tool to handle exceptions for a specific entity differently (log them, send an email in response, etc.). By default it is set to the GenericKaindaExceptionHandler, but you can change it by creating a new exception handler file in the exceptions folder of the entity. The exception handler file must export a class that extends the GenericKaindaExceptionHandler class.

There is also some pre-built exceptions that can be used in the application. They are defined in the GenericKaindaExceptions object and only contains the HTTP status code and the status message of the exception.

For example, a new exception file could look like this:

```javascript
const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    MyEntityException : KaindaException,
    MyEntityBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ...
    MyEntityExceptionHandler: GenericKaindaExceptionHandler
}
```

There is no mandatory exception or even structure for the exceptions, but it is recommended to follow the same structure as the pre-built exceptions and not delete the auto-generated ones to follow the same structure and standards between all the entities.

### Seeders

Seeders are functions that are responsible for populating the database with initial data. They are used to create the initial data of the entity in the database. Kainda offers a pre-built seed function with every KaindaModel and has a seed_options structure that can be used to configure the seed function.

The default seed function pre-built looks like this (vastly simplified):

```javascript
async function seed(data = null, options = {}) {
    if (!shouldSeed(this)) {
        return;
    }
    if (this.seed_options.dependencies && this.seed_options.dependencies.length > 0 && !options.ignoreDependencies) {
        await seedDependencies(this, options);
    }
    if (!data || data.length === 0) {
        data = this.seed_options.data;
    }
    let need_to_seed = true;
    if (this.seed_options.oldRecords && this.seed_options.oldRecords !== "") {
        need_to_seed = await processOldRecords(this, data, options);
    }
    if (need_to_seed) {
        await __seed(this, data, options);
    }
}
```

First, the function will check that the seed attribute of the seed_options is true and if it's not, then finalizes the execution of the function. Then, if the entity has dependencies, it will seed them first. After that, it will check if the data parameter is null or empty and if it is, it will use the data attribute of the seed_options. Then, it will check if the oldRecords attribute of the seed_options is set and if it is, it will execute a function dependent on the oldRecords attribute. Finally, it will seed the entity with the data.

The seed function can be overwritten by creating a new seed function in the default all.seeders.js file in the seeders folder of the entity. The only strong recomendation is setting inside the custom function the is_seeded attribute of the seed_options to true, so the seed function will not be executed again if the modified entity is dependencied by another entity.

For example, a new seed function could look like this, even though this example is equivalent to the default seed function in functionality minus optional features:

```javascript
module.exports = {
    seed: async function (data = null, options = {}) {
        Models.MyEntity.createMany(data, options);
        this.seed_options.is_seeded = true;
    }
}
```

The Seeders file by default contains a parameter called data, which is an array of objects that contains the data that will be used to seed the entity. This data can be modified by the user programatically or directly in the file to add or remove data from the seeders. 

The seed_options attribute is defined directly inside the KaindaModel just after exporting all the information in the index.js file, at the root of that entity folder. Its structure contains the following attributes:

- **seed**: Boolean that indicates if the entity should be seeded or not. It is set to true by default, so the seed function will be executed. False by default.
- **dependencies**: Array of KaindaModels that contains the entities that are dependencied by the entity. The seed function will seed the dependencies first. By default it is an empty array.
- **data**: Array of objects that contains the data that will be used to seed the entity. This data can be modified by the user programatically or directly in the file to add or remove data from the seeders. By default it is the data that is defined in the seeders file.
- **is_seeded**: Boolean that indicates if the entity has been seeded or not. It is set to true by default, so the seed function will not be executed again if the modified entity is dependencied by another entity. It is set to false by default and should only be set to true by the seed function.
- **oldRecords**: String that indicates the what to do with the information that there is in the database at the time of seeding. There are 4 accepted values for this attribute:
    - **"deleteAll"**: Deletes all the records in the database and seeds the entity with the new data. This is the default value.
    - **"dontSeedIfRecordsExists"**: Does not seed the entity if there are records in the database.
    - **"dontSeedIfAnyExists"**: Search for any record in the database that matches any of the records in the data and does not seed the entity if any of them exists.
    - **"dontSeedIfAllExists"**: Search for any record in the database that matches any of the records in the data and does not seed the entity if all of them exists.


### Tests

Tests are functions that are responsible for testing the functionality of the entity. They are used to test the functionality of the entity and to ensure that the entity is working as expected. Kainda automatically generates empty tests (boilerplate) for every controller auto-generated by the KaindaModel. This tests are located inside the endpoints folder of the test and are named after the controller that they are testing. For example, the tests for the default controller are located in the tests/create.test.fragment.js file.

The fragment name is used to auto-import the test onto the main test file and to avoid mocha from executing the test twice. 

Kainda also generates a unit folder designed to contain unit tests for the entity, but currently no boilerplate is generated for this folder because there are major diffences between models to generate useful unit tests automatically.

The main test file is called entityName.test.js and is located in the root of the test folder of the entity. This file is used to import all the tests and to execute them and does not need to be modified by the user, but it can be modified to add more test types or modify the way the tests are executed.

The tests are executed by mocha, so the user can use any of the mocha features to execute the tests. For example, the user can execute the tests by running the following command:

```bash
    npm run test
```

The package.json file contains the mocha configuration, so the user can modify the configuration to fit their needs.

By default, this is the Mocha config:

```json
  "mocha": {
    "require": [
      "./app/test/mocha.setup.js"
    ],
    "spec": "./app/**/*.test.js",
    "recursive": true,
    "timeout": 1000000,
    "exit": true
  },
```

This configuration will execute first the setup file and then all the files that end with .test.js in the app folder and all its subfolders. The timeout is set to 1000000 milliseconds (16 minutes) and the exit attribute is set to true, so mocha will exit after the tests are executed. The user can modify this configuration to fit their needs.

A test fragment file does not need to export anything, but it should contain at least one call to describe or it. The describe function is used to group tests and the it function is used to define a test. For example, a test fragment file could look like this:

```javascript
    describe('MyEntity', () => {
        it('should create a new MyEntity', async () => {
            console.log("This is a test");
        });
    });
```


### Validators

Validators are functions that are responsible for validating the data that is received in the request body. They are used to check if the data is valid and if it contains all the required keys for the entity to be created. Kainda currently does not offer any default or pre-built validators, but you can add your own validators to the entity by creating a new validator file in the validators folder of the entity. The validator file must export an object that contains named functions that receives the request body as parameter.

For example, a new validator file could look like this:

```javascript
    module.exports = {
        create: (body) => {
            if(!body.email || !body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
                throw new Models.MyEntity.Exceptions.MyEntityBadRequestException("Email field is required and must be a valid email");
            }
            if(!body.password || body.password.length < 8) {
                throw new Models.MyEntity.Exceptions.MyEntityBadRequestException("Password field is required and must be at least 8 characters long");
            }
        }
    }
```

## Contributing
Contributions are welcome! If you would like to contribute to Kainda, please submit a pull request on GitHub.

## License
Kainda is licensed under the MIT license. See the [LICENSE](https://github.com/Joselu21/kainda/blob/master/LICENSE) file for more information.