# Local setup

To support running locally, the starter project is built using [Vite](https://vitejs.dev/), [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools), [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli), and [MongoDB In-Memory Server](https://github.com/nodkz/mongodb-memory-server). You can follow the steps below to install the prerequisites, setup the project and start the local server.

## Prerequisites

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

## Setup

1. Clone the repository you created earlier when [deploying to Azure](https://docs.microsoft.com/azure/static-web-apps/add-mongoose?WT.mc_id=academic-45074-chrhar), or [create a copy from the template](https://github.com/login?return_to=/staticwebdev/mongoose-starter/generate) and clone your copy

  ```bash
  git clone <YOUR REPOSITORY URL HERE>
  cd <YOUR REPOSITORY NAME>
  ```

2. Open a command or terminal window execute the following code to install the prerequisites

  ```bash
  npm local:install
  ```

3. Run the following commands in the terminal window to start the project locally

  ```bash
  npm run dev
  ```

  Your project will now start!

4. Navigate to [http://localhost:4280](http://localhost:4280) to use your site

> **IMPORTANT**: Because the development environment uses an in-memory database, any information will be cleared when you restart the server. You can install [MongoDB](https://www.mongodb.com/try/download/community) and add the `CONNECTION_STRING` setting to your [local.settings.json file](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v3%2Cwindows%2Cnode%2Cportal%2Cbash%2Ckeda&WT.mc_id=academic-45074-chrhar#local-settings) to use a local database.
