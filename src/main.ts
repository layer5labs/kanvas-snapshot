import * as core from '@actions/core'
import { CypressResult, Result } from './cypressTest'
import { TableSummary } from './tableSummary'

async function run(): Promise<void> {
  try {
    const jsonInput: string = core.getInput('jsonInput')
    core.debug(`Waiting ${jsonInput} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.info(`Json Input ${jsonInput}`);
    const finalJsonResponse = getTableOutputAsJson(JSON.stringify(jsonInput));
    finalJsonResponse.map(console.log);

    const mardownresult = convertJsonToMardownTable(finalJsonResponse);
    console.log(mardownresult);
    core.info(mardownresult);

    core.setOutput('mardownResult', mardownresult)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getTableOutputAsJson(jsonInput: string): TableSummary[] {
  const cypressJsonResult: CypressResult = JSON.parse(jsonInput);
  const testResult: Result[] = cypressJsonResult.results;

  return testResult.map((result: Result): TableSummary => {
    return {
      title: result.title,
      total: result.suites.reduce((prev, curr) => {
        return prev + curr.tests.length
      }, 0),
      skipped: result.suites.reduce((prev, curr) => {
        return prev + curr.skipped.length
      }, 0),
      duration: result.suites.reduce((prev, curr) => {
        return prev + curr.duration
      }, 0),
      failures: result.suites.reduce((prev, curr) => {
        return prev + curr.failures.length
      }, 0),
      pending: result.suites.reduce((prev, curr) => {
        return prev + curr.pending.length
      }, 0),
      success: result.suites.reduce((prev, curr) => {
        return prev + curr.passes.length
      }, 0)
    }
  })
}

function convertJsonToMardownTable(cypressJson: TableSummary[]) {
  const tableHeaderMd = convertRowToMd(tableHeader);

  const tableDataRows = cypressJson.map((sum) => convertRowToMd(Object.values(sum)));

  return tableHeaderMd + tableHeader.map(mp => "--| ") + "\n" + tableDataRows;
}

const convertRowToMd = (columns: (string | Number)[]) => `|${columns.map((col: (string | Number)) => col + "|")}\n`


const tableHeader = ["Title", "Skipped", "Pending", "Failures", "", "Total"]

run()
