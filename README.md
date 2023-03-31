# cypress-test-summary

<!-- <p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p> -->

# usage
Some work is in progress to make it more general, but it is still fully usable under two usage param.

### Send your report as stringified JSON
You can send the cypress report created from `mochawesome` as stringified JSON as a param
e.g.
```yml
test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - id: test_result
        uses: ./
        with: 
          jsonInput:  "json string"
```
test and action for stringified JSON value: [test.yaml](./.github/workflows/test.yml)

### send your report as json file.

```yml
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with: 
          path: './'
      - uses: ./
        name: run test
        with:
          jsonArtifact: "./__tests__/ouput.json"
```

### send your json as artifact
```yml
jobs:
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with: 
          path: './'
      - uses: actions/upload-artifact@v3
        with: 
          name: output.json
          path: "./__tests__/output.json"   
  download:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v2
        with: 
          path: './'
      - uses: actions/download-artifact@v3
        with: 
          name: output.json
          path: "./"
      - uses: ./
        name: run test
        with:
          jsonArtifact: '/home/runner/work/cypress-test-summary/cypress-test-summary/ouput.json'
```

Currently when providing jsonArtifact, [it is hardcoded to be picked from `__tests__/output.json`](https://github.com/layer5labs/cypress-test-summary/blob/cc8868d300584f31dc9d03724535d58b419ab147/src/main.ts#L13), so you can move your json file here in this folder once generated. 

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try { 
      ...
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/layer5labs/cypress-test-summary/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
