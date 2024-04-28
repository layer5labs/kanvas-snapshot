# Layer5 MeshMap Snapshot
Give your pipelines super powers with Meshery's GitHub Actions.

## MeshMap GitHub Action
1. See your deployment before you merge
1. Connect MeshMap to your GitHub repo and see changes pull request-to-pull request
1. Get snapshots of your infrastructure directly in your PRs

## Design Prologue
MeshMap Snapshot is a screenshot service provided via MeshMap for the design or Application user is interested in. It Enables users to visualize the changes being done in the code-base rapidly over each PR and inform the user about any potential changesin their infrastructure. It doesn't need any configuration or setup neither any deployment by the client rather a simple one time setup is able to provide a long time value.


## Functional/Sequence Diagram
For Github Workflows:
![sequence-diag](.github/readme/images/meshmap-snapshot.png)

## Example Usage:

### When Infrastructure is located in the file-system
```yaml
name: 'MeshMap Snapshot With File-located in Fs'
on: # rebuild any PRs and main branch changes
  pull_request:
  push:
    branches:
      - main
      - master
      - 'releases/*'

jobs:
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - name: Set PR number # To comment the final status on the Pull-request opened in any repository
        run: |
          export pull_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
          echo "PULL_NO=$pull_number" >> $GITHUB_ENV
      - uses: actions/checkout@v3 # the repository where your infrastructure is located
      - uses: actions/checkout@v3 #this step would go and would be no longer needed to be written
        with:
          path: action
          repository: layer5labs/meshmap-snapshot
      - id: test_result
        uses: layer5labs/MeshMap-Snapshot@v0.2.6
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }} # github's personal access token example: "ghp_...."
          mesheryToken: ${{ secrets.MESHERY_TOKEN }} # Meshery Cloud Authentication token, signin to meshery-cloud to get one, example: ey.....
          prNumber: ${{ env.PULL_NO }} # auto-filled from the above step
          application_type: "Kubernetes Manifest" # your application type, could be any of three: "Kubernetes Manifest", "Docker Compose", "Helm Chart"
          filePath: "action/__tests__/manifest-test" # relative file-path from the root directory in the github-runner env, you might require to checkout the repository as described in step 2
```
### When Infrastructure is identified via URL
```yaml
name: 'MeshMap Snapshot With URL-Upload'
on: # rebuild any PRs and main branch changes
  pull_request:
  push:
    branches:
      - main
      - master
      - 'releases/*'

jobs:
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - name: Set PR number # To comment the final status on the Pull-request opened in any repository
        run: |
          export pull_number=$(jq --raw-output .pull_request.number "$GITHUB_EVENT_PATH")
          echo "PULL_NO=$pull_number" >> $GITHUB_ENV
      - uses: actions/checkout@v3 #this step would go and would be no longer needed to be written
        with:
          path: action
          repository: layer5labs/meshmap-snapshot
      - id: test_result
        uses: layer5labs/MeshMap-Snapshot@v0.0.4
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }} # github's personal access token example: "ghp_...."
          mesheryToken: ${{ secrets.MESHERY_TOKEN }} # Meshery Cloud Authentication token, signin to meshery-cloud to get one, example: ey.....
          prNumber: ${{ env.PULL_NO }} # auto-filled from the above step
          application_type: "Helm Chart" # your application type, could be any of three: "Kubernetes Manifest", "Docker Compose", "Helm Chart"
          application_url: "https://github.com/meshery/meshery.io/raw/master/charts/meshery-v0.6.88.tgz"
```

#### FileSystem Approach Notes
The filesystem-approach asks for your relative file-path and automatically merges all the yaml files together to bundle up into one. So you might like to give the root directory where all the yamls are located. It doesn't move recursevely in internal folders, so only the first level yaml files are checked.

