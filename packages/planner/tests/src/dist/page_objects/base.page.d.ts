export declare enum PageOpenMode {
    AlreadyOpened = 0,
    RefreshBrowser = 1
}
export declare abstract class BasePage {
    name: string;
    log: (action: string, ...msg: string[]) => void;
    debug: (context: string, ...msg: string[]) => void;
    protected url: string | undefined;
    constructor(url?: string);
    ready(): Promise<void>;
    open(mode?: PageOpenMode): Promise<BasePage>;
    openInBrowser(): Promise<void>;
    waitUntilUrlContains(text: string, timeout?: number): Promise<void>;
    waitUntilTitleContains(title: string): Promise<void>;
}
