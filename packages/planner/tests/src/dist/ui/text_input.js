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
class TextInput extends base_element_1.BaseElement {
    constructor(element, name = '') {
        super(element, name);
    }
    enterText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('enter text', () => __awaiter(this, void 0, void 0, function* () {
                yield this.ready();
                yield this.sendKeys(text);
            }));
            this.log('Entered Text');
        });
    }
    pressEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('press enter', () => __awaiter(this, void 0, void 0, function* () {
                yield this.ready();
                yield this.sendKeys(protractor_1.Key.ENTER);
            }));
        });
    }
}
exports.TextInput = TextInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dF9pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VpL3RleHRfaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFnRDtBQUNoRCxpREFBNkM7QUFFN0MsTUFBYSxTQUFVLFNBQVEsMEJBQVc7SUFDeEMsWUFBWSxPQUFzQixFQUFFLE9BQWUsRUFBRTtRQUNuRCxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFSyxTQUFTLENBQUMsSUFBWTs7WUFDMUIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7Z0JBQ3RDLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBRUssVUFBVTs7WUFDZCxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQVMsRUFBRTtnQkFDdkMsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQW5CRCw4QkFtQkMifQ==