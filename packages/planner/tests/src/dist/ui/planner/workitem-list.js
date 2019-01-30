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
const workitem_list_entry_1 = require("./workitem-list-entry");
class WorkItemList extends base_element_1.BaseElement {
    constructor(el, name = 'Work Item List') {
        super(el, name);
        this.overlay = new base_element_1.BaseElement(this.$('div.lock-overlay-list'), 'overlay');
        this.datatableHeaderdiv = new ui.BaseElement(this.$('.datatable-header'), 'datatable header div');
        this.datatableHeaderCell = new ui.BaseElementArray(this.$$('datatable-header-cell'), 'datatable header cell');
        this.datatableHeaderCellLabel = new ui.BaseElementArray(this.$$('datatable-header-cell-label'));
        this.datatableRow = new ui.BaseElementArray(this.$$('datatable-body-row'), 'datatable row');
        this.childWorkItemTypeDropdown = new ui.Dropdown(this.$('.f8-quick-add-inline .dropdown-toggle'), this.$('.f8-quick-add-inline .dropdown-menu'), 'Child WorkItem Type dropdown');
        this.empty_template = new base_element_1.BaseElement(this.$('.blank-slate-pf'), 'Empty work item template');
        this.empty_workitem_list = new base_element_1.BaseElement(this.empty_template.$('#title'), 'No workitems available');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.overlay.untilHidden();
        });
    }
    clickWorkItem(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.overlay.untilHidden();
            yield this.workItem(title).untilTextIsPresent(title);
            yield this.workItem(title).openQuickPreview();
        });
    }
    hasWorkItem(title, showCompleted = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!showCompleted) {
                yield this.workItem(title).untilTextIsPresent(title);
            }
            return this.workItem(title).isPresent();
        });
    }
    workItem(title) {
        return new workitem_list_entry_1.WorkItemListEntry(this.element(protractor_1.by.xpath("//datatable-body-row[.//p[text()='" + title + "']]")), 'Work Item - ' + title);
    }
    clickInlineQuickAdd(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workItem(title).clickInlineQuickAdd();
        });
    }
    getInlineQuickAddClass(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.workItem(title).getInlineQuickAddClass();
        });
    }
    getDataTableHeaderCellCount() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.datatableHeaderdiv.untilDisplayed();
            return this.datatableHeaderCell.count();
        });
    }
    selectChildWorkItemType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.childWorkItemTypeDropdown.clickWhenReady();
            yield this.childWorkItemTypeDropdown.select(type);
        });
    }
    iterationText(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.workItem(title).getIterationText();
        });
    }
    clickWorkItemLabel(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workItem(title).clickLabel();
        });
    }
    clickWorkItemDeleteIcon(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser
                .actions()
                .mouseMove(this.workItem(title))
                .perform();
            yield this.workItem(title).clickDeleteIcon();
        });
    }
    isTitleTextBold(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.workItem(title).title.getAttribute('className');
        });
    }
    openDetailPage(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.overlay.untilHidden();
            yield protractor_1.browser
                .actions()
                .mouseMove(this.workItem(title))
                .perform();
            yield this.workItem(title).clickDetailIcon();
        });
    }
    getUnassignedWorkItemCount(assigneeName) {
        return __awaiter(this, void 0, void 0, function* () {
            let assignees = yield this.$$('f8-assignee').getAttribute('innerText');
            let unassigned = assignees.filter((assignee) => assignee === assigneeName);
            return unassigned.length;
        });
    }
    emptyTemplateDisplayed() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.empty_template.untilDisplayed();
            yield this.empty_workitem_list.untilDisplayed();
            return this.empty_workitem_list.isDisplayed();
        });
    }
}
exports.WorkItemList = WorkItemList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0tbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VpL3BsYW5uZXIvd29ya2l0ZW0tbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXdEO0FBQ3hELCtCQUErQjtBQUMvQixvREFBZ0Q7QUFDaEQsK0RBQTBEO0FBRTFELE1BQWEsWUFBYSxTQUFRLDBCQUFXO0lBaUIzQyxZQUFZLEVBQWlCLEVBQUUsSUFBSSxHQUFHLGdCQUFnQjtRQUNwRCxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBakJsQixZQUFPLEdBQUcsSUFBSSwwQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0RSx1QkFBa0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDN0Ysd0JBQW1CLEdBQUcsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQzNDLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsRUFDaEMsdUJBQXVCLENBQ3hCLENBQUM7UUFDRiw2QkFBd0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztRQUMzRixpQkFBWSxHQUFHLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN2Riw4QkFBeUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQ3pDLElBQUksQ0FBQyxDQUFDLENBQUMsdUNBQXVDLENBQUMsRUFDL0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUM3Qyw4QkFBOEIsQ0FDL0IsQ0FB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