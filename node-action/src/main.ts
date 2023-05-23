import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    core.setOutput('mardownResult', 'node ran successfully')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
