import * as core from '@actions/core'
import { wait } from './wait'
import { CypressResult, Result } from './typeDefinition'

async function run(): Promise<void> {
  try {
    const jsonInput: string = core.getInput('jsonInput')
    core.debug(`Waiting ${jsonInput} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.info(`Json Input ${jsonInput}`);
    core.debug(new Date().toTimeString())
    await wait(parseInt(jsonInput, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getTableOutputAsJson(jsonInput: string): any {
  const cypressJsonResult: CypressResult = JSON.parse(jsonInput);
  const testResult: Result[] = cypressJsonResult.results;

  testResult.map((result: Result) => {
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
      }, 0)
    }
  })

  return {}
}

run()
