import { ElementArrayFinder, ElementFinder } from 'protractor';
declare type NumberComparerFn = (x: number) => boolean;
declare type NumberComparer = number | NumberComparerFn;
export interface BaseElementInterface {
    untilDisplayed(wait?: number): Promise<any>;
    untilPresent(wait?: number): Promise<any>;
    untilClickable(wait?: number): Promise<any>;
    clickWhenReady(wait?: number): Promise<any>;
}
export declare class BaseElement extends ElementFinder implements BaseElementInterface {
    name: string;
    log: (action: string, ...msg: string[]) => void;
    debug: (context: string, ...msg: string[]) => void;
    fail: (action: string, ...msg: string[]) => void;
    /**
     * Extend this class, to describe single custom fragment on your page
     *
     * @param {ElementFinder} elementFinder ElementFinder that you want to extend
     * @param {string} name to indentify the element in the logs
     */
    constructor(wrapped: ElementFinder, name?: string);
    untilClickable(timeout?: number): Promise<void>;
    untilPresent(timeout?: number): Promise<void>;
    untilDisplayed(timeout?: number): Promise<void>;
    untilTextIsPresent(text: string, timeout?: number): Promise<void>;
    untilTextIsPresentInValue(text: string, timeout?: number): Promise<void>;
    untilHidden(timeout?: number): Promise<void>;
    untilAbsent(timeout?: number): Promise<void>;
    clickWhenReady(timeout?: number): Promise<void>;
    ready(): Promise<void>;
    private waitFor;
    run(msg: string, fn: () => Promise<any>): Promise<void>;
    getTextWhenReady(timeout?: number): Promise<string>;
    scrollIntoView(): Promise<void>;
}
export declare class BaseElementArray extends ElementArrayFinder {
    log: (action: string, ...msg: string[]) => void;
    debug: (context: string, ...msg: string[]) => void;
    constructor(wrapped: ElementArrayFinder, name?: string);
    untilCount(compare: NumberComparer, wait?: number, msg?: string): Promise<void>;
    ready(count?: number): Promise<void>;
    getTextWhenReady(): Promise<String>;
    untilHidden(): Promise<void>;
}
export declare class Clickable extends BaseElement {
    ready(): Promise<void>;
}
export {};
