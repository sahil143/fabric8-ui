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
const base_element_1 = require("./base.element");
const checkbox_1 = require("./checkbox");
class MultipleSelectionList extends base_element_1.BaseElement {
    constructor(element, name = '') {
        super(element, name);
        this.list = new base_element_1.BaseElement(this.$('div > ul'));
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.list.ready();
        });
    }
    item(text) {
        let el = this.list.element(protractor_1.by.cssContainingText('li.checkbox label', text));
        return new checkbox_1.Checkbox(el);
    }
    select(text) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkbox = this.item(text);
            yield checkbox.clickWhenReady();
        });
    }
}
exports.MultipleSelectionList = MultipleSelectionList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlfc2VsZWN0X2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91aS9tdWx0aV9zZWxlY3RfbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQStDO0FBQy9DLGlEQUE2QztBQUM3Qyx5Q0FBc0M7QUFFdEMsTUFBYSxxQkFBc0IsU0FBUSwwQkFBVztJQUdwRCxZQUFZLE9BQXNCLEVBQUUsT0FBZSxFQUFFO1FBQ25ELEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFIdkIsU0FBSSxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFJM0MsQ0FBQztJQUVLLEtBQUs7OztZQUNULE1BQU0sZUFBVyxXQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBRSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxJQUFJLG1CQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVLLE1BQU0sQ0FBQyxJQUFZOztZQUN2QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLE1BQU0sUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtDQUNGO0FBckJELHNEQXFCQyJ9