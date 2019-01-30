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
const ui = require("../../ui");
class WorkItemQuickAdd extends ui.BaseElement {
    constructor(el, name = 'Work Item Quick Add') {
        super(el, name);
        this.workItemListQuickAdd = new ui.BaseElement(this.$('.f8-quickadd__wiblk'), 'work Item quick add');
        this.titleTextInput = new ui.TextInput(this.$('input.f8-quickadd-input'), 'Work item Title');
        this.buttonsDiv = this.$('div.f8-quickadd__wiblk-btn.pull-right');
        this.addButton = new ui.Button(this.buttonsDiv.$$('button.btn.btn-primary').first(), 'Add Button');
        this.addAndOpenButton = new ui.Button(this.buttonsDiv.$$('button.btn.btn-primary').last(), 'Add and Open Button');
        this.workItemTypeDropdown = new ui.Dropdown(this.$('.f8-quickadd__wiblk button.dropdown-toggle'), this.$('.f8-quickadd__wiblk .dropdown-menu'), 'WorkItem Type dropdown');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.workItemListQuickAdd.untilTextIsPresent('Add Work Item');
            yield this.addAndOpenButton.ready();
        });
    }
    addWorkItem({ title, description = '', type = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if quick Add is ready
            yield this.ready();
            yield this.workItemTypeDropdown.clickWhenReady();
            yield this.workItemTypeDropdown.select(type);
            yield this.titleTextInput.ready();
            yield this.titleTextInput.enterText(title);
            yield this.addAndOpenButton.untilClickable();
            yield this.addButton.clickWhenReady();
            // TODO add more confirmation that the item has been added
            this.log('New WorkItem created', `${title} added`);
            // The button is enabled only when the new WI is on the list.
            yield this.addButton.untilClickable();
        });
    }
    workItemTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if quick Add is ready
            yield this.ready();
            yield this.workItemTypeDropdown.clickWhenReady();
            let array = yield this.workItemTypeDropdown.menu.getTextWhenReady();
            // Split array, remove invalid entries and trim the result
            return array.split('\n').reduce((filtered, current) => {
                if (current) {
                    filtered.push(current.trim());
                }
                return filtered;
            }, []);
        });
    }
    addAndOpenWorkItem({ title, description = '', type = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if quick Add is ready
            yield this.ready();
            yield this.workItemTypeDropdown.clickWhenReady();
            yield this.workItemTypeDropdown.select(type);
            yield this.titleTextInput.ready();
            yield this.titleTextInput.enterText(title);
            yield this.addAndOpenButton.untilClickable();
            yield this.addAndOpenButton.clickWhenReady();
            this.log('New WorkItem created', `${title} added`);
        });
    }
}
exports.WorkItemQuickAdd = WorkItemQuickAdd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0tcXVpY2thZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi91aS9wbGFubmVyL3dvcmtpdGVtLXF1aWNrYWRkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwrQkFBK0I7QUFHL0IsTUFBYSxnQkFBaUIsU0FBUSxFQUFFLENBQUMsV0FBVztJQWVsRCxZQUFZLEVBQWlCLEVBQUUsSUFBSSxHQUFHLHFCQUFxQjtRQUN6RCxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBZmxCLHlCQUFvQixHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxtQkFBYyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN4RixlQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzdELGNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM5RixxQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQ25ELHFCQUFxQixDQUN0QixDQUFDO1FBQ0YseUJBQW9CLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDRDQUE0QyxDQUFDLEVBQ3BELElBQUksQ0FBQyxDQUFDLENBQUMsb0NBQW9DLENBQUMsRUFDNUMsd0JBQXdCLENBQ3pCLENB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