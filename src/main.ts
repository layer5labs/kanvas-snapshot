import * as core from '@actions/core'
import {CypressResult, Result} from './cypress-test-definition'
import {TableSummary} from './table-summary-definition'
import fs from 'fs'
import path from 'path'

async function run(): Promise<void> {
  try {
    let jsonInput: string
    if (core.getInput('jsonArtifact')) {
      // jsonInput = fs.readFileSync(core.getInput('jsonArtifact')).toString()
      jsonInput = fs
        .readFileSync(path.join(__dirname, '..', '__tests__', 'output.json')) // todo: remove this hardcoding, if the the jsonArtifact is present that path should be used
        .toString()
    } else {
      jsonInput = core.getInput('jsonInput')
      core.debug(`Waiting ${jsonInput} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    }

    const finalJsonResponse = getTableOutputAsJson(jsonInput)
    core.debug(`Final Array Response:  ${finalJsonResponse}`)
    // finalJsonResponse.map(console.log)

    const mardownresult = convertJsonToMardownTable(finalJsonResponse)
    // console.log(mardownresult)
    core.info(mardownresult)

    core.setOutput('mardownResult', mardownresult)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getTableOutputAsJson(jsonInput: string): TableSummary[] {
  core.debug(`getTableOutputAsJson ${jsonInput}`)
  const cypressJsonResult: CypressResult = JSON.parse(jsonInput)
  const testResult: Result[] = cypressJsonResult.results

  return testResult.map((result: Result): TableSummary => {
    return {
      title: result.file.split('/').slice(-1)[0], // get the name from file
      success: result.suites.reduce((prev, curr) => {
        return prev + curr.passes.length
      }, 0),
      failures: result.suites.reduce((prev, curr) => {
        return prev + curr.failures.length
      }, 0),
      pending: result.suites.reduce((prev, curr) => {
        return prev + curr.pending.length
      }, 0),
      skipped: result.suites.reduce((prev, curr) => {
        return prev + curr.skipped.length
      }, 0),
      duration: `${
        result.suites.reduce((prev, curr) => {
          return prev + curr.duration
        }, 0) / 1000
      }s`
      // total: result.suites.reduce((prev, curr) => {
      //   return prev + curr.tests.length
      // }, 0)
    }
  })
}

function convertJsonToMardownTable(cypressJson: TableSummary[]): string {
  core.debug(`getTableOutputAsJson ${cypressJson}`)
  const tableHeaderMd = convertRowToMd(tableHeader)

  const tableDataRows = cypressJson
    .map(sum => convertRowToMd(Object.values(sum)))
    .join('\n')

  return `${tableHeaderMd}\n${tableHeader
    .map(() => '--| ')
    .join('')}\n${tableDataRows}`
}

const convertRowToMd = (columns: (string | Number)[]): string => {
  core.debug(`${columns}`)
  return `|${columns.map((col: string | Number) => col).join('|')}`
}

const tableHeader = [
  'Title',
  'Passes :white_check_mark:',
  'Failures :x:',
  'Pending',
  'Skipped',
  'Duration'
  // "total"
]

run()
