import debug from 'debug'
import { ExtendedDebugger } from '../typings/logger'

export const useDebugger = (namespace: string, useColors: boolean = false): ExtendedDebugger => {
    const Debugger: ExtendedDebugger = debug(namespace) as ExtendedDebugger
    Debugger.useColors = () => useColors
    debug.enable(`${namespace},${namespace}:*`)
    return Debugger
}
