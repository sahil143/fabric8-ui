export declare enum BrowserMode {
    Phone = 0,
    Tablet = 1,
    Desktop = 2
}
export declare const seconds: (n: number) => number;
export declare const minutes: (n: number) => number;
export declare const DEFAULT_WAIT: number;
export declare const LONG_WAIT: number;
export declare const LONGER_WAIT: number;
export declare const LONGEST_WAIT: number;
export declare function setBrowserMode(mode: BrowserMode): Promise<void>;
export declare function desktopTestSetup(): Promise<void>;
export declare function loginWithTokens(): Promise<void>;
export declare function joinURIPath(...args: string[]): any;
/**
 * Write screenshot to file
 * Example usage:
 *   support.writeScreenshot('exception1.png');
 *
 * Ref: http://blog.ng-book.com/taking-screenshots-with-protractor/
 */
export declare function writeScreenshot(filename: string): Promise<void>;
declare function debugEnabled(...msg: any[]): void;
export declare function info(...msg: any[]): void;
export declare const debug: typeof debugEnabled;
export {};
