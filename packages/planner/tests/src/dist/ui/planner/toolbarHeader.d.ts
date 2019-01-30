import { ElementFinder } from 'protractor';
import * as ui from '../../ui';
import { BaseElement } from './../base.element';
import { WorkItemList } from './workitem-list';
export declare class ToolbarHeader extends BaseElement {
    notificationToast: ui.BaseElementArray;
    header: ui.BaseElement;
    showTree: ui.BaseElement;
    filterDropdown: ui.Dropdown;
    selectFilterCondition: ui.Dropdown;
    private clearAllFilter;
    showCompleted: ui.BaseElement;
    saveFilter: ui.Clickable;
    saveFilterDialog: ui.BaseElement;
    saveFilterBtn: ui.Button;
    closeBtn: ui.Button;
    titleTextInput: ui.TextInput;
    activeFiltersList: ui.BaseElementArray;
    workItemList: WorkItemList;
    constructor(el: ElementFinder, name?: string);
    ready(): Promise<void>;
    clickShowTree(): Promise<void>;
    selectFilter(Label: string, LabelTest: string): Promise<void>;
    clickClearAllFilters(): Promise<void>;
    clickShowCompleted(): Promise<void>;
    saveFilters(title: string): Promise<void>;
    getFilterConditions(): Promise<String>;
}
