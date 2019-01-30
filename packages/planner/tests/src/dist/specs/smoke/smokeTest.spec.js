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
const planner_1 = require("../../page_objects/planner");
const support = require("../../support");
/* Smoke Tests */
describe('Planner Smoke Tests:', () => {
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
    it('create a work item and add/remove assignee', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem1 = {
            title: 'Workitem Title',
            description: 'Describes the work item',
        }, user1 = process.env.USER_FULLNAME;
        yield planner.createWorkItem(newWorkItem1);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem1.title)).toBeTruthy();
        yield planner.workItemList.clickWorkItem(newWorkItem1.title);
        yield planner.quickPreview.addAssignee(user1 + ' (me)');
        expect(yield planner.quickPreview.getAssignees()).toContain(user1);
        yield planner.quickPreview.close();
        yield planner.workItemList.clickWorkItem(newWorkItem1.title);
        yield protractor_1.browser.sleep(2000);
        yield planner.quickPreview.removeAssignee(user1 + ' (me)');
        expect(yield planner.quickPreview.getAssignees()).not.toContain(user1);
        yield planner.quickPreview.close();
    }));
    it('update workitem title/description', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem2 = { title: 'Workitem Title 1' }, updatedWorkItem = {
            title: 'New Workitem Title',
            description: 'New WorkItem Description',
        };
        yield planner.createWorkItem(newWorkItem2);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem2.title)).toBeTruthy();
        yield planner.workItemList.clickWorkItem(newWorkItem2.title);
        yield planner.quickPreview.updateTitle(updatedWorkItem.title);
        yield planner.quickPreview.close();
        yield planner.workItemList.clickWorkItem(updatedWorkItem.title);
        yield planner.quickPreview.updateDescription(updatedWorkItem.description);
        expect(yield planner.quickPreview.getDescription()).toBe(updatedWorkItem.description);
        yield planner.quickPreview.close();
        expect(yield planner.workItemList.hasWorkItem(newWorkItem2.title, true)).toBeFalsy();
        expect(yield planner.workItemList.hasWorkItem(updatedWorkItem.title)).toBeTruthy();
    }));
    it('update of empty workitem title is not allowed', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.updateTitle('');
        expect(yield planner.quickPreview.getTitleError()).toBe('Empty title not allowed');
    }));
    //creator is no more a field in the quick-preview/detail-page as per the new design
    //it might change again so not remmoving the test
    xit('Check WorkItem creator name and image is reflected', () => __awaiter(this, void 0, void 0, function* () {
        let prodAvatar = 'https://avatars0.githubusercontent.com/u/563119?v=3&s=25', prodPreviewAvatar = 'https://www.gravatar.com/avatar/d77d23eebe9907842b8ad9f1d9905454.jpg&s=25', workItemTitle2 = 'Workitem_Title_2', user1 = process.env.USER_FULLNAME;
        yield planner.workItemList.clickWorkItem(workItemTitle2);
        yield planner.quickPreview.ready();
        /* Run tests against production or prod-preview */
        let url = yield protractor_1.browser.getCurrentUrl();
        if (url.startsWith('https://openshift.io')) {
            expect(yield planner.quickPreview.getCreatorAvatar()).toBe(prodAvatar);
        }
        else if (url.startsWith('https://prod-preview.openshift.io/')) {
            expect(yield planner.quickPreview.getCreatorAvatar()).toBe(prodPreviewAvatar);
        }
        else {
            expect(yield planner.quickPreview.getCreatorAvatar()).toBe(c.user_avatar);
        }
        expect(yield planner.quickPreview.getCreator()).toBe(user1);
        yield planner.quickPreview.close();
    }));
    it('Associate workitem with an Area', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.addArea(c.dropdownareaTitle1);
        expect(yield planner.quickPreview.getArea()).toBe(c.areaTitle1);
        yield planner.quickPreview.close();
        yield planner.workItemList.clickWorkItem(title);
        expect(yield planner.quickPreview.getArea()).toBe(c.areaTitle1);
        yield planner.quickPreview.addArea(c.dropdownareaTitle2);
        expect(yield planner.quickPreview.getArea()).not.toBe(c.areaTitle1);
        expect(yield planner.quickPreview.getArea()).toBe(c.areaTitle2);
        yield planner.quickPreview.close();
    }));
    it('Associate/Re-associate workitem with an Iteration', () => __awaiter(this, void 0, void 0, function* () {
        //add new iteration
        let title = yield planner.createUniqueWorkItem(), randomText = 'zxz';
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.addIteration(c.dropdownIteration1);
        expect(yield planner.quickPreview.getIteration()).toBe(c.iteration1);
        yield planner.quickPreview.close();
        //update iteration
        yield planner.workItemList.clickWorkItem(title);
        expect(yield planner.quickPreview.getIteration()).toBe(c.iteration1);
        yield planner.quickPreview.addIteration(c.dropdownIteration_2);
        expect(yield planner.quickPreview.getIteration()).toBe(c.iteration2);
        //search iteration
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.typeaHeadSearch(randomText);
        expect(yield planner.quickPreview.iterationDropdown.menu.getTextWhenReady()).toBe('No matches found.');
        yield planner.quickPreview.iterationDropdownCloseButton.clickWhenReady();
        yield planner.quickPreview.iterationDropdown.clickWhenReady();
        expect(yield planner.quickPreview.iterationDropdown.menu.getTextWhenReady()).not.toBe('No matches found.');
    }));
    it('Edit Comment and Save', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem3 = { title: 'New Workitem' }, comment = 'new comment';
        yield planner.createWorkItem(newWorkItem3);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem3.title)).toBeTruthy();
        yield planner.workItemList.clickWorkItem(newWorkItem3.title);
        yield planner.quickPreview.addCommentAndSave(comment);
        expect(yield planner.quickPreview.getComments()).toContain(comment);
    }));
    it('Edit Comment and Cancel', () => __awaiter(this, void 0, void 0, function* () {
        let comment = 'new comment', title = yield planner.createUniqueWorkItem();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.addCommentAndCancel(comment);
        expect(yield planner.quickPreview.getComments()).not.toContain('new comment');
    }));
    it('Create custom query', () => __awaiter(this, void 0, void 0, function* () {
        yield planner.sidePanel.clickWorkItemGroup();
        yield planner.workItemList.overlay.untilHidden();
        yield planner.header.selectFilter('State', c.stateInProgress);
        yield planner.workItemList.overlay.untilHidden();
        yield planner.header.saveFilters('Query 1');
        yield planner.workItemList.overlay.untilHidden();
        yield planner.sidePanel.customQuery.untilTextIsPresent('Query 1');
        expect(yield planner.sidePanel.getMyFiltersList()).toContain('Query 1');
    }));
    it('Delete custom query', () => __awaiter(this, void 0, void 0, function* () {
        yield planner.sidePanel.clickWorkItemGroup();
        yield planner.workItemList.overlay.untilHidden();
        yield planner.header.selectFilter('State', c.stateResolved);
        yield planner.workItemList.overlay.untilHidden();
        yield planner.header.saveFilters('My filter');
        yield planner.workItemList.overlay.untilHidden();
        yield planner.sidePanel.customQuery.untilTextIsPresent('My filter');
        expect(yield planner.sidePanel.getMyFiltersList()).toContain('My filter');
        yield planner.sidePanel.selectcustomFilterKebab('My filter');
        yield planner.sidePanel.deleteCustomQuery.clickWhenReady();
        yield planner.confirmModalButton.clickWhenReady();
        yield protractor_1.browser.sleep(1000);
        expect(yield planner.sidePanel.getMyFiltersList()).not.toContain('My filter');
    }));
    it('Update work item with a label and validate description', () => __awaiter(this, void 0, void 0, function* () {
        let title = yield planner.createUniqueWorkItem();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.updateDescription('My new description');
        yield planner.quickPreview.createNewLabel('Validate description label');
        expect(yield planner.quickPreview.getLabels()).toContain('Validate description label');
        yield planner.quickPreview.close();
        yield planner.workItemList.clickWorkItem(title);
        yield planner.quickPreview.addLabel('Validate description label', true);
        expect(yield planner.quickPreview.getDescription()).toBe('My new description');
        yield planner.quickPreview.close();
    }));
    it('Create a work item and Open detail page', () => __awaiter(this, void 0, void 0, function* () {
        yield planner.quickAdd.addAndOpenWorkItem(c.workitem);
        yield planner.waitUntilUrlContains('detail');
        yield planner.detailPage.titleInput.untilTextIsPresentInValue('new detail workItem');
        yield planner.detailPage.closeButton.ready();
        expect(yield protractor_1.browser.getCurrentUrl()).toContain('detail');
        yield planner.detailPage.close();
        yield planner.waitUntilUrlContains('typegroup');
        expect(yield planner.workItemList.hasWorkItem('new detail workItem')).toBeTruthy();
    }));
    it('Add new work-item to the selected iteration', () => __awaiter(this, void 0, void 0, function* () {
        yield planner.workItemList.overlay.untilHidden();
        yield planner.sidePanel.clickIteration('Iteration_1');
        yield planner.workItemList.overlay.untilHidden();
        yield planner.quickAdd.addWorkItem({ title: 'Add new work item to iteration test' });
        expect(yield planner.workItemList.hasWorkItem('Add new work item to iteration test')).toBeTruthy();
        yield planner.sidePanel.clickWorkItemGroup();
        yield planner.workItemList.overlay.untilHidden();
        yield planner.sidePanel.clickIteration('Iteration_1');
        expect(yield planner.workItemList.hasWorkItem('Add new work item to iteration test')).toBeTruthy();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21va2VUZXN0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcGVjcy9zbW9rZS9zbW9rZVRlc3Quc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXFDO0FBQ3JDLHdEQUF5RDtBQUN6RCx5Q0FBeUM7QUFFekMsaUJBQWlCO0FBRWpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsSUFBSSxPQUFvQixDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWhDLFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDbkIsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEdBQUcsSUFBSSxxQkFBVyxDQUFDLG9CQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxHQUFTLEVBQUU7UUFDcEIsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLEdBQVMsRUFBRTtRQUNuQixNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQVMsRUFBRTtRQUMxRCxJQUFJLFlBQVksR0FBRztZQUNmLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsV0FBVyxFQUFFLHlCQUF5QjtTQUN2QyxFQUNELEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUNwQyxNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEYsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsTUFBTSxvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RSxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFTLEVBQUU7UUFDakQsSUFBSSxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsRUFDOUMsZUFBZSxHQUFHO1lBQ2hCLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsV0FBVyxFQUFFLDBCQUEwQjtTQUN4QyxDQUFDO1FBQ0osTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hGLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckYsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckYsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFTLEVBQUU7UUFDN0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JGLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxtRkFBbUY7SUFDbkYsaURBQWlEO0lBQ2pELEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxHQUFTLEVBQUU7UUFDbkUsSUFBSSxVQUFVLEdBQUcsMERBQTBELEVBQ3pFLGlCQUFpQixHQUNmLDJFQUEyRSxFQUM3RSxjQUFjLEdBQUcsa0JBQWtCLEVBQ25DLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUNwQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxrREFBa0Q7UUFDbEQsSUFBSSxHQUFHLEdBQUcsTUFBTSxvQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQzFDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN4RTthQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFO1lBQy9ELE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQy9FO2FBQU07WUFDTCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFTLEVBQUU7UUFDL0MsSUFBSSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRW5DLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUUsR0FBUyxFQUFFO1FBQ2pFLG1CQUFtQjtRQUNuQixJQUFJLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxFQUM5QyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRSxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkMsa0JBQWtCO1FBQ2xCLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyRSxrQkFBa0I7UUFDbEIsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQy9FLG1CQUFtQixDQUNwQixDQUFDO1FBQ0YsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM5RCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FDbkYsbUJBQW1CLENBQ3BCLENBQUM7SUFDSixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVCQUF1QixFQUFFLEdBQVMsRUFBRTtRQUNyQyxJQUFJLFlBQVksR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsRUFDMUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUMxQixNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEYsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFTLEVBQUU7UUFDdkMsSUFBSSxPQUFPLEdBQUcsYUFBYSxFQUN6QixLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMvQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQVMsRUFBRTtRQUNuQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM3QyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pELE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5RCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pELE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQVMsRUFBRTtRQUNuQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM3QyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pELE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pELE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRSxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNELE1BQU0sT0FBTyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xELE1BQU0sb0JBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEdBQVMsRUFBRTtRQUN0RSxJQUFJLEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2pELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbkUsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN2RixNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvRSxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFTLEVBQUU7UUFDdkQsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDckYsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxNQUFNLENBQUMsTUFBTSxvQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckYsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxHQUFTLEVBQUU7UUFDM0QsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakQsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxxQ0FBcUMsRUFBRSxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUNKLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMscUNBQXFDLENBQUMsQ0FDOUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNmLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzdDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakQsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQ0osTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUM5RSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9