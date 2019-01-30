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
describe('Quick preview tests: ', () => {
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
    it('should open quickpreview and apply label', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem(), label = 'sample_label_1';
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.addLabel(label);
        yield planner.detailPage.labelListDiv.untilCount(1);
        expect(yield planner.quickPreview.getLabels()).toContain(label);
    }));
    it('should open quickpreview and create new label', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'test labels' }, newLabel = 'new label';
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.clickWorkItem(workitemname.title);
        yield planner.quickPreview.createNewLabel(newLabel);
        yield planner.detailPage.labelListDiv.untilCount(1);
        expect(yield planner.quickPreview.getLabels()).toContain(newLabel);
    }));
    it('should open quickpreview and create new label using Enter Key', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'text labels' };
        let newLabel = 'Enter Key Label';
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.clickWorkItem(workitemname.title);
        yield planner.quickPreview.createNewLabel(newLabel, true);
        expect(yield planner.quickPreview.getLabels()).toContain(newLabel);
    }));
    it('should link a workitem', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'link test' }, linkType = 'blocks';
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.clickWorkItem(workitemname.title);
        yield planner.quickPreview.addLink(linkType, c.Workitem_Title_4);
        yield planner.quickPreview.linklistItem.untilTextIsPresent(c.Workitem_Title_4);
        expect(yield planner.quickPreview.getLinkedItems()).toContain(c.Workitem_Title_4);
    }));
    it('should open quick preview and edit the title', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem(), editWorkItemTitle1 = 'Title Text "<0>"';
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.updateTitle(editWorkItemTitle1);
        expect(yield planner.quickPreview.titleInput.getAttribute('value')).toBe('Title Text "<0>"');
    }));
    it('description box should not be open for wis', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'quickpreview test' };
        let workitemname2 = { title: 'description box should not be open' };
        yield planner.createWorkItem(workitemname);
        yield planner.createWorkItem(workitemname2);
        yield planner.workItemList.clickWorkItem(workitemname.title);
        yield planner.quickPreview.openDescriptionBox();
        expect(yield planner.quickPreview.isSaveButtonDisplayed()).toBeTruthy();
        // Open another WI(Note: the description box is still in edit mode)
        yield planner.workItemList.clickWorkItem(workitemname2.title);
        // The description box should not be in edit mode
        expect(yield planner.quickPreview.isSaveButtonDisplayed()).toBeFalsy();
    }));
    it('should close assignee dropdown when clicked outside', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'close assignee dropdown' };
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.clickWorkItem(workitemname.title);
        yield planner.quickPreview.assigneeDropdown.clickWhenReady();
        expect(yield planner.quickPreview.assigneeDropdownMenu.getAttribute('className')).toContain('show');
        yield planner.quickPreview.titleInput.clickWhenReady();
        expect(yield planner.quickPreview.assigneeDropdownMenu.getAttribute('className')).not.toContain('show');
    }));
    it('Should not close description box on outside click if the description is changed', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'close description box on outside click' };
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.clickWorkItem(workitemname.title);
        yield planner.quickPreview.openDescriptionBox();
        expect(yield planner.quickPreview.isSaveButtonDisplayed()).toBeTruthy();
        yield planner.quickPreview.descriptionTextarea.enterText('test');
        yield planner.quickPreview.titleInput.clickWhenReady();
        expect(yield planner.quickPreview.isSaveButtonDisplayed()).toBeTruthy();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2tQcmV2aWV3LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcGVjcy9xdWlja1ByZXZpZXcuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXFDO0FBQ3JDLHFEQUFzRDtBQUN0RCxzQ0FBc0M7QUFFdEMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtJQUNyQyxJQUFJLE9BQW9CLENBQUM7SUFDekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFaEMsU0FBUyxDQUFDLEdBQVMsRUFBRTtRQUNuQixNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxJQUFJLHFCQUFXLENBQUMsb0JBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLEdBQVMsRUFBRTtRQUNwQixNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25ELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBUyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELElBQUksS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQzlDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztRQUMzQixNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxD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