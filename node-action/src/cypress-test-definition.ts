export interface CypressResult {
  stats: Stats
  results: Result[]
  meta: Meta
}

export interface Meta {
  mocha: Mocha
  mochawesome: Mochawesome
  marge: Marge
}

export interface Marge {
  options: MargeOptions
  version: string
}

export interface MargeOptions {
  reportDir: string
  overwrite: boolean
  html: boolean
  json: boolean
}

export interface Mocha {
  version: string
}

export interface Mochawesome {
  options: MochawesomeOptions
  version: string
}

export interface MochawesomeOptions {
  quiet: boolean
  reportFilename: string
  saveHtml: boolean
  saveJson: boolean
  consoleReporter: string
  useInlineDiffs: boolean
  code: boolean
}

export interface Result {
  uuid: string
  title: string
  fullFile: string
  file: string
  beforeHooks: Function[]
  afterHooks: Function[]
  tests: Test[]
  suites: Result[]
  passes: string[]
  failures: string[]
  pending: string[]
  skipped: string[]
  duration: number
  root: boolean
  rootEmpty: boolean
  _timeout: number
}

export interface Test {
  title: string
  fullTitle: string
  timedOut: null
  duration: number
  state: 'failed' | 'pending' | 'skipped' | 'pass'
  speed: null
  pass: boolean
  fail: boolean
  pending: boolean
  context: null
  code: string
  err: Err
  uuid: string
  parentUUID: string
  isHook: boolean
  skipped: boolean
}

export interface Err {
  message?: string
  estack?: string
  diff?: null
}

export interface Stats {
  suites: number
  tests: number
  passes: number
  pending: number
  failures: number
  testsRegistered: number
  passPercent: number
  pendingPercent: number
  other: number
  hasOther: boolean
  skipped: number
  hasSkipped: boolean
  start: Date
  end: Date
  duration: number
}
