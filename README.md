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

## Local setup

To setup the project to run locally:

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com?WT.mc_id=academic-45074-chrhar)
  - [Azure Static Web Apps for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps&WT.mc_id=academic-45074-chrhar)
  - [Azure Databases for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb&WT.mc_id=academic-45074-chrhar)
  - [Azure Functions for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions&WT.mc_id=academic-45074-chrhar)
- [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools), which can be installed via `npm`

```bash
npm install -g azure-functions-core-tools@3 --unsafe-perm true
```

### Setup

1. Clone the repository you created earlier when [deploying to Azure](https://docs.microsoft.com/azure/static-web-apps/add-mongoose?WT.mc_id=academic-45074-chrhar), or [create a copy from the template](https://github.com/login?return_to=/staticwebdev/mongoose-starter/generate) and clone your copy

  ```bash
  git clone <YOUR REPOSITORY URL HERE>
  cd <YOUR REPOSITORY NAME>
  ```

1. Open a command or terminal window execute the following code to install the prerequisites

  ```bash
  npm install
  cd api
  npm install
  ```

1. Initialize the Azure Functions project in the **api** directory by running the following inside the same terminal window

  ```bash
  func init
  ```

1. Choose **3. node** and **1. javascript** when prompted
1. Run the following commands in the terminal window to return to the parent directory and start your project

  ```bash
  cd ..
  npm run dev
  ```

Your project will now start!

> **IMPORTANT**: Because the development environment uses an in-memory database, any information will be cleared when you restart the server. You can install [MongoDB](https://www.mongodb.com/try/download/community) and add the `CONNECTION_STRING` setting to your [local.settings.json file](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v3%2Cwindows%2Cnode%2Cportal%2Cbash%2Ckeda&WT.mc_id=academic-45074-chrhar#local-settings) to use a local database.
