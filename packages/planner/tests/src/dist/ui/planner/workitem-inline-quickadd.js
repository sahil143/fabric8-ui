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
class WorkItemInlineQuickAdd extends ui.BaseElement {
    constructor(el, name = 'Work Item Inline Quick Add') {
        super(el, name);
        this.titleTextInlineInput = new ui.TextInput(this.$('input.f8-quickadd-input'), 'Work item inline Title');
        this.buttonsDiv = this.$('div.f8-quickadd__wiblk-btn.pull-right');
        this.addInlineQuickAddButton = new ui.Button(this.buttonsDiv.$('#quickadd-save'), 'Add Inline Quick Add Button');
        this.workItemTypeDropdown = new ui.Dropdown(this.$('.f8-quickadd__wiblk button.dropdown-toggle'), this.$('.f8-quickadd__wiblk .dropdown-menu'), 'WorkItem Type inline dropdown');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.addAndOpenButton.ready();
        });
    }
    addInlineWorkItem({ title, description = '', type = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workItemTypeDropdown.clickWhenReady();
            yield this.workItemTypeDropdown.select(type);
            yield this.titleTextInlineInput.ready();
            yield this.titleTextInlineInput.enterText(title);
            yield this.addInlineQuickAddButton.clickWhenReady();
            // TODO add more confirmation that the item has been added
            this.log('New Inline WorkItem created', `${title} added`);
        });
    }
    workItemTypes() {
        return __awaiter(this, void 0, void 0, function* () {
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
}
exports.WorkItemInlineQuickAdd = WorkItemInlineQuickAdd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0taW5saW5lLXF1aWNrYWRkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdWkvcGxhbm5lci93b3JraXRlbS1pbmxpbmUtcXVpY2thZGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtCQUErQjtBQUcvQixNQUFhLHNCQUF1QixTQUFRLEVBQUUsQ0FBQyxXQUFXO0lBZ0J4RCxZQUFZLEVBQWlCLEVBQUUsSUFBSSxHQUFHLDRCQUE0QjtRQUNoRSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBaEJsQix5QkFBb0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsRUFDakMsd0JBQXdCLENBQ3pCLENBQUM7UUFDRixlQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzdELDRCQUF1QixHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDbkMsNkJBQTZCLENBQzlCLENBQUM7UUFDRix5QkFBb0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsNENBQTRDLENBQUMsRUFDcEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUM1QywrQkFBK0IsQ0FDaEMsQ0FBQztJQUlGLENBQUM7SUFFSyxLQUFLOzs7WUFDVCxNQUFNLGVBQVcsV0FBRSxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBWTs7WUFDdEUsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDakQsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwRCwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDNUQsQ0FBQztLQUFBO0lBRUssYUFBYTs7WUFDakIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDakQsSUFBSSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDcEUsMERBQTBEO1lBQzFELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUU7Z0JBQzlELElBQUksT0FBTyxFQUFFO29CQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQy9CO2dCQUNELE9BQU8sUUFBUSxDQUFDO1lBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBOUNELHdEQThDQyJ9