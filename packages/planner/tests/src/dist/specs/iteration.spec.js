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
describe('Iteration test', () => {
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
    it('should create a new iteration', () => __awaiter(this, void 0, void 0, function* () {
        let newIteration = 'new Iteration';
        yield planner.sidePanel.createNewIteration();
        yield planner.iteration.addNewIteration(newIteration, null, true);
        let month = yield planner.iteration.getMonth();
        let year = yield planner.iteration.getYear();
        let lastDayOfMonth = yield planner.iteration.getLastDayOfMonth();
        yield planner.iteration.clickCreateIteration();
        expect(yield planner.sidePanel.getIterationDate()).toContain('new Iteration [Active]', 'Active test failed');
        expect(yield planner.sidePanel.getIterationDate()).toContain(`${month} 1, ${year}`);
        expect(yield planner.sidePanel.getIterationDate()).toContain(`${month} ${lastDayOfMonth}, ${year}`);
    }));
    it('should create a new child iteration', () => __awaiter(this, void 0, void 0, function* () {
        let newIteration = 'new Iteration1';
        let iteration = 'Iteration_2';
        yield planner.sidePanel.createNewIteration();
        yield planner.iteration.addNewIteration(newIteration, c.parentIteration);
        yield planner.iteration.clickCreateIteration();
        yield planner.sidePanel.clickExpander(iteration);
        expect(yield planner.sidePanel.getIterationList()).toContain(newIteration);
    }));
    it('updating iteration should update workitem associated to iteration', () => __awaiter(this, void 0, void 0, function* () {
        let dropdownIteration1 = 'newIteration', updateIteration = 'Iteration 01', workItemTitle1 = 'Workitem_Title_2';
        yield planner.sidePanel.createNewIteration();
        yield planner.iteration.addNewIteration(dropdownIteration1);
        yield planner.iteration.clickCreateIteration();
        yield planner.workItemList.workItem(workItemTitle1).openQuickPreview();
        yield planner.quickPreview.addIteration(dropdownIteration1);
        yield planner.quickPreview.close();
        yield planner.workItemList
            .workItem(workItemTitle1)
            .iteration.untilTextIsPresent(dropdownIteration1);
        expect(yield planner.workItemList.iterationText(workItemTitle1)).toBe(dropdownIteration1);
        yield planner.sidePanel.selectIterationKebab(dropdownIteration1);
        yield planner.sidePanel.openIterationDialogue();
        yield planner.iteration.editIteration(updateIteration);
        yield planner.workItemList
            .workItem(workItemTitle1)
            .iteration.untilTextIsPresent(updateIteration);
        expect(yield planner.workItemList.iterationText(workItemTitle1)).toBe(updateIteration);
    }));
    // Regression test for https://github.com/openshiftio/openshift.io/issues/3318
    it('Iteration modal should have sane values', () => __awaiter(this, void 0, void 0, function* () {
        let iterationName = 'issue-3318';
        // Create iteration "issue-3318"
        yield planner.sidePanel.createNewIteration();
        yield planner.iteration.addNewIteration(iterationName);
        yield planner.iteration.clickCreateIteration();
        yield protractor_1.browser.sleep(1000);
        // Ensure dropdown list has only 1 "issue-3318"
        yield planner.sidePanel.createNewIteration();
        yield planner.iteration.parentIteration.enterText(iterationName);
        let val = yield planner.iteration.parentDropdownList.getTextWhenReady();
        // Ensure val is exactly the value we expect it to be
        expect(val).toBe(c.rootIteration + '/' + iterationName);
        yield planner.iteration.clickCancel();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcGVjcy9pdGVyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXFDO0FBQ3JDLHFEQUFzRDtBQUN0RCxzQ0FBc0M7QUFFdEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLE9BQW9CLENBQUM7SUFDekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFaEMsU0FBUyxDQUFDLEdBQVMsRUFBRTtRQUNuQixNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxJQUFJLHFCQUFXLENBQUMsb0JBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLEdBQVMsRUFBRTtRQUNwQixNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25ELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBUyxFQUFFO1FBQ25CLE1BQU0sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUUsR0FBUyxFQUFFO1FBQzdDLElBQUksWUFBWSxHQUFHLGVBQWUsQ0FBQztRQUNuQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM3QyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFD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