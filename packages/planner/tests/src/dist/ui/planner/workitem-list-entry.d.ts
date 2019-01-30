import { ElementFinder } from 'protractor';
import * as ui from '../../ui';
export declare class WorkItemListEntry extends ui.BaseElement {
    cellSelector: import("protractor/built/element").ElementArrayFinder;
    inlineQuickAdd: ui.Clickable;
    id: ui.BaseElement;
    type: ui.BaseElement;
    title: ui.Clickable;
    labels: ui.BaseElement;
    inlineCloseButton: ui.Clickable;
    treeExpander: ui.Clickable;
    labelName: ui.Clickable;
    detailIcon: ui.Clickable;
    iteration: ui.BaseElement;
    creator: ui.BaseElement;
    assignees: ui.BaseElement;
    deleteIcon: ui.Clickable;
    constructor(element: ElementFinder, name: string);
    openQuickPreview(): Promise<void>;
    clickInlineQuickAdd(): Promise<void>;
    clickInlineClose(): Promise<void>;
    getInlineQuickAddClass(): Promise<string>;
    clickExpandWorkItem(): Promise<void>;
    getIterationText(): Promise<string>;
    clickLabel(): Promise<void>;
    clickDetailIcon(): Promise<void>;
    clickDeleteIcon(): Promise<void>;
}
