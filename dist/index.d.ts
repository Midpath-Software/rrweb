import { LogData } from '@rrweb/rrweb-plugin-console-record';
import { LogLevel } from '@rrweb/rrweb-plugin-console-record';
import { ReplayPlugin } from 'rrweb';

export declare const getReplayConsolePlugin: (options?: LogReplayConfig) => ReplayPlugin;

declare type LogReplayConfig = {
    level?: LogLevel[];
    replayLogger?: ReplayLogger;
};

declare type ReplayLogger = Partial<Record<LogLevel, (data: LogData) => void>>;

export { }
