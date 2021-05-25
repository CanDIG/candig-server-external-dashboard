# candig-server-beta-dashboard

### Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Dataset selection](#dataset-selection)
  - [Available pages](#available-pages)
- [Contributing to this project](#contributing-to-this-project)
- [GitHub workflow](#github-workflow)


## Installation

Before installing the Dashboard, make sure you have [Node.js](https://nodejs.org/en/) version v10.13.0 or above installed on your environment.

Clone this repository and start the installation using the following commands:
```bash
git clone git@github.com:CanDIG/candig-server-beta-dashboard.git
cd candig-server-beta-dashboard
npm install
```
That command will install all the dependencies used on the application.

Once the installation is completed, you may start the dashboard by running:
```bash
REACT_APP_CANDIG_SERVER_DASHBOARD_BASE_URL='http://your_candig_server_path.ca' npm start
```
## Deployment

```bash
export REACT_APP_CANDIG_SERVER_DASHBOARD_BASE_URL='http://your_candig_server_path.ca'
npm run build
npx http-server --proxy http://0.0.0.0:8080? ./build/
```

## Usage

### Dataset selection

First thing first, select the desirable dataset on the top-right corner. This will load all the information for the charts. Here is a sample:

![](https://raw.githubusercontent.com/CanDIG/candigv2_dashboard/develop/docs/datasets_dropdown.png)

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

