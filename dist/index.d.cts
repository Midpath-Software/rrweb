import { ReplayPlugin } from 'rrweb';
import { SequentialIdOptions } from '@rrweb/rrweb-plugin-sequential-id-record';

export declare const getReplaySequentialIdPlugin: (options?: Partial<Options>) => ReplayPlugin;

declare type Options = SequentialIdOptions & {
    warnOnMissingId: boolean;
};

export { }
