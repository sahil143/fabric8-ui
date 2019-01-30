import { ElementFinder } from 'protractor';
import * as ui from '../../ui';
import { WorkItem } from './index';
export declare class WorkItemQuickAdd extends ui.BaseElement {
    workItemListQuickAdd: ui.BaseElement;
    titleTextInput: ui.TextInput;
    buttonsDiv: ElementFinder;
    addButton: ui.Button;
    addAndOpenButton: ui.Button;
    workItemTypeDropdown: ui.Dropdown;
    constructor(el: ElementFinder, name?: string);
    ready(): Promise<void>;
    addWorkItem({ title, description, type }: WorkItem): Promise<void>;
    workItemTypes(): Promise<string[]>;
    addAndOpenWorkItem({ title, description, type }: WorkItem): Promise<void>;
}
