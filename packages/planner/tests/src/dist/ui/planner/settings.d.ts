import { ElementFinder } from 'protractor';
import * as ui from '../../ui';
export declare class Settings extends ui.BaseElement {
    settingsDropdownDiv: ui.BaseElement;
    settingsDropDown: ui.Dropdown;
    moveToDisplayedAttributeButton: ui.Clickable;
    moveToAvailableAttributeButton: ui.Clickable;
    close: ui.Clickable;
    constructor(el: ElementFinder, name?: string);
    settingready(): Promise<void>;
    clickSettings(): Promise<void>;
    selectAttribute(AttributeValue: string): Promise<void>;
    moveToDisplayedAttribute(): Promise<void>;
    moveToAvailableAttribute(): Promise<void>;
}
