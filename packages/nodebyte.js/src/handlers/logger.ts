import chalk from 'chalk'
import debug from 'debug'
import moment from 'moment'
import { ExtendedDebugger, LoggerOptions } from '../typings/logger'
import { useDebugger } from '../functions/createDebugger'

export default class Logger {
    private debugger: ExtendedDebugger
    private logLevels: Record<
        string,
        { prefix: string; logFunction: (...args: any[]) => void; debugFunction: ExtendedDebugger }
    >

    constructor(options: LoggerOptions) {
        this.debugger = useDebugger(options.namespace, options.useColors)

        if (options.useDebugger) {
            this.debugger = this.debugger.extend('debug')
        }

        this.logLevels = {
            info: {
                prefix: chalk.blue('[INFO]'),
                logFunction: console.log,
                debugFunction: this.debugger.extend('info') || this.debugger.extend('info')
            },
            error: {
                prefix: chalk.red('[ERROR]'),
                logFunction: console.error,
                debugFunction: this.debugger.extend('error') || this.debugger.extend('error')
            },
            debug: {
                prefix: chalk.magenta('[DEBUG]'),
                logFunction: console.log,
                debugFunction: this.debugger.extend('debug') || this.debugger.extend('debug')
            },
            warn: {
                prefix: chalk.yellow('[WARNING]'),
                logFunction: console.warn,
                debugFunction: this.debugger.extend('warn') || this.debugger.extend('warn')
            },
            done: {
                prefix: chalk.green('[SUCCESS]'),
                logFunction: console.log,
                debugFunction: this.debugger.extend('done') || this.debugger.extend('done')
            }
        }
    }

    log(message: string, level: keyof typeof this.logLevels = 'info', ...args: any[]) {
        const selected = this.logLevels[level] || this.logLevels['info']
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
        const formatted = `${selected.prefix} [${timestamp}] ${message}`

        selected.logFunction(formatted, ...args)
        selected.debugFunction(message, ...args)
    }
}
