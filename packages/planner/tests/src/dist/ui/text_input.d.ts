import { ElementFinder } from 'protractor';
import { BaseElement } from './base.element';
export declare class TextInput extends BaseElement {
    constructor(element: ElementFinder, name?: string);
    enterText(text: string): Promise<void>;
    pressEnter(): Promise<void>;
}
