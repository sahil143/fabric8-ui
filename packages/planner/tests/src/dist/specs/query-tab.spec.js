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
describe('Query tests', () => {
    let planner;
    let c = new support.Constants();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        planner = new planner_1.PlannerPage(protractor_1.browser.baseUrl);
        yield planner.openInBrowser();
        yield planner.waitUntilUrlContains('typegroup');
    }));
    it('should display search query result', () => __awaiter(this, void 0, void 0, function* () {
        let searchQuery = `typegroup.name : ${c.group1}`;
        yield planner.clickQueryTab();
        yield planner.waitUntilUrlContains('query');
        expect(yield protractor_1.browser.getCurrentUrl()).toContain('query');
        yield planner.query.enterQuery(searchQuery);
        expect(yield planner.query.getDataTableHeaderCellCount()).toBe(8);
    }));
    it('should create a new Workitem', () => __awaiter(this, void 0, void 0, function* () {
        let title = 'Create work item from query page', searchQuery = `title:${title}`;
        yield planner.clickQueryTab();
        yield planner.waitUntilUrlContains('query');
        yield planner.query.createWorkItem(title);
        yield planner.quickPreview.notificationToast.untilCount(1);
        expect(yield planner.quickPreview.notificationToast.count()).toBe(1);
        yield planner.query.enterQuery(searchQuery);
        expect(yield planner.query.hasWorkItem(title)).toBe(true);
    }));
    it('should delete a work item', () => __awaiter(this, void 0, void 0, function* () {
        let title = 'Delete work item from query page', searchQuery = `title:${title}`;
        yield planner.clickQueryTab();
        yield planner.waitUntilUrlContains('query');
        yield planner.query.createWorkItem(title);
        yield planner.query.enterQuery(searchQuery);
        expect(yield planner.query.hasWorkItem(title)).toBe(true);
        yield planner.query.clickWorkItemDeleteIcon(title);
        yield planner.modal.clickConfirmButton();
        expect(yield planner.query.emptyTemplateDisplayed()).toBe(true);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktdGFiLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcGVjcy9xdWVyeS10YWIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXFDO0FBQ3JDLHFEQUFzRDtBQUN0RCxzQ0FBc0M7QUFFdEMsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsSUFBSSxPQUFvQixDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWhDLFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDbkIsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEdBQUcsSUFBSSxxQkFBVyxDQUFDLG9CQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFTLEVBQUU7UUFDbEQsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsTUFBTSxvQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBUyxFQUFFO1FBQzVDLElBQUksS0FBSyxHQUFXLGtDQUFrQyxFQUNwRCxXQUFXLEdBQVcsU0FBUyxLQUFLLEVBQUUsQ0FBQztRQUN6QyxNQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBUyxFQUFFO1FBQ3pDLElBQUksS0FBSyxHQUFXLGtDQUFrQyxFQUNwRCxXQUFXLEdBQVcsU0FBUyxLQUFLLEVBQUUsQ0FBQztRQUN6QyxNQUFNLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==