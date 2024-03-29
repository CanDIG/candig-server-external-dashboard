# candig-server-external-dashboard

This is a React.js-based application that supports visualization of clinical, genomics and other types of data served by the [candig-server](https://github.com/candig/candig-server)

While the candig-server has a built-in dashboard, this app has more functionalities and is more responsive.

### Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Dataset selection](#dataset-selection)
  - [Available pages](#available-pages)
- [Contributing to this project](#contributing-to-this-project)
- [GitHub workflow](#github-workflow)


## Installation

Before installing the Dashboard, make sure you have [Node.js](https://nodejs.org/en/) version v10.13.0 or above installed in your environment.

To start a server for development purposes, clone the repo first.

```bash
git clone git@github.com:CanDIG/candig-server-external-dashboard.git
cd candig-server-external-dashboard
npm install
```

You should specify the path of your candig-server API server in `.env.development` file.

Once the installation is completed, you may start the dashboard by running:
```bash
npm start
```
## Production Deployment

Specify the path of your candig-server API server in `.env.production` file.

```bash
npm run build
```

Serve the `/build` folder with any production-grade static file server, such as nginx.

For testing purposes, you may use `http-server` to serve the `/build` folder.

```bash
npx http-server --proxy http://0.0.0.0:8080? ./build/
```

## Usage

### Help page

The help page contains overview of all pages, as well as FAQ and glossary. Please refer to the help page first, if you have any questions in using the application.

If you have questions that are unanswered, please feel free to let us know!

### Available pages

Below there is a list of some (but not limited to) available pages for data visualization. Click on the picture to expand it.

| ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/overview_page.png)        | ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/patients_overview.png) |
|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/individuals_overview.png) | ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/gwas_browser.png)      |
| ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/variants_search.png)      | ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/clinical_metadata.png) |
| ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/chord_metadata.png)       |   ![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/services_status.png)                                                                                                              |

## Contributing to this project

If you encounter a bug, or have a problem of using the service, please contact us by opening an issue at [issues page](https://github.com/CanDIG/candigv2_dashboard/issues)

### GitHub workflow

We mainly employ three different types of branches: feature branches, develop branch, and stable branch.

Feature branches are used to resolve a limited set of issues, and typically follows the naming convention of username/fix_one_particular_issue. When initiating a Pull Request, you should request it to be merged back into the develop branch. The commits in individual feature branches are usually squashed, and code review usually happens at this step.

Develop branch is used to host code that has passed all the tests, but may not yet be production-ready, As a developer, you are welcome to play with this branch to test some of the new functionalities.

If you would like to contribute code, please fork the package to your own git repository, then initiate a Pull Request to be merged into develop.

