# About this repository
The intention of this repo is to concentrate all the Beagle default components for Beagle-Angular
and Beagle-React. For now it is not a priority to decouple these components from the core libs,
since it will take a considerable amount of work.

Testing the default components with instrumented tests is something that can be born decoupled
from the libs, for this reason, we use this repo, for now, only to test the default components.

# Tests

## Installation
First, clone this repo, then use yarn (or npm) to install the dependencies.

```bash
git clone git@github.com:ZupIT/beagle-web-components.git
cd beagle-web-components
yarn
cd automatedTests/angular
yarn
cd ../react
yarn
cd ../common
yarn
```

You will also need to clone the Beagle main repository in order to run the backend services. The
backend services are responsible for serving the views for our tests.

```bash
git clone git@github.com:ZupIT/beagle.git
```

## Running

#### Backend
First, make sure the backend for the tests is up and running. Inside the Beagle's main repository
folder, go to the directory `backend` and use the command `./gradlew automated-tests:bootRun` to
start it.

```bash
cd backend
./gradlew automated-tests:bootRun
```

#### Applications
All the steps below must be executed under the directory corresponding to the beagle-web-components
repository.

The second step is to run the applications you want to test. To run angular, go to the directory
`automatedTests/angular` and type `yarn start`. To run the react app, go to the directory
`automatedTests/react` and type `yarn start`

```bash
# angular
cd automatedTests/angular
yarn start
```

```bash
# react
cd automatedTests/react
yarn start
```

#### Tests
To run the tests themselves, under the directory `automatedTests/common`, use the command
`yarn test`.

```bash
# run all tests
yarn test
# run only tests for angular
yarn test:angular:9
# run only tests for react
yarn test:react
# run a specific feature
yarn test:angular:9 TAGS="@pageview"
```

When running the tests for the first time, it will take a while to check the installation of
Cypress. If it fails with a timeout, please try again.

## Structure
All tests are placed under the directory `automatedTests`, which has the following structure:

- angular: angular application to serve as a basis to run the tests related to the angular
components.
- react: react application to serve as a basis to run the tests related to the react components.
- common: the tests themselves.

