import { WorkItemList } from './workitem-list';
export declare class Query extends WorkItemList {
    private queryTextInput;
    private createWorkItemButton;
    private createWorkItemMenu;
    private titleTextInput;
    private createButton;
    enterQuery(query: string, append?: boolean): Promise<void>;
    createWorkItem(title: string): Promise<void>;
}
