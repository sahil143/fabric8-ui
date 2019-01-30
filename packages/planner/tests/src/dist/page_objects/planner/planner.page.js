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
const uuid_1 = require("uuid");
const app_page_1 = require("../app.page");
const support = require("./../../support");
const planner = require("./../../ui/planner");
// this is what you see when you click on the Plan Tab button
class PlannerPage extends app_page_1.AppPage {
    constructor(url) {
        super(url);
        this.workItemList = new planner.WorkItemList(protractor_1.$('alm-work-item-list'));
        this.quickAdd = new planner.WorkItemQuickAdd(protractor_1.$('alm-work-item-quick-add'));
        this.inlineQuickAdd = new planner.WorkItemInlineQuickAdd(protractor_1.$('#workItemList_quickAdd_inline'));
        this.sidePanel = new planner.SidePanel(protractor_1.$('aside.f8-sidepanel'));
        this.quickPreview = new planner.WorkItemQuickPreview(protractor_1.$('work-item-detail'));
        this.header = new planner.ToolbarHeader(protractor_1.$('#header-div'));
        this.settings = new planner.Settings(protractor_1.$('div.f8-table-config__settings'));
        this.iteration = new planner.Iteration(protractor_1.$('fab-planner-iteration-modal'));
        this.detailPage = new planner.WorkItemDetailPage(protractor_1.$('work-item-detail'));
        this.confirmModalButton = new planner.WorkItemList(protractor_1.$('#modal-confirm'));
        this.query = new planner.Query(protractor_1.$('planner-query'));
        this.modal = new planner.ModalDialog(protractor_1.$('modal'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            support.debug(' ... check if Planner page is Ready');
            yield _super("ready").call(this);
            yield this.workItemList.ready();
            yield this.quickAdd.ready();
            yield this.sidePanel.ready();
            support.debug(' ... check if Planner page is Ready - OK');
        });
    }
    createWorkItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug('create item', JSON.stringify(item));
            yield this.quickAdd.addWorkItem(item);
        });
    }
    createUniqueWorkItem() {
        return __awaiter(this, void 0, void 0, function* () {
            let workItemTitle = uuid_1.v4();
            yield this.createWorkItem({ title: workItemTitle });
            return workItemTitle;
        });
    }
    createInlineWorkItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug('create inline item', JSON.stringify(item));
            yield this.inlineQuickAdd.addInlineWorkItem(item);
        });
    }
    resetState() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sidePanel.clickWorkItemGroup();
            yield protractor_1.$('body').sendKeys(protractor_1.Key.ESCAPE);
        });
    }
}
exports.PlannerPage = PlannerPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbm5lci5wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFnZV9vYmplY3RzL3BsYW5uZXIvcGxhbm5lci5wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkM7QUFDN0MsK0JBQWtDO0FBQ2xDLDBDQUFzQztBQUN0QywyQ0FBMkM7QUFDM0MsOENBQThDO0FBRTlDLDZEQUE2RDtBQUM3RCxNQUFhLFdBQVksU0FBUSxrQkFBTztJQWN0QyxZQUFZLEdBQVc7UUFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBZGIsaUJBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNqRSxhQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztRQUN0RSxtQkFBYyxHQUFHLElBQUksT0FBTyxDQUFDLHNCQUFzQixDQUFDLGNBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUM7UUFDeEYsY0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQzNELGlCQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsY0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN2RSxXQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLGNBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3JELGFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztRQUNwRSxjQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7UUFDcEUsZUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLGtCQUFrQixDQUFDLGNBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDbkUsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDbkUsVUFBSyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUM5QyxVQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBSTVDLENBQUM7SUFFSyxLQUFLOzs7WUFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDckQsTUFBTSxlQUFXLFdBQUUsQ0FBQztZQUNwQixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLElBQXNCOztZQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFSyxvQkFBb0I7O1lBQ3hCLElBQUksYUFBYSxHQUFHLFNBQUksRUFBRSxDQUFDO1lBQzNCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVLLG9CQUFvQixDQUFDLElBQXNCOztZQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBRUssVUFBVTs7WUFDZCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQyxNQUFNLGNBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7Q0FDRjtBQS9DRCxrQ0ErQ0MifQ==