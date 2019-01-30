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
describe('Detail View test: ', () => {
    let planner;
    let c = new support.Constants();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        planner = new planner_1.PlannerPage(protractor_1.browser.baseUrl);
        yield planner.openInBrowser();
        yield planner.waitUntilUrlContains('typegroup');
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield planner.waitUntilUrlContains('typegroup');
        yield planner.ready();
        yield planner.workItemList.overlay.untilHidden();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield planner.quickPreview.close();
    }));
    it('should open detail view and apply label', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'detail page test' }, label = 'sample_label_1';
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.openDetailPage(workitemname.title);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workitemname.title);
        yield planner.detailPage.addLabel(label);
        expect(yield planner.detailPage.getLabels()).toContain(label);
    }));
    it('should update title and description', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'detail page title test' }, updatedWorkItem = {
            title: 'detail page title updated',
            description: 'New WorkItem Description',
        };
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.openDetailPage(workitemname.title);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workitemname.title);
        yield planner.detailPage.updateTitle(updatedWorkItem.title);
        yield planner.detailPage.updateDescription(updatedWorkItem.description);
        expect(yield planner.detailPage.titleInput.getAttribute('value')).toBe(updatedWorkItem.title);
        expect(yield planner.detailPage.getDescription()).toBe(updatedWorkItem.description);
    }));
    it('should associate workitem with an Area', () => __awaiter(this, void 0, void 0, function* () {
        let workItemTitle2 = 'Workitem_Title_2';
        yield planner.workItemList.openDetailPage(workItemTitle2);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workItemTitle2);
        yield planner.detailPage.addArea(c.dropdownareaTitle1);
        expect(yield planner.detailPage.getArea()).toBe(c.areaTitle1);
    }));
    it('should associate workitem with an Iteration', () => __awaiter(this, void 0, void 0, function* () {
        let workItemTitle2 = 'Workitem_Title_2';
        yield planner.workItemList.openDetailPage(workItemTitle2);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workItemTitle2);
        yield planner.detailPage.addIteration(c.dropdownIteration1);
        expect(yield planner.detailPage.getIteration()).toBe(c.iteration1);
    }));
    it('should add comment', () => __awaiter(this, void 0, void 0, function* () {
        let workItemTitle2 = 'Workitem_Title_2', comment = 'new comment';
        yield planner.workItemList.openDetailPage(workItemTitle2);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workItemTitle2);
        yield planner.detailPage.addCommentAndSave(comment);
        expect(yield planner.detailPage.getComments()).toContain(comment);
    }));
    it('should link a workitem', () => __awaiter(this, void 0, void 0, function* () {
        let linkType = 'blocks', workItemTitle2 = 'Workitem_Title_2';
        yield planner.workItemList.openDetailPage(workItemTitle2);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workItemTitle2);
        /* Adding link b/w workItemTitle2 and Workitem_Title_3 */
        yield planner.detailPage.addLink(linkType, c.Workitem_Title_3);
        expect(yield planner.detailPage.getLinkedItems()).toContain(c.Workitem_Title_3);
    }));
    it('should remove link from workitem', () => __awaiter(this, void 0, void 0, function* () {
        let workItemName1 = { title: 'Remove_link_from_workitem_test' }, linkType = 'blocks';
        yield planner.createWorkItem(workItemName1);
        yield planner.workItemList.openDetailPage(workItemName1.title);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workItemName1.title);
        yield planner.detailPage.addLink(linkType, c.Workitem_Title_4);
        expect(yield planner.detailPage.getLinkedItems()).toContain(c.Workitem_Title_4);
        yield planner.detailPage.removeLink(c.Workitem_Title_4);
        yield planner.detailPage.linkCount.untilTextIsPresent('0');
        expect(yield planner.detailPage.linkCount.getTextWhenReady()).toBe('0');
    }));
    it('should change the state of workitem', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'change state test' };
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.openDetailPage(workitemname.title);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workitemname.title);
        yield planner.detailPage.changeStateTo(c.stateOpen);
        expect(yield planner.detailPage.getState()).toBe(c.stateOpen);
    }));
    it('Should change the type of work item', () => __awaiter(this, void 0, void 0, function* () {
        let workitemname = { title: 'change type test' };
        yield planner.createWorkItem(workitemname);
        yield planner.workItemList.openDetailPage(workitemname.title);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue(workitemname.title);
        yield planner.detailPage.changeTypeTo(c.typeIssue);
        expect(yield planner.detailPage.getType()).toBe(c.typeIssue);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsUGFnZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3BlY3MvZGV0YWlsUGFnZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUM7QUFDckMscURBQXNEO0FBQ3RELHNDQUFzQztBQUV0QyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLElBQUksT0FBb0IsQ0FBQztJQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVoQyxTQUFTLENBQUMsR0FBUyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakMsT0FBTyxHQUFHLElBQUkscUJBQVcsQ0FBQyxvQkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzlCLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBUyxFQUFFO1FBQ3BCLE1BQU0sT0FBTyxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RCLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDbkIsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBUyxFQUFFO1FBQ3ZELElBQUksWUFBWSxHQUFHLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEVBQzlDLEtBQUss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