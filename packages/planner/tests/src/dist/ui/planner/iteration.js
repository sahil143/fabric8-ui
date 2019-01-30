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
class Iteration extends ui.BaseElement {
    constructor() {
        super(...arguments);
        this.iterationDialog = new ui.BaseElement(this.$('.modal-content'), 'iteration Dialog');
        this.iterationName = new ui.TextInput(this.iterationDialog.$('#iteration-name'), 'Iteration text input');
        this.parentIteration = new ui.TextInput(this.iterationDialog.$('#parent-iteration'), 'parent iteration');
        this.parentDropdownList = new ui.DropdownMenu(this.iterationDialog.$('.f8-iteration-modal-list'));
        this.parentDropdown = new ui.Dropdown(this.parentIteration, this.parentDropdownList, 'parent iteration dropdown');
        this.createIterationButton = new ui.Button(this.iterationDialog.$('#create-iteration-button'), 'Create Iteration button');
        this.datePickerDiv = new ui.BaseElement(this.$('.datepicker-container'), 'date picker div');
        this.showStartDateCalendar = new ui.Clickable(this.datePickerDiv.$$('.selection.inputnoteditable').first(), 'start date calendar');
        this.showEndDateCalendar = new ui.Clickable(this.datePickerDiv.$$('.selection.inputnoteditable').last(), 'End date calendar');
        this.calendarDiv = new ui.BaseElement(this.$('.selector.selectorarrow.selectorarrowleft'), '');
        this.selectStartdate = new ui.Clickable(this.$$('.datevalue.currmonth').first(), ' select start date');
        this.selectEndDate = new ui.Clickable(this.$$('.datevalue.currmonth').last(), ' select end date');
        this.month = new ui.Clickable(this.$('.headermonthtxt'), 'month');
        this.year = new ui.Clickable(this.$('.headeryeartxt .headerlabelbtn'), 'year');
        this.cancel = new ui.Button(this.iterationDialog.$('#cancel-iteration-button'), 'Cancel Iteration button');
    }
    addNewIteration(iterationName, parentIteration, withDates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.iterationName.enterText(iterationName);
            if (parentIteration) {
                yield this.parentIteration.enterText(parentIteration);
                yield this.parentDropdown.select(parentIteration);
            }
            if (withDates) {
                yield this.selectCalendarDate();
            }
        });
    }
    editIteration(iterationName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.iterationName.clear();
            yield this.iterationName.enterText(iterationName);
            yield this.createIterationButton.clickWhenReady();
            yield this.createIterationButton.untilHidden();
        });
    }
    selectCalendarDate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showStartDateCalendar.clickWhenReady();
            yield this.selectStartdate.clickWhenReady();
            yield this.showEndDateCalendar.clickWhenReady();
            yield this.selectEndDate.clickWhenReady();
        });
    }
    getMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showStartDateCalendar.clickWhenReady();
            let month = yield this.month.getTextWhenReady();
            return month;
        });
    }
    getYear() {
        return __awaiter(this, void 0, void 0, function* () {
            let year = yield this.year.getTextWhenReady();
            return year;
        });
    }
    clickCreateIteration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createIterationButton.clickWhenReady();
            yield this.createIterationButton.untilHidden();
        });
    }
    getLastDayOfMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            let day = yield this.selectEndDate.getAttribute('innerText');
            return day;
        });
    }
    clickCancel() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cancel.clickWhenReady();
            yield this.cancel.untilHidden();
        });
    }
}
exports.Iteration = Iteration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdWkvcGxhbm5lci9pdGVyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUUvQixNQUFhLFNBQVUsU0FBUSxFQUFFLENBQUMsV0FBVztJQUE3Qzs7UUFDRSxvQkFBZSxHQUFHLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUNuRixrQkFBYSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFDekMsc0JBQXNCLENBQ3ZCLENBQUM7UUFDRixvQkFBZSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFDM0Msa0JBQWtCLENBQ25CLENBQUM7UUFDRix1QkFBa0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1FBQzdGLG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUM5QixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsa0JBQWtCLEVBQ3ZCLDJCQUEyQixDQUM1QixDQUFDO1FBQ0YsMEJBQXFCLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUNsRCx5QkFBeUIsQ0FDMUIsQ0FBQztRQUNGLGtCQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFD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