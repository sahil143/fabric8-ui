export declare class Logging {
    name: string;
    log(action: string, ...msg: string[]): void;
    debug(context: string, ...msg: string[]): void;
    fail(action: string, ...msg: string[]): void;
}
