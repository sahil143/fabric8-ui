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
const workitem_list_1 = require("./workitem-list");
class Query extends workitem_list_1.WorkItemList {
    constructor() {
        super(...arguments);
        this.queryTextInput = new ui.TextInput(this.$('input[placeholder="Enter your Query..."]'), 'Enter your Query');
        this.createWorkItemButton = new ui.BaseElement(this.$('.f8-query__create-workitem> button'), ' Create work Item');
        this.createWorkItemMenu = new ui.BaseElement(this.$('.f8-query__create-workitem-menu'), 'create work item menu');
        this.titleTextInput = new ui.TextInput(this.createWorkItemMenu.$('input[placeholder=" Type your title...."]'), 'title');
        this.createButton = new ui.Clickable(this.createWorkItemMenu.$('#quickadd-save'), 'create button');
    }
    enterQuery(query, append = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryTextInput.ready();
            if (!append) {
                yield this.queryTextInput.clear();
            }
            yield this.queryTextInput.enterText(query);
            yield this.queryTextInput.enterText(protractor_1.Key.ENTER);
            yield this.datatableHeaderCell.untilCount(8);
        });
    }
    createWorkItem(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createWorkItemButton.ready();
            yield this.createWorkItemButton.clickWhenReady();
            yield this.createWorkItemMenu.untilDisplayed();
            yield this.titleTextInput.enterText(title);
            yield this.createButton.clickWhenReady();
        });
    }
}
exports.Query = Query;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktdGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdWkvcGxhbm5lci9xdWVyeS10YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFpQztBQUNqQywrQkFBK0I7QUFFL0IsbURBQStDO0FBRS9DLE1BQWEsS0FBTSxTQUFRLDRCQUFZO0lBQXZDOztRQUNVLG1CQUFjLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUN2QyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLEVBQ2xELGtCQUFrQixDQUNuQixDQUFDO1FBQ00seUJBQW9CLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUMvQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLEVBQzVDLG1CQUFtQixDQUNwQixDQUFDO1FBQ00sdUJBQWtCLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLEVBQ3pDLHVCQUF1QixDQUN4QixDQUFDO1FBQ00sbUJBQWMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsMkNBQTJDLENBQUMsRUFDdEUsT0FBTyxDQUNSLENBQUM7UUFDTSxpQkFBWSxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FDckMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUMzQyxlQUFlLENBQ2hCLENBQUM7SUFtQkosQ0FBQztJQWpCTyxVQUFVLENBQUMsS0FBYSxFQUFFLFNBQWtCLEtBQUs7O1lBQ3JELE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNuQztZQUNELE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxnQkFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsS0FBYTs7WUFDaEMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDakQsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDL0MsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0MsQ0FBQztLQUFBO0NBQ0Y7QUF2Q0Qsc0JBdUNDIn0=