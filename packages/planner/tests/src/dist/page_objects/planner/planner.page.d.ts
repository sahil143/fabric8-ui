import { AppPage } from '../app.page';
import * as planner from './../../ui/planner';
export declare class PlannerPage extends AppPage {
    workItemList: planner.WorkItemList;
    quickAdd: planner.WorkItemQuickAdd;
    inlineQuickAdd: planner.WorkItemInlineQuickAdd;
    sidePanel: planner.SidePanel;
    quickPreview: planner.WorkItemQuickPreview;
    header: planner.ToolbarHeader;
    settings: planner.Settings;
    iteration: planner.Iteration;
    detailPage: planner.WorkItemDetailPage;
    confirmModalButton: planner.WorkItemList;
    query: planner.Query;
    modal: planner.ModalDialog;
    constructor(url: string);
    ready(): Promise<void>;
    createWorkItem(item: planner.WorkItem): Promise<void>;
    createUniqueWorkItem(): Promise<string>;
    createInlineWorkItem(item: planner.WorkItem): Promise<void>;
    resetState(): Promise<void>;
}
