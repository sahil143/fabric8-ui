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
describe('Planner Collaborator Tests:', () => {
    let planner;
    let planner1;
    let c = new support.Constants();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        planner = new planner_1.PlannerPage(protractor_1.browser.baseUrl);
        yield planner.openInBrowser();
        let url = yield protractor_1.browser.getCurrentUrl();
        let URL = '';
        /* Run tests against production or prod-preview */
        if (url.startsWith('https://openshift.io')) {
            let urlPathName = yield protractor_1.browser.executeScript('return document.location.pathname');
            URL = url.replace(urlPathName, '/rgarg-osiotest1/DO_NOT_DELETE/plan');
        }
        else {
            let urlPathName = yield protractor_1.browser.executeScript('return document.location.pathname');
            URL = url.replace(urlPathName, '/rbajpai-test-preview/DO_NOT_DELETE/plan');
        }
        planner1 = new planner_1.PlannerPage(URL);
        yield protractor_1.browser.get(URL);
        yield planner.waitUntilUrlContains('typegroup');
        yield planner.waitUntilTitleContains('Plan');
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield planner.sidePanel.ready();
        yield planner.workItemList.ready();
        yield planner.workItemList.overlay.untilHidden();
    }));
    it('Non Collaborator should not be able edit a workItem title', () => __awaiter(this, void 0, void 0, function* () {
        yield planner1.workItemList.clickWorkItem('Work Item 5');
        expect(yield planner1.quickPreview.titleInput.getAttribute('disabled')).toBe('true');
    }));
    it('Non Collaborator should not be able edit state of a workitem', () => __awaiter(this, void 0, void 0, function* () {
        yield planner1.workItemList.clickWorkItem('Work Item 4');
        yield planner1.quickPreview.stateDropdown.clickWhenReady();
        expect(yield planner1.quickPreview.stateDiv.getAttribute('innerText')).not.toContain('Update Type');
    }));
    it('Non collaborator should not be able to add assignee', () => __awaiter(this, void 0, void 0, function* () {
        yield planner1.workItemList.clickWorkItem('Work Item 4');
        expect(yield planner1.quickPreview.assigneeSection.getTextWhenReady()).not.toBe(' Add Assignee ');
    }));
    it('Non collaborator should Comment and Save', () => __awaiter(this, void 0, void 0, function* () {
        let comment = 'new comment';
        /* to avoid workitem conflict should comment on 2 different workitem */
        yield planner1.workItemList.clickWorkItem(c.commentCollaboratorTest);
        yield planner1.quickPreview.addCommentAndSave(comment);
        expect(yield planner1.quickPreview.getComments()).toContain(comment);
    }));
    it('Non collaborator should not be able to update Area ', () => __awaiter(this, void 0, void 0, function* () {
        yield planner1.workItemList.clickWorkItem('Work Item 3');
        yield planner1.quickPreview.areaDropdown.clickWhenReady();
        expect(yield planner1.quickPreview.areaDiv.getAttribute('innerText')).not.toContain('Update area');
    }));
    it('Non collaborator should not be able to update Iteration ', () => __awaiter(this, void 0, void 0, function* () {
        yield planner1.workItemList.clickWorkItem('Work Item 3');
        yield planner1.quickPreview.iterationDropdown.clickWhenReady();
        expect(yield planner1.quickPreview.iterationDiv.getAttribute('innerText')).not.toContain('Update iteration');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFib3JhdG9yVGVzdC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3BlY3MvY29sbGFib3JhdG9yVGVzdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBcUM7QUFDckMscURBQXNEO0FBQ3RELHNDQUFzQztBQUV0QyxRQUFRLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO0lBQzNDLElBQUksT0FBb0IsQ0FBQztJQUN6QixJQUFJLFFBQXFCLENBQUM7SUFDMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFaEMsU0FBUyxDQUFDLEdBQVMsRUFBRTtRQUNuQixNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxJQUFJLHFCQUFXLENBQUMsb0JBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFJLEdBQUcsR0FBRyxNQUFNLG9CQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2Isa0RBQWtEO1FBQ2xELElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQzFDLElBQUksV0FBVyxHQUFRLE1BQU0sb0JBQU8sQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUN4RixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUscUNBQXFDLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0wsSUFBSSxXQUFXLEdBQVEsTUFBTSxvQkFBTyxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3hGLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsUUFBUSxH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