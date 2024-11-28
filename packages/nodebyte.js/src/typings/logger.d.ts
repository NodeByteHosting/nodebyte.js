import { Debugger } from 'debug'

export interface ExtendedDebugger extends Debugger {
    useColors?: () => boolean
    useDebugger?: boolean
}

export interface LoggerOptions {
    namespace: string
    useColors?: boolean
    useDebugger?: boolean
}
