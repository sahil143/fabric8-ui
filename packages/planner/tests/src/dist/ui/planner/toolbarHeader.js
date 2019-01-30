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
const ui = require("../../ui");
const base_element_1 = require("./../base.element");
const workitem_list_1 = require("./workitem-list");
class ToolbarHeader extends base_element_1.BaseElement {
    constructor(el, name = 'ToolBar Header') {
        super(el, name);
        this.notificationToast = new ui.BaseElementArray(protractor_1.$$('pfng-toast-notification'), 'Notification Toast');
        this.header = new base_element_1.BaseElement(this.$('.toolbar-pf-view-selector'), 'header div');
        this.showTree = new base_element_1.BaseElement(this.$('.toolbar-pf-view-selector #showTree'), 'show Tree');
        this.filterDropdown = new ui.Dropdown(this.$('.input-group-btn'), this.$('.input-group-btn .dropdown-menu'), 'Filter-By dropdown');
        this.selectFilterCondition = new ui.Dropdown(this.$('.filter-select'), this.$('.filter-select .dropdown-menu'), 'Select Filter Condition');
        this.clearAllFilter = new ui.Clickable(this.$('.clear-filters'), 'Clear All filters');
        this.showCompleted = new base_element_1.BaseElement(this.$('.toolbar-pf-view-selector #showCompleted'), 'Show Completed');
        this.saveFilter = new ui.Clickable(this.$('.save-filters'), 'Save');
        this.saveFilterDialog = new base_element_1.BaseElement(this.$('.save-filter-dropdown'));
        this.saveFilterBtn = new ui.Button(this.saveFilterDialog.$('.save-cq-btn'), 'Save');
        this.closeBtn = new ui.Button(this.$('.cancel-cq-btn'), 'Cancel');
        this.titleTextInput = new ui.TextInput(this.saveFilterDialog.$('input.form-control'), 'Query Title');
        this.activeFiltersList = new ui.BaseElementArray(this.$$('.f8-filters--active li'), 'Active filters div');
        this.workItemList = new workitem_list_1.WorkItemList(protractor_1.$('alm-work-item-list'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.header.untilPresent();
        });
    }
    clickShowTree() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            yield this.showTree.clickWhenReady();
            yield this.workItemList.overlay.untilHidden();
        });
    }
    selectFilter(Label, LabelTest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            yield this.filterDropdown.clickWhenReady();
            yield this.filterDropdown.select(Label);
            yield this.selectFilterCondition.clickWhenReady();
            yield this.selectFilterCondition.select(LabelTest);
            yield this.workItemList.overlay.untilHidden();
        });
    }
    clickClearAllFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clearAllFilter.clickWhenReady();
            yield this.workItemList.overlay.untilHidden();
        });
    }
    clickShowCompleted() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            yield this.showCompleted.untilDisplayed();
            yield this.showCompleted.clickWhenReady();
            yield this.workItemList.overlay.untilHidden();
        });
    }
    saveFilters(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveFilter.clickWhenReady();
            yield this.titleTextInput.enterText(title);
            yield this.saveFilterBtn.clickWhenReady();
        });
    }
    getFilterConditions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.activeFiltersList.getTextWhenReady();
        });
    }
}
exports.ToolbarHeader = ToolbarHeader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhckhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VpL3BsYW5uZXIvdG9vbGJhckhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQWtEO0FBQ2xELCtCQUErQjtBQUMvQixvREFBZ0Q7QUFDaEQsbURBQStDO0FBRS9DLE1BQWEsYUFBYyxTQUFRLDBCQUFXO0lBOEI1QyxZQUFZLEVBQWlCLEVBQUUsSUFBSSxHQUFHLGdCQUFnQjtRQUNwRCxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBOUJsQixzQkFBaUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFFLENBQUMseUJBQXlCLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2pHLFdBQU0sR0FBRyxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzVFLGFBQVEsR0FBRyxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZGLG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUM5QixJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsaUNBQWlDLENBQUMsRUFDekMsb0JBQW9CLENBQ3JCLENBQUM7UUFDRiwwQkFBcUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxFQUN2Qyx5QkFBeUIsQ0FDMUIsQ0FBQztRQUNNLG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pGLGtCQUFhLEdBQUcsSUFBSSwwQkFBVyxDQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLEVBQ2xELGdCQUFnQixDQUNqQixDQUFDO1FBQ0YsZUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELHFCQUFnQixHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUNwRSxrQkFBYSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9FLGFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdELG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNoRyxzQkFBaUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUNqQyxvQkFBb0IsQ0FDckIsQ0FBQztRQUNGLGlCQUFZLEdBQUcsSUFBSSw0QkFBWSxDQUFDLGNBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFJekQsQ0FBQztJQUVLLEtBQUs7OztZQUNULE1BQU0sZUFBVyxXQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVLLGFBQWE7O1lBQ2pCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNyQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVLLFlBQVksQ0FBQyxLQUFhLEVBQUUsU0FBaUI7O1lBQ2pELE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMzQyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2xELE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVLLG9CQUFvQjs7WUFDeEIsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUssa0JBQWtCOztZQUN0QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLEtBQWE7O1lBQzdCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFFSyxtQkFBbUI7O1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbkQsQ0FBQztLQUFBO0NBQ0Y7QUEzRUQsc0NBMkVDIn0=