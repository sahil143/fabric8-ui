"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const planner_1 = require("../page_objects/planner");
const support = require("../support");
describe('Work Item datatable list: ', () => {
    let planner;
    let c = new support.Constants();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        planner = new planner_1.PlannerPage(protractor_1.browser.baseUrl);
        yield planner.openInBrowser();
        yield planner.waitUntilUrlContains('typegroup');
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield planner.ready();
        yield planner.workItemList.overlay.untilHidden();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield planner.resetState();
    }));
    it('should open settings button and hide columns', () => __awaiter(this, void 0, void 0, function* () {
        let attribute1 = 'Iteration', attribute2 = 'Label', attribute3 = 'Creator', attribute4 = 'Assignees';
        expect(yield planner.workItemList.getDataTableHeaderCellCount()).toBe(9);
        yield planner.settings.clickSettings();
        yield planner.settings.selectAttribute(attribute1);
        yield planner.settings.moveToAvailableAttribute();
        expect(yield planner.workItemList.getDataTableHeaderCellCount()).toBe(8);
        yield planner.settings.clickSettings();
        yield planner.settings.selectAttribute(attribute1);
        yield planner.settings.moveToDisplayedAttribute();
        expect(yield planner.workItemList.getDataTableHeaderCellCount()).toBe(9);
    }));
    it('quick add should be disable for flat view', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem();
        yield planner.header.clickShowTree();
        yield protractor_1.browser.sleep(2000);
        yield planner.workItemList.overlay.untilHidden();
        expect(yield planner.workItemList.getInlineQuickAddClass(title)).toContain('disable');
        yield planner.header.clickShowTree();
    }));
    it('should filter work item by type', () => __awaiter(this, void 0, void 0, function* () {
        yield planner.header.selectFilter('Type', c.type);
        expect(yield planner.header.getFilterConditions()).toContain(c.workItemTypeFilter);
    }));
    it('hideTree and create a work item then work item should be displayed when show tree is selected', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem1 = { title: 'New WorkItem' };
        yield planner.header.clickShowTree();
        yield planner.workItemList.overlay.untilHidden();
        yield planner.createWorkItem(newWorkItem1);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem1.title)).toBeTruthy();
        yield planner.header.clickShowTree();
        expect(yield planner.workItemList.hasWorkItem(newWorkItem1.title)).toBeTruthy();
    }));
    it('check show completed and create a work item then update status to closed and uncheck show completed then work item should not visible in list', () => __awaiter(this, void 0, void 0, function* () {
        yield planner.header.clickShowCompleted();
        yield planner.workItemList.overlay.untilHidden();
        let newWorkItem = {
            title: 'Check for show complete work item',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        yield planner.workItemList.clickWorkItem(newWorkItem.title);
        yield planner.quickPreview.changeStateTo(c.stateClosed);
        yield planner.quickPreview.close();
        yield planner.header.clickShowCompleted();
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title, true)).toBeFalsy();
    }));
    it('work item should show updated title when switching from flat to tree view', () => __awaiter(this, void 0, void 0, function* () {
        let updatedWorkItem = {
            title: 'test show updated work item',
        };
        let title = yield planner.createUniqueWorkItem();
        yield planner.header.clickShowTree();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.titleInput.untilTextIsPresentInValue(title);
        yield planner.quickPreview.updateTitle(updatedWorkItem.title);
        yield planner.quickPreview.titleInput.untilTextIsPresentInValue(updatedWorkItem.title);
        yield planner.quickPreview.close();
        expect(yield planner.workItemList.hasWorkItem(updatedWorkItem.title)).toBeTruthy();
        yield planner.header.clickShowTree();
        expect(yield planner.workItemList.hasWorkItem(updatedWorkItem.title)).toBeTruthy();
    }));
    it('list should not update when new label is added', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem(), newLabel1 = 'new label 1', LabelTestTitle = {
            title: 'test list is not updated when new label is added',
        };
        expect(yield planner.workItemList.hasWorkItem(title)).toBeTruthy();
        yield planner.workItemList.workItem(title).clickInlineQuickAdd();
        yield planner.createInlineWorkItem(LabelTestTitle);
        expect(yield planner.workItemList.hasWorkItem(LabelTestTitle.title)).toBeTruthy();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.createNewLabel(newLabel1);
        yield planner.quickPreview.close();
        expect(yield planner.workItemList.hasWorkItem(LabelTestTitle.title)).toBeTruthy();
    }));
    it('list should not update when new iteration is added', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem(), newIteration1 = 'new Iteration 1', childWorkItem = {
            title: 'test list is not updated when new iteration is added',
            type: c.childType,
        };
        expect(yield planner.workItemList.hasWorkItem(title)).toBeTruthy();
        yield planner.workItemList.workItem(title).clickInlineQuickAdd();
        yield planner.createInlineWorkItem(childWorkItem);
        expect(yield planner.workItemList.hasWorkItem(childWorkItem.title)).toBeTruthy();
        yield planner.sidePanel.createNewIteration();
        yield planner.iteration.addNewIteration(newIteration1, c.rootIteration);
        yield planner.iteration.clickCreateIteration();
        expect(yield planner.workItemList.hasWorkItem(childWorkItem.title)).toBeTruthy();
    }));
    it('clicking on label should filter the workitem list by label', () => __awaiter(this, void 0, void 0, function* () {
        let label = 'sample_label_1', labelFilter = 'label: sample_label_1', workItemTitle = { title: 'test clicking on label should filter the workitem list by label' };
        yield planner.sidePanel.clickWorkItemGroup();
        yield planner.createWorkItem(workItemTitle);
        yield planner.workItemList.clickWorkItem(workItemTitle.title);
        yield planner.quickPreview.addLabel(label);
        yield planner.quickPreview.close();
        yield planner.workItemList.clickWorkItemLabel(workItemTitle.title);
        expect(yield planner.header.getFilterConditions()).toContain(labelFilter);
        yield planner.header.clickShowTree();
        expect(yield planner.header.getFilterConditions()).toContain(labelFilter);
    }));
    it('should update the workitem List on workitem edit', () => __awaiter(this, void 0, void 0, function* () {
        let workitem = { title: 'TITLE_TEXT' };
        yield planner.header.selectFilter('State', c.stateNew);
        yield planner.createWorkItem(workitem);
        yield planner.workItemList.clickWorkItem(workitem.title);
        yield planner.quickPreview.changeStateTo(c.stateOpen);
        yield planner.quickPreview.close();
        expect(yield planner.workItemList.isTitleTextBold(workitem.title)).not.toContain('bold');
    }));
    it('should make the title bold based on filter when adding a new workitem', () => __awaiter(this, void 0, void 0, function* () {
        let workitem = { title: 'test title bold test' };
        yield planner.header.selectFilter('State', c.stateNew);
        yield planner.createWorkItem(workitem);
        expect(yield planner.workItemList.hasWorkItem(workitem.title)).toBeTruthy();
        expect(yield planner.workItemList.isTitleTextBold(workitem.title)).toContain('bold');
    }));
    it('should filter the workitem list by Assignee', () => __awaiter(this, void 0, void 0, function* () {
        let labelFilter = 'assignee: Unassigned';
        yield planner.workItemList.overlay.untilHidden();
        let countUnassignedWorkItem = yield planner.workItemList.getUnassignedWorkItemCount(' Unassigned ');
        yield planner.header.selectFilter('Assignee', 'Unassigned');
        yield protractor_1.browser.sleep(1000);
        expect(yield planner.header.getFilterConditions()).toContain(labelFilter);
        expect(yield planner.workItemList.datatableRow.count()).toEqual(countUnassignedWorkItem);
    }));
    it('Should filter the work item by close state', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = {
            title: 'Should filter the work item by close state - xxx',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        yield planner.workItemList.clickWorkItem(newWorkItem.title);
        yield planner.quickPreview.changeStateTo(c.stateClosed);
        yield planner.quickPreview.close();
        yield planner.header.selectFilter('State', c.stateClosed);
        yield planner.workItemList.overlay.untilHidden();
        expect(yield planner.header.getFilterConditions()).toContain(c.filterLabel);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title, true)).toBeTruthy();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya0l0ZW1UYWJsZVRlc3Quc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NwZWNzL3dvcmtJdGVtVGFibGVUZXN0LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFxQztBQUNyQyxxREFBc0Q7QUFDdEQsc0NBQXNDO0FBR3RDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7SUFDMUMsSUFBSSxPQUFvQixDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWhDLFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDbkIsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEdBQUcsSUFBSSxxQkFBVyxDQUFDLG9CQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxHQUFTLEVBQUU7UUFDcEIsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLEdBQVMsRUFBRTtRQUNuQixNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLEdBQVMsRUFBRTtRQUM1RCxJQUFJLFVBQVUsR0FBRyxXQUFXLEVBQzFCLFVBQVUsR0FBRyxPQUFPLEVBQ3BCLFVBQVUsR0FBRyxTQUFTLEVBQ3RCLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFDM0IsTUFB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