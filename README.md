# Static Web Apps - Mongoose starter

This project is designed to be a starter creating sites using [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview?WT.mc_id=academic-45074-chrhar), with [Azure Cosmos DB API for Mongo DB](https://docs.microsoft.com/azure/cosmos-db/mongodb/mongodb-introduction?WT.mc_id=academic-45074-chrhar) as a database and a [Mongoose](https://mongoosejs.com/) client. It's built with the following:

- Azure resources
  - [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview?WT.mc_id=academic-45074-chrhar)
  - [Azure Cosmos DB API for Mongo DB](https://docs.microsoft.com/azure/cosmos-db/mongodb/mongodb-introduction?WT.mc_id=academic-45074-chrhar)
- Application libraries
  - Vanilla JavaScript
  - [Mongoose](https://mongoosejs.com/)
  - [Azure Functions](https://docs.microsoft.com/azure/azure-functions/functions-overview?WT.mc_id=academic-45074-chrhar)
- Development libraries
  - [Azure Static Web Apps CLI](https://docs.microsoft.com/azure/static-web-apps/local-development?WT.mc_id=academic-45074-chrhar)
  - [MongoDB Memory Server](https://nodkz.github.io/mongodb-memory-server/docs/guides/quick-start-guide/)

## Azure deployment

Please refer to the [documentation](https://docs.microsoft.com/azure/static-web-apps/add-mongoose?WT.mc_id=academic-45074-chrhar) for information on creating the appropriate server resources and deploying the project.

## Local development

You can run the project locally as well by following the [local setup instructions](./local-setup.md).

## Project structure

This starter project is heavily commented and designed to be both a template and learning tool. The key files you'll want to be aware of:

### package.json

At the root of the project is *package.json*, which consists of a **dev** script for starting the server, and references to both [Vite](https://vitejs.dev/) and [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli) to enable running the project locally.

### vite.config

Configuration file for Vite, which instructs the service to use *public* as the root for the client.

### public

Root folder for the client and *index.html*, *style.css* and *script.js*. *script.js* contains the code to interact with the server and is heavily commented.

### api

Root folder for Azure Functions. All [new serverless functions](https://docs.microsoft.com/azure/static-web-apps/add-api?tabs=vanilla-javascript#create-the-api) are added to this directory.

### api/store.js

The data store for the project. Contains one Mongoose model for `TaskModel`, methods for interacting with the database, and logic to start the [MongoDB Memory Server](https://nodkz.github.io/mongodb-memory-server/docs/guides/quick-start-guide/) if no connection string is provided.

> **NOTE**: Note the environment variable of `CONNECTION_STRING`. This must be set for the application to use an external database.

### api/tasks/index.js

The code for Azure Functions is placed in a folder for each function and named **index.js**. It contains the code to get the current user information and use connect to the database and perform the operation.
