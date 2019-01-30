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
class WorkItemListEntry extends ui.BaseElement {
    constructor(element, name) {
        super(element, name);
        this.cellSelector = protractor_1.$$('.datatable-body-cell');
        this.inlineQuickAdd = new ui.Clickable(this.$('.quick-add-icon'), 'Inline quick add button');
        this.id = new ui.BaseElement(this.$('span.margin-0'), 'WorkItem ID');
        this.type = new ui.BaseElement(this.$('datatable-body-cell:nth-child(3) work-item-cell > div'), 'WorkItem Type');
        this.title = new ui.Clickable(this.$('.wi-detail-title p'), 'WorkItem Title');
        this.labels = new ui.BaseElement(this.$('f8-label'), 'WorkItem Labels');
        this.inlineCloseButton = new ui.Clickable(this.$('.pficon-close'), 'inline close');
        this.treeExpander = new ui.Clickable(this.$('.tree-icon'), 'WorkItem Expander');
        this.labelName = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.label-name', 'sample_label_1')), 'WorkItem Label');
        this.detailIcon = new ui.Clickable(this.$('.wi-detail-icon a'), 'WorkItem detail page');
        this.iteration = new ui.BaseElement(this.$('#table-iteration'), 'Table Workitem Iteration Name');
        this.creator = new ui.BaseElement(this.$('.user-assign-avatar'), 'Creator column');
        this.assignees = new ui.BaseElement(this.$('f8-assignee'), 'Assignee column');
        this.deleteIcon = new ui.Clickable(this.$('#wi-delete-icon'), 'Delete work item');
    }
    openQuickPreview() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.title.run('Click WorkItem Title: ' + this.name, () => __awaiter(this, void 0, void 0, function* () { return this.title.clickWhenReady(); }));
        });
    }
    clickInlineQuickAdd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.inlineQuickAdd.clickWhenReady();
        });
    }
    clickInlineClose() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.inlineCloseButton.clickWhenReady();
        });
    }
    getInlineQuickAddClass() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inlineQuickAdd.getAttribute('className');
        });
    }
    clickExpandWorkItem() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.treeExpander.clickWhenReady();
        });
    }
    getIterationText() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iteration.getTextWhenReady();
        });
    }
    clickLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.labelName.clickWhenReady();
        });
    }
    clickDetailIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.detailIcon.clickWhenReady();
        });
    }
    clickDeleteIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteIcon.clickWhenReady();
        });
    }
}
exports.WorkItemListEntry = WorkItemListEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0tbGlzdC1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VpL3BsYW5uZXIvd29ya2l0ZW0tbGlzdC1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBQ25ELCtCQUErQjtBQUUvQixNQUFhLGlCQUFrQixTQUFRLEVBQUUsQ0FBQyxXQUFXO0lBc0JuRCxZQUFZLE9BQXNCLEVBQUUsSUFBWTtRQUM5QyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBdEJ2QixpQkFBWSxHQUFHLGVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFDLG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3hGLE9BQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNoRSxTQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLHVEQUF1RCxDQUFDLEVBQy9ELGVBQWUsQ0FDaEIsQ0FBQztRQUNGLFVBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDekUsV0FBTSxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDbkUsc0JBQWlCLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDOUUsaUJB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