## List of Input variables supported:
```yaml
designId:  # id of input  #deprecated
  description: "The design uuid, example: 3c116d0a-49ea-4294-addc-d9ab34210662"
  required: false
  default: '{}'
applicationId:  #deprecated
  description: "The application uuid, example: 3c116d0a-49ea-4294-addc-d9ab34210662"
  required: false
githubToken:
  description: "Github PAT token"
  required: true
providerToken:
  description: "Meshery Authentication Provider Token"
  required: true
prNumber:
  description: "The Pull request on which comment has to be made"
  required: false
  default: 0
filePath: 
  description: "The relative filepath of the location where the manifests are stored"
  required: false
application_type:
  description: "Application upload type, any of the three, Kubernetes Manifest, Docker Compose, Helm Chart"
  required: true
application_url:
  description: "Application's source url where the manifests or data is stored"
  required: false
```

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action



<div>&nbsp;</div>

## Join the Layer5 community!

<a name="contributing"></a><a name="community"></a>
Our projects are community-built and welcome collaboration. 👍 Be sure to see the <a href="https://docs.google.com/document/d/17OPtDE_rdnPQxmk2Kauhm3GwXF1R5dZ3Cj8qZLKdo5E/edit">Layer5 Community Welcome Guide</a> for a tour of resources available to you and jump into our <a href="http://slack.layer5.io">Slack</a>!

<p style="clear:both;">
<a href ="https://layer5.io/community/meshmates"><img alt="MeshMates" src=".github/readme/images/community.svg" style="margin-right:10px; margin-bottom:15px;" width="28%" align="left"/></a>
<h3>Find your MeshMate</h3>

<p>MeshMates are experienced Layer5 community members, who will help you learn your way around, discover live projects and expand your community network. 
Become a <b>Meshtee</b> today!</p>

Find out more on the <a href="https://layer5.io/community">Layer5 community</a>. <br />
<br /><br /><br /><br />
</p>




<div>&nbsp;</div>

<a href="https://slack.meshery.io">

<picture align="right">
  <source media="(prefers-color-scheme: dark)" srcset=".github/readme/images//slack-dark-128.png"  width="110px" align="right" style="margin-left:10px;margin-top:10px;">
  <source media="(prefers-color-scheme: light)" srcset=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:5px;">
  <img alt="Shows an illustrated light mode meshery logo in light color mode and a dark mode meshery logo dark color mode." src=".github/readme/images//slack-128.png" width="110px" align="right" style="margin-left:10px;padding-top:13px;">
</picture>
</a>


<a href="https://meshery.io/community"><img alt="Layer5 Community" src=".github/readme/images//community.svg" style="margin-right:8px;padding-top:5px;" width="140px" align="left" /></a>

<p>
✔️ <em><strong>Join</strong></em> any or all of the weekly meetings on <a href="https://calendar.google.com/calendar/b/1?cid=bGF5ZXI1LmlvX2VoMmFhOWRwZjFnNDBlbHZvYzc2MmpucGhzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20">community calendar</a>.<br />
✔️ <em><strong>Watch</strong></em> community <a href="https://www.youtube.com/playlist?list=PL3A-A6hPO2IMPPqVjuzgqNU5xwnFFn3n0">meeting recordings</a>.<br />
✔️ <em><strong>Access</strong></em> the <a href="https://drive.google.com/drive/u/4/folders/0ABH8aabN4WAKUk9PVA">Community Drive</a> by completing a community <a href="https://layer5.io/newcomer">Member Form</a>.<br />
✔️ <em><strong>Discuss</strong></em> in the <a href="https://discuss.layer5.io">Community Forum</a>.<br />
✔️<em><strong>Explore more</strong></em> in the <a href="https://layer5.io/community/handbook">Community Handbook</a>.<br />
</p>
<p align="center">
<i>Not sure where to start?</i> Grab an open issue with the <a href="https://github.com/issues?q=is%3Aopen+is%3Aissue+archived%3Afalse+org%3Alayer5io+org%3Ameshery+org%3Aservice-mesh-performance+org%3Aservice-mesh-patterns+label%3A%22help+wanted%22+">help-wanted label</a>.</p>

<!-- <p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p> -->
