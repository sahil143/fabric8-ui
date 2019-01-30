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
const ui = require("../ui");
const base_element_1 = require("./base.element");
class ModalDialog extends base_element_1.BaseElement {
    constructor(element, name) {
        super(element, name);
        this.content = new base_element_1.BaseElement(this.$('.modal-content'));
        // optional
        this.footer = new base_element_1.BaseElement(this.content.$('.modal-footer'));
        this.confirm = new ui.Clickable(this.content.$('#modal-confirm'), 'Confirm');
    }
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("ready").call(this);
            yield this.content.ready();
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            this.log('Opened');
            return this;
        });
    }
    clickConfirmButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.content.untilDisplayed();
            yield this.confirm.untilDisplayed();
            yield this.confirm.clickWhenReady();
        });
    }
}
exports.ModalDialog = ModalDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWxfZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdWkvbW9kYWxfZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSw0QkFBNEI7QUFDNUIsaURBQTZDO0FBRTdDLE1BQWEsV0FBWSxTQUFRLDBCQUFXO0lBTTFDLFlBQVksT0FBc0IsRUFBRSxJQUFhO1FBQy9DLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFOdkIsWUFBTyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNwRCxXQUFXO1FBQ1gsV0FBTSxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzFELFlBQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUl4RSxDQUFDO0lBRUssS0FBSzs7O1lBQ1QsTUFBTSxlQUFXLFdBQUUsQ0FBQztZQUNwQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0lBRUssSUFBSTs7WUFDUixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUssa0JBQWtCOztZQUN0QixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0tBQUE7Q0FDRjtBQTFCRCxrQ0EwQkMifQ==