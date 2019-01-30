import { ElementFinder } from 'protractor';
import { BaseElement } from './base.element';
import { Checkbox } from './checkbox';
export declare class MultipleSelectionList extends BaseElement {
    list: BaseElement;
    constructor(element: ElementFinder, name?: string);
    ready(): Promise<void>;
    item(text: string): Checkbox;
    select(text: string): Promise<void>;
}
