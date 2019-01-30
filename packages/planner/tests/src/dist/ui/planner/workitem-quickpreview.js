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
const support = require("./../../support");
const ui = require("./../../ui");
class WorkItemQuickPreview extends ui.BaseElement {
    constructor(ele, name = '') {
        super(ele, name);
        // TODO - move loading animation out of here. It doesn't belong here.
        this.loadingAnimation = new ui.BaseElementArray(protractor_1.$$('.spinner'), 'Loading spinner animation');
        this.notificationToast = new ui.BaseElementArray(protractor_1.$$('pfng-toast-notification'), 'Notification Toast');
        /* UI elements of the Top section of the workitem preview */
        this.closeButton = new ui.Button(this.$('.f8-detail--close'), 'WorkItem Quick Preview close button');
        this.iterationDropdownCloseButton = new ui.Button(this.$('.iteration-dropdown .close-pointer'), 'Iteration dropdown close button');
        this.areaDropdownCloseButton = new ui.Button(this.$('.area-dropdown .close-pointer'), 'Area dropdown close button');
        this.typeDropdownCloseButton = new ui.Button(this.$('.type-dropdown .close-pointer'), 'Type dropdown close button');
        this.stateDropdownCloseButton = new ui.Button(this.$('.state-dropdown .close-pointer'), 'State dropdown close button');
        this.stateDiv = new ui.BaseElement(this.$('.state-dropdown'), 'State dropdown toggle');
        this.stateDropdown = new ui.Dropdown(this.stateDiv.$('f8-select-dropdown .dropdown-toggle'), this.stateDiv.$('.select-dropdown-menu'), 'State select dropdown', 'li>div>.item-value');
        this.typeDiv = new ui.BaseElement(this.$('.type-dropdown'), 'Type dropdown toggle');
        this.typeDropdown = new ui.Dropdown(this.typeDiv.$('f8-select-dropdown .dropdown-toggle'), this.typeDiv.$('.select-dropdown-menu'), 'Type select dropdown', 'li>div>.item-value');
        this.fullDetailButton = new ui.Clickable(this.$('span.dib'), 'View full details button');
        this.titleDiv = new ui.BaseElement(this.$('#wi-title-div'), 'Workitem title div');
        this.titleInput = new ui.TextInput(this.titleDiv.$('textarea'), 'WorkItem Title Input');
        this.titleSaveButton = new ui.Button(this.titleDiv.$('.inlineinput-btn-save'), 'WorkItem Title Save button');
        this.titleCancelButton = new ui.Button(this.titleDiv.$('.inlineinput-btn-cancel'), 'Workitem Title cancel button');
        this.titleErrorMessage = new ui.BaseElement(this.$('.error-message small'), 'WorkItem Title error message');
        this.linkCount = new ui.Clickable(this.$('#wi-link-total'), 'work item link total');
        /* UI elements for the middle section of the workitem preview */
        this.assigneeSection = new ui.BaseElement(this.$('.f8-detail__assignee'), ' assignee section');
        this.assigneeDropdownSelector = new ui.BaseElement(this.$('assignee-selector'), ' assignee selector');
        this.assigneeDropdown = new ui.Dropdown(this.$('#f8-add-assignee'), this.$('assignee-selector ul.select-dropdown-menu'), 'Assignee Select dropdown');
        this.assigneeDropdownCloseButton = new ui.Button(this.$('#f8-add-assignee-dropdown .close-pointer'), 'Assignee dropdown close button');
        this.assigneeDropdownMenu = new ui.BaseElement(this.$('assignee-selector div.select-dropdown'), 'Assignee dropdown menu');
        this.assigneeDiv = new ui.BaseElement(this.$('f8-assignee'), 'Assignee List Div');
        this.areaDiv = new ui.BaseElement(this.$('.area-dropdown'), 'Area List Div');
        this.areaDropdown = new ui.Dropdown(this.areaDiv.$('f8-select-dropdown .dropdown-toggle'), this.areaDiv.$('.select-dropdown-menu'), 'Area select dropdown', 'li>div>.item-value');
        this.iterationDiv = new ui.BaseElement(this.$('.iteration-dropdown'), 'Iteration List Div');
        this.iterationDropdown = new ui.Dropdown(this.iterationDiv.$('f8-select-dropdown .dropdown-toggle'), this.iterationDiv.$('.select-dropdown-menu'), 'Iteration select dropdown', 'li>div>.item-value');
        this.iterationInput = new ui.TextInput(this.iterationDiv.$('.select-dropdown-search-input'), 'Iteration input');
        this.labelDropdown = new ui.Dropdown(this.$('#labelSelector .add-label'), this.$('#labelSelector ul.select-dropdown-menu'), 'Label Select dropdown');
        this.labelsDiv = new ui.BaseElement(this.$('.f8-detail__labels'), ' labels Div');
        this.labels = new ui.BaseElement(this.labelsDiv.$('.label-wrapper'), ' labels ');
        this.labelListDiv = new ui.BaseElementArray(this.labelsDiv.$$('f8-label .label-wrapper>span'), 'label list Div');
        this.labelDropDownDiv = new ui.BaseElement(this.$('#labelSelector .select-dropdown'), 'dropdown div');
        this.labelDropdownCloseButton = new ui.Clickable(this.labelDropDownDiv.$('.close-pointer'), 'label dropdown close Button');
        this.createLabelButton = new ui.Clickable(this.labelDropDownDiv.$('.create-label-button'), 'Create new label');
        this.createLabelDiv = new ui.BaseElement(this.$('.create-label'), 'create label div');
        this.createLabelInput = new ui.TextInput(this.createLabelDiv.$('.create-label-input'), 'create label input');
        this.createLabelCancel = new ui.Button(this.createLabelDiv.$('.pficon-close'), 'create label cancel');
        this.createLabelSaveButton = new ui.Button(this.createLabelDiv.$('.fa-check'), 'create label save button');
        this.descriptionDiv = new ui.BaseElement(this.$('#wi-desc-div'), 'WorkItem Description Div');
        this.descriptionEditIcon = new ui.Clickable(this.descriptionDiv.$('i'), 'WorkItem Description Edit icon');
        this.descriptionTextarea = new ui.TextInput(this.descriptionDiv.$('.editor-box'), 'WorkItem Description Input');
        this.descriptionSaveButton = new ui.Button(this.descriptionDiv.$('.action-btn.btn-save'), 'WorkItem Description Save Button');
        this.descriptionCancelButton = new ui.Button(this.descriptionDiv.$$('.action-btn.btn').first(), 'WorkItem Description Save Button');
        this.creatorusername = new ui.BaseElement(this.$('#WI_details_reporter_user'), 'WorkItem creator div');
        this.creatorAvatar = new ui.BaseElement(this.$('#WI_details_reporter_img>img'), 'Creator Avatar URL');
        /* UI elements for the bottom section of the workitem preview */
        this.linksDiv = new ui.BaseElement(protractor_1.$('#wi-link'), 'WorkItem links div');
        this.linksToggleButton = new ui.Clickable(this.linksDiv.$('.f8-toggle-caret'), 'WorkItem Links toggle button');
        this.linkTypeDiv = new ui.BaseElement(this.$('#wi-link-type'), 'Link type List Div');
        this.linkTypeDropdown = new ui.Dropdown(this.linkTypeDiv.$('f8-select-dropdown .dropdown-toggle'), this.linkTypeDiv.$('.select-dropdown-menu'), 'Link type select dropdown', 'li>div>.item-value');
        this.linkSearchDiv = new ui.BaseElement(this.$('#workitem-link-search'), 'Link search List Div');
        this.linkSearchDropdown = new ui.Dropdown(this.linkSearchDiv.$('f8-select-dropdown .dropdown-toggle'), this.linkSearchDiv.$('.select-dropdown-menu'), 'Link item search dropdown', 'li>div>.item-value');
        this.searchWorkItem = new ui.TextInput(this.linkSearchDiv.$('input.select-dropdown-search-input'), 'Workitem search');
        this.workItemList = new ui.BaseElementArray(this.linkSearchDiv.$$('.select-dropdown-menu li'), 'work item list');
        this.linkButton = new ui.Button(this.linksDiv.$('#bind-link'), 'link Button');
        this.linklistItem = new ui.BaseElement(this.$('#wi-link .f8-link__list-item'), 'link lst item');
        this.commentsToggleButton = new ui.Clickable(protractor_1.$('#wi-comment .f8-toggle-caret'), 'WorkItem Comments toggle button');
        this.creationTimeDiv = new ui.BaseElement(this.$('#created_at'), 'WorkItem creation time div');
        this.commentDiv = new ui.BaseElement(this.$('.f8-comment--input'), 'comments div field');
        this.commentsField = new ui.Clickable(this.commentDiv.$('.editor-box.editor-preview.placeholder'), 'comments clickable field');
        this.commentsInputField = new ui.TextInput(this.commentDiv.$('.editor-box.editor-markdown'), 'comment input field');
        this.commentSaveButton = new ui.Button(this.commentDiv.$('.btn-save'), 'Comment save button');
        this.commentCancelButton = new ui.Button(this.commentDiv.$('.fl.btn.btn-default.pull-right.action-btn'), 'Comment cancel button');
        this.commentsText = new ui.BaseElementArray(this.$$('.f8-comment-body .comment .editor-box.editor-preview'), 'Comment List');
        this.commentsCount = new ui.BaseElement(this.$('#total_comments'), 'comment count');
        this.commentsEditIcon = new ui.Clickable(this.commentDiv.$('.edit-icon'), 'comments clickable edit icon');
        /* UI elements for the Agile template of the workitem preview */
        this.effortTextArea = new ui.TextInput(this.$('[placeholder="Effort"]'), 'effort textarea');
        this.workItemsGroup = new ui.Clickable(this.element(protractor_1.by.cssContainingText('alm-dynamic-field .f8-dynamic-control', ' Work Items ')), 'Side panel WorkItem button');
        this.businessValue = new ui.TextInput(this.$('textarea[placeholder="Business Value"]'), ' Business value textarea');
        this.storyPoints = new ui.TextInput(this.$('textarea[placeholder="Storypoints"]'), ' Storypoints textarea');
        this.dynamicFieldDiv = new ui.BaseElement(this.element(protractor_1.by.xpath("//textarea[@placeholder='Storypoints']/ancestor::f8-inlineinput")));
        this.dynamicFieldSaveButton = new ui.Button(this.dynamicFieldDiv.$('.inlineinput-btn-save'), 'Dynamic Fields Save Button');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            support.debug('... check if WorkItem preview is Ready');
            yield _super("ready").call(this);
            yield this.closeButton.ready();
            yield this.titleDiv.ready();
            yield this.descriptionDiv.ready();
            yield this.linksToggleButton.ready();
            yield this.commentsToggleButton.ready();
            support.debug('... check if WorkItem preview is Ready - OK');
        });
    }
    addAssignee(assignee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield this.assigneeDropdown.clickWhenReady();
            yield this.assigneeDropdown.select(assignee);
            yield this.assigneeDropdownCloseButton.clickWhenReady();
            yield this.loadingAnimation.untilCount(0);
        });
    }
    addArea(areaTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield protractor_1.browser.sleep(2000);
            yield this.areaDropdown.clickWhenReady();
            yield this.areaDropdown.select(areaTitle);
            yield this.loadingAnimation.untilCount(0);
        });
    }
    addIteration(iterationTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield protractor_1.browser.sleep(2000);
            yield this.iterationDropdown.clickWhenReady();
            yield this.iterationDropdown.select(iterationTitle);
        });
    }
    typeaHeadSearch(iterationTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield this.iterationDropdown.clickWhenReady();
            yield this.iterationInput.enterText(iterationTitle);
        });
    }
    addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield this.commentsEditIcon.clickWhenReady();
            yield this.commentsInputField.enterText(comment);
        });
    }
    addCommentAndSave(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            let count = yield this.commentsCount.getTextWhenReady();
            yield this.addComment(comment);
            yield this.commentSaveButton.clickWhenReady();
            yield this.commentSaveButton.untilHidden();
            count = (parseInt(count) + 1).toString();
            yield this.commentsCount.untilTextIsPresent(count);
        });
    }
    addCommentAndCancel(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addComment(comment);
            yield this.commentCancelButton.clickWhenReady();
        });
    }
    addLabel(label, unassignLabel = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.labelDropdown.clickWhenReady();
            yield this.labelDropdown.select(label);
            yield this.labelDropdownCloseButton.clickWhenReady();
            yield this.loadingAnimation.untilCount(0);
            if (!unassignLabel) {
                yield this.labels.untilTextIsPresent(label);
            }
        });
    }
    addLink(linkType, workItem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.linksDiv.untilTextIsPresent('Links');
            // Open link section in detail page
            yield this.linksToggleButton.clickWhenReady();
            // Open link type dropdown
            yield this.linkTypeDropdown.clickWhenReady();
            yield this.linkTypeDropdown.select(linkType);
            // Open search work item dropdown
            yield this.linkSearchDropdown.clickWhenReady();
            yield this.searchWorkItem.enterText(workItem);
            // Needs further investigation, test throws Stale Element without sleep
            yield protractor_1.browser.sleep(2000);
            yield this.workItemList.untilCount(1);
            yield this.linkSearchDropdown.select(workItem);
            // Create link
            yield this.linkButton.untilTextIsPresent('Create Link');
            yield this.linkButton.clickWhenReady();
            yield this.linklistItem.untilTextIsPresent(workItem);
        });
    }
    removeLink(workItem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new ui.BaseElement(this.element(protractor_1.by.xpath("//li[contains(@class,'f8-link__list-item')][.//span[contains(text(), '" +
                workItem +
                "')]]")).$('.pficon-close'), 'remove link button').clickWhenReady();
        });
    }
    createNewLabel(label, isPressEnter = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.labelDropdown.clickWhenReady();
            yield this.createLabelButton.clickWhenReady();
            yield this.createLabelInput.enterText(label);
            if (isPressEnter) {
                yield this.createLabelInput.pressEnter();
            }
            else {
                yield this.createLabelSaveButton.clickWhenReady();
            }
            yield this.labelDropdown.select(label);
            yield this.labelDropdownCloseButton.clickWhenReady();
            yield this.loadingAnimation.untilCount(0);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.closeButton.clickWhenReady();
        });
    }
    getArea() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            let area = yield this.areaDropdown.getTextWhenReady();
            return area;
        });
    }
    getCreator() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            // We need the explicit sleep since the creator name doesn't load instantly
            yield protractor_1.browser.sleep(3000);
            let creator = yield this.creatorusername.getTextWhenReady();
            return creator;
        });
    }
    getCreatorAvatar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            let creator = yield this.creatorAvatar.getAttribute('src');
            return creator;
        });
    }
    getAssignees() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield this.assigneeDiv.untilDisplayed();
            yield protractor_1.browser.sleep(5000);
            let assigneeList = yield this.assigneeDiv.getTextWhenReady();
            return assigneeList;
        });
    }
    getComments() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            yield this.commentDiv.scrollIntoView();
            let commentList = '';
            if (yield this.commentsText.isPresent()) {
                commentList = yield this.commentsText.getTextWhenReady();
            }
            return commentList;
        });
    }
    getCreationTime() {
        return __awaiter(this, void 0, void 0, function* () {
            let origTime = yield this.creationTimeDiv.getTextWhenReady();
            return origTime;
        });
    }
    getDescription() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.descriptionTextarea.getTextWhenReady();
        });
    }
    getIteration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield protractor_1.browser.sleep(1000);
            let iteration = yield this.iterationDropdown.getTextWhenReady();
            return iteration;
        });
    }
    getType() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            let type = yield this.typeDropdown.getTextWhenReady();
            return type;
        });
    }
    getState() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            let state = yield this.stateDropdown.getTextWhenReady();
            return state;
        });
    }
    getLabels() {
        return __awaiter(this, void 0, void 0, function* () {
            let labelList = yield this.labelListDiv.getTextWhenReady();
            return labelList;
        });
    }
    getLinkedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            let linkList = yield this.linklistItem.getTextWhenReady();
            return linkList;
        });
    }
    updateTitle(title, append = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.titleDiv.clickWhenReady();
            if (!append) {
                yield this.titleInput.clear();
            }
            yield this.titleInput.enterText(title);
            yield this.titleSaveButton.clickWhenReady();
            yield protractor_1.browser.sleep(2000);
            yield this.titleInput.untilTextIsPresentInValue(title);
        });
    }
    updateDescription(description, append = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.openDescriptionBox();
            if (!append) {
                yield this.descriptionTextarea.clear();
            }
            yield this.descriptionTextarea.enterText(description);
            yield this.descriptionSaveButton.scrollIntoView();
            yield this.descriptionSaveButton.clickWhenReady();
            yield this.descriptionSaveButton.untilHidden();
        });
    }
    openDescriptionBox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser
                .actions()
                .mouseMove(this.descriptionDiv)
                .perform();
            yield this.descriptionEditIcon.clickWhenReady();
        });
    }
    isSaveButtonDisplayed() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.descriptionSaveButton.isDisplayed();
            }
            catch (exception) {
                return false;
            }
        });
    }
    removeAssignee(assignee) {
        return __awaiter(this, void 0, void 0, function* () {
            // Removing the assignee is exactly similar to adding an assignee
            yield this.addAssignee(assignee);
        });
    }
    getTitleError() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.titleErrorMessage.getTextWhenReady();
        });
    }
    changeStateTo(state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield protractor_1.browser.sleep(2000);
            yield this.stateDropdown.clickWhenReady();
            yield this.stateDropdown.select(state);
            yield this.loadingAnimation.untilCount(0);
            yield this.stateDropdown.untilTextIsPresent(state);
        });
    }
    changeTypeTo(type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingAnimation.untilCount(0);
            yield protractor_1.browser.sleep(2000);
            yield this.typeDropdown.clickWhenReady();
            yield this.typeDropdown.select(type);
            yield this.loadingAnimation.untilCount(0);
        });
    }
    /* Agile Template */
    updateEffort(effort) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.effortTextArea.enterText(effort);
            yield this.effortTextArea.sendKeys(protractor_1.Key.ENTER);
        });
    }
    updateBusinessValue(businessValue) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.businessValue.enterText(businessValue);
            yield this.businessValue.sendKeys(protractor_1.Key.ENTER);
        });
    }
    isDynamicFieldSaveButtonDisplayed() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dynamicFieldSaveButton.isDisplayed();
            }
            catch (exception) {
                return false;
            }
        });
    }
}
exports.WorkItemQuickPreview = WorkItemQuickPreview;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0tcXVpY2twcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdWkvcGxhbm5lci93b3JraXRlbS1xdWlja3ByZXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFvRTtBQUNwRSwyQ0FBMkM7QUFDM0MsaUNBQWlDO0FBRWpDLE1BQWEsb0JBQXFCLFNBQVEsRUFBRSxDQUFDLFdBQVc7SUFrT3RELFlBQVksR0FBa0IsRUFBRSxPQUFlLEVBQUU7UUFDL0MsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQWxPbkIscUVBQXFFO1FBQ3JFLHFCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLGVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQ3hGLHNCQUFpQixHQUFHLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLGVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDakcsNERBQTREO1FBQzVELGdCQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ2hHLGlDQUE0QixHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDMUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUM1QyxpQ0FBaUMsQ0FDbEMsQ0FBQztRQUNGLDRCQUF1QixHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDckMsSUFBSSxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxFQUN2Qyw0QkFBNEIsQ0FDN0IsQ0FBQztRQUNGLDRCQUF1QixHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDckMsSUFBSSxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxFQUN2Qyw0QkFBNEIsQ0FDN0IsQ0FB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