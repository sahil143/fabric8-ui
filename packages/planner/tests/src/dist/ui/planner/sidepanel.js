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
const support = require("../../support");
const ui = require("./../../ui");
const workitem_list_1 = require("./workitem-list");
class SidePanel extends ui.BaseElement {
    constructor(ele, name = 'WorkItem List page Side Panel') {
        super(ele, name);
        this.showHideSidePanelButton = new ui.Button(this.$('.f8-sidepanel--toggle'), 'show/hide side panel button');
        this.scenarioButton = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.f8-group-filter__type', ' Scenarios')), 'Side panel Scenario button');
        this.experienceButton = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.f8-group-filter__type', ' Experiences')), 'Side panel Experiences button');
        this.requirementsButton = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.f8-group-filter__type .dib', ' Requirements')), 'Side panel Requirements button');
        this.workItemsGroupAgile = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.f8-group-filter__type', ' Work Items')), 'Side panel WorkItem button');
        this.iterationDiv = new ui.BaseElement(this.$('.f8-itr'), 'Iteration div');
        this.createIterationButton = new ui.Button(this.iterationDiv.$('#add-iteration-icon'), 'Side panel Add Iteration Button');
        this.iterationList = new ui.BaseElementArray(this.$$('.f8-itr__tree .f8-itr-name'), 'Iteration list');
        this.iterationKebab = new ui.Button(this.$('.dropdown-toggle'), 'Side panel Iteration Kebab Dropdown');
        this.editIteration = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.f8-itr .dropdown.open ul>li', 'Edit')), 'Iteration Dropdown Edit Option');
        this.iterationHeader = new ui.BaseElementArray(this.$$('.f8-itr__header'), 'iteration header');
        this.customQuery = new ui.BaseElement(this.$('custom-query'), 'My filters');
        this.customQueryList = new ui.BaseElementArray(this.$$('.f8-cf__list-type'), ' My filters list');
        this.deleteCustomQuery = new ui.Clickable(this.element(protractor_1.by.cssContainingText('.f8-cf-kebab.dropdown.open ul>li', 'Delete')), 'Custom query Dropdown Delete Option');
        this.infotipIconExperience = new ui.Clickable(this.$('.infotip-group-type-44795662-db7a-44f7-a4e7-c6d41d3eff27'));
        this.infotipIconRequirement = new ui.Clickable(this.$('.infotip-group-type-6d254168-6937-447f-a093-0c38404bd072'));
        this.infotipPopover = new ui.BaseElementArray(this.$$('.pficon-close'));
        this.workItemList = new workitem_list_1.WorkItemList(protractor_1.$('alm-work-item-list'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            support.debug('... check if Side panel is Ready');
            yield _super("ready").call(this);
            yield this.showHideSidePanelButton.ready();
            yield this.workItemsGroupAgile.ready();
            yield this.createIterationButton.ready();
            support.debug('... check if Side panel is Ready - OK');
        });
    }
    clickWorkItemGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workItemsGroupAgile.clickWhenReady();
            yield this.workItemList.overlay.untilHidden();
        });
    }
    createNewIteration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createIterationButton.clickWhenReady();
        });
    }
    getIterationList() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            let iterationString = yield this.iterationList.getTextWhenReady();
            let iterationList = iterationString.toString().split(',');
            this.debug('iterationList : ' + iterationList);
            return iterationList;
        });
    }
    selectIterationKebab(iterationName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.element(protractor_1.by.xpath("//iteration-list-entry[.//span[text()='" + iterationName + "']]"))
                .$('.dropdown-toggle')
                .click();
        });
    }
    openIterationDialogue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.editIteration.clickWhenReady();
        });
    }
    getIterationDate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            let iterationList = yield this.iterationHeader.getTextWhenReady();
            let iterationList1 = iterationList.toString().replace('\n', '');
            return iterationList1;
        });
    }
    clickExpander(iterationName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.element(protractor_1.by.xpath("//iteration-list-entry[.//span[text()='" + iterationName + "']]"))
                .$('.fa-angle-right')
                .click();
        });
    }
    getMyFiltersList() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.customQuery.ready();
            let myFilterString = yield this.customQueryList.getTextWhenReady();
            let myFilterList = myFilterString.toString().split(',');
            yield this.debug('My Query list : ' + myFilterList);
            return myFilterList;
        });
    }
    selectcustomFilterKebab(queryName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.element(protractor_1.by.xpath("//li[contains(@class,'f8-cf__list-type')][.//span[text()='" + queryName + "']]"))
                .$('.dropdown-toggle')
                .click();
        });
    }
    clickIteration(iterationName) {
        return __awaiter(this, void 0, void 0, function* () {
            let iteration = new ui.BaseElement(this.element(protractor_1.by.xpath("//iteration-list-entry[.//span[text()='" + iterationName + "']]")));
            yield iteration.clickWhenReady();
        });
    }
}
exports.SidePanel = SidePanel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdWkvcGxhbm5lci9zaWRlcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEyRDtBQUMzRCx5Q0FBeUM7QUFDekMsaUNBQWlDO0FBQ2pDLG1EQUErQztBQUsvQyxNQUFhLFNBQVUsU0FBUSxFQUFFLENBQUMsV0FBVztJQWdEM0MsWUFBWSxHQUFrQixFQUFFLE9BQWUsK0JBQStCO1FBQzVFLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFoRG5CLDRCQUF1QixHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDckMsSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxFQUMvQiw2QkFBNkIsQ0FDOUIsQ0FBQztRQUNGLG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUMxRSw0QkFBNEIsQ0FDN0IsQ0FBQztRQUNGLHFCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFFLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFDNUUsK0JBQStCLENBQ2hDLENBQUM7UUFDRix1QkFBa0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBRSxDQUFDLGlCQUFpQixDQUFDLDZCQUE2QixFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQ2xGLGdDQUFnQyxDQUNqQyxDQUFDO1FBQ0Ysd0JBQW1CLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSxh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