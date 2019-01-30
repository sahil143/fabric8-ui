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
describe('Agile template tests: ', () => {
    let plannerAgile;
    let c = new support.Constants();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        plannerAgile = new planner_1.PlannerPage(protractor_1.browser.baseUrl);
        plannerAgile.openInBrowser();
        yield plannerAgile.waitUntilUrlContains('typegroup.name');
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield plannerAgile.ready();
        yield plannerAgile.workItemList.overlay.untilHidden();
    }));
    it('should have workitem types', () => __awaiter(this, void 0, void 0, function* () {
        let wiTypes = yield plannerAgile.quickAdd.workItemTypes();
        expect(wiTypes.length).toBe(6);
        expect(wiTypes[0]).toBe('Theme');
        expect(wiTypes[1]).toBe('Epic');
        expect(wiTypes[2]).toBe('Story');
        expect(wiTypes[3]).toBe('Task');
        expect(wiTypes[4]).toBe('Defect');
        expect(wiTypes[5]).toBe('Impediment');
        yield plannerAgile.quickAdd.workItemTypeDropdown.clickWhenReady();
    }));
    it('should create a workitem of type defect and update Effort', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Workitem of type Defect', type: 'Defect' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        /* Update Effort */
        yield plannerAgile.workItemList.clickWorkItem(newWorkItem.title);
        yield plannerAgile.quickPreview.updateEffort('3');
        yield plannerAgile.quickPreview.effortTextArea.untilTextIsPresentInValue('3');
        expect(yield plannerAgile.quickPreview.effortTextArea.getAttribute('value')).toBe('3');
        yield plannerAgile.quickPreview.close();
    }));
    it('should create a workitem of type Theme and update Business value', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Workitem of type Theme', type: 'Theme' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        /* Update Business Value */
        yield plannerAgile.workItemList.clickWorkItem(newWorkItem.title);
        yield plannerAgile.quickPreview.updateBusinessValue('Business value for this Theme');
        yield plannerAgile.quickPreview.businessValue.untilTextIsPresentInValue('Business value for this Theme');
        expect(yield plannerAgile.quickPreview.businessValue.getAttribute('value')).toBe('Business value for this Theme');
        yield plannerAgile.quickPreview.close();
    }));
    it('Dynamic fields should not get closed on outside click if the field value is changed', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Workitem of type Story', type: 'Story' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        /* Edit Story Points */
        yield plannerAgile.workItemList.clickWorkItem(newWorkItem.title);
        yield plannerAgile.quickPreview.storyPoints.clickWhenReady();
        expect(yield plannerAgile.quickPreview.isDynamicFieldSaveButtonDisplayed()).toBeTruthy();
        yield plannerAgile.quickPreview.storyPoints.enterText('8');
        yield plannerAgile.quickPreview.labelDropdown.clickWhenReady();
        expect(yield plannerAgile.quickPreview.isDynamicFieldSaveButtonDisplayed()).toBeTruthy();
        yield plannerAgile.quickPreview.close();
    }));
    it('should create a workitem of type THEME and check for the order of child types in dropdown', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Theme 1', type: 'Theme' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        // open the inline quick add for newly created WorkItem
        yield plannerAgile.workItemList.workItem(newWorkItem.title).clickInlineQuickAdd();
        // get the workItem types for inline quick add
        let wiTypes = yield plannerAgile.inlineQuickAdd.workItemTypes();
        expect(wiTypes.length).toBe(3);
        expect(wiTypes[0]).toBe('Epic');
        expect(wiTypes[1]).toBe('Defect');
        expect(wiTypes[2]).toBe('Impediment');
    }));
    it('should create a workitem of type EPIC and check for the order of child types in dropdown', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Epic 1', type: 'Epic' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        // open the inline quick add for newly created WorkItem
        yield plannerAgile.workItemList.workItem(newWorkItem.title).clickInlineQuickAdd();
        // get the workItem types for inline quick add
        let wiTypes = yield plannerAgile.inlineQuickAdd.workItemTypes();
        expect(wiTypes.length).toBe(3);
        expect(wiTypes[0]).toBe('Story');
        expect(wiTypes[1]).toBe('Defect');
        expect(wiTypes[2]).toBe('Impediment');
    }));
    it('should create a workitem of type STORY and check for the order of child types in dropdown', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Story 1', type: 'Story' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        // open the inline quick add for newly created WorkItem
        yield plannerAgile.workItemList.workItem(newWorkItem.title).clickInlineQuickAdd();
        // get the workItem types for inline quick add
        let wiTypes = yield plannerAgile.inlineQuickAdd.workItemTypes();
        expect(wiTypes.length).toBe(3);
        expect(wiTypes[0]).toBe('Task');
        expect(wiTypes[1]).toBe('Defect');
        expect(wiTypes[2]).toBe('Impediment');
    }));
    it('by default Closed work item should not show in list', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = { title: 'Closed work item test', type: 'Theme' };
        yield plannerAgile.createWorkItem(newWorkItem);
        expect(plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        yield plannerAgile.workItemList.clickWorkItem(newWorkItem.title);
        yield plannerAgile.quickPreview.changeStateTo('Closed');
        yield plannerAgile.quickPreview.close();
        yield plannerAgile.header.clickShowCompleted();
        expect(yield plannerAgile.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
        yield plannerAgile.header.clickShowCompleted();
        expect(yield plannerAgile.workItemList.hasWorkItem(newWorkItem.title, true)).toBeFalsy();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdpbGVUZW1wbGF0ZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3BlY3MvYWdpbGVUZW1wbGF0ZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUM7QUFDckMscURBQXNEO0FBQ3RELHNDQUFzQztBQUV0QyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLElBQUksWUFBeUIsQ0FBQztJQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVoQyxTQUFTLENBQUMsR0FBUyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakMsWUFBWSxHQUFHLElBQUkscUJBQVcsQ0FBQyxvQkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixNQUFNLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBUyxFQUFFO1FBQ3BCLE1BQU0sWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLE1BQU0sWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFTLEVBQUU7UUFDMUMsSUFBSSxPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFD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