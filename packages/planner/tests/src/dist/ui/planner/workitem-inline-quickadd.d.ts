import { ElementFinder } from 'protractor';
import * as ui from '../../ui';
import { WorkItem } from './index';
export declare class WorkItemInlineQuickAdd extends ui.BaseElement {
    titleTextInlineInput: ui.TextInput;
    buttonsDiv: ElementFinder;
    addInlineQuickAddButton: ui.Button;
    workItemTypeDropdown: ui.Dropdown;
    constructor(el: ElementFinder, name?: string);
    ready(): Promise<void>;
    addInlineWorkItem({ title, description, type }: WorkItem): Promise<void>;
    workItemTypes(): Promise<string[]>;
}
