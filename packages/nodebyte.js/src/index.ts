import Logger from './handlers/logger'
import { LoggerOptions } from './typings/logger'

class NodeByteCore {
    logger(options: LoggerOptions): Logger {
        return new Logger(options)
    }
}

const nodebyte = new NodeByteCore()

export default nodebyte

export { Logger, LoggerOptions }
