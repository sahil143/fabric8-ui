import { ElementFinder } from 'protractor';
import { BaseElement, Clickable } from './base.element';
declare class DropdownItem extends BaseElement {
    constructor(element: ElementFinder, parent: ElementFinder, name?: string);
    ready(): Promise<void>;
    select(): Promise<void>;
}
export declare class DropdownMenu extends BaseElement {
    constructor(element: ElementFinder, name?: string, itemClass?: string);
    item(text: string): DropdownItem;
    ready(): Promise<void>;
}
export declare class Dropdown extends BaseElement {
    menu: DropdownMenu;
    constructor(element: ElementFinder, menuElement: ElementFinder, name?: string, itemClass?: string);
    item(text: string): DropdownItem;
    select(text: string): Promise<void>;
    ready(): Promise<void>;
}
export declare class SingleSelectionDropdown extends Dropdown {
    input: Clickable;
    constructor(element: ElementFinder, menuElement: ElementFinder, name?: string);
    ready(): Promise<void>;
}
export {};
