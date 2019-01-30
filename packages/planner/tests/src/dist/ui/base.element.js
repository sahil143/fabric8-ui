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
const mixins = require("../mixins");
const support_1 = require("../support");
function makeNumberComparer(compare) {
    if (typeof compare == 'number') {
        return (n) => n >= compare;
    }
    return compare;
}
/**
 * to use with browser.wait to wait for multiple elements to present
 * e.g.
 *  browser.wait(untilCount($('foobar'), n => n >= 5 ))
 *  browser.wait(untilCount($('foobar'), 5)) // same as above
 */
function untilCount(elements, expectation) {
    let compare = makeNumberComparer(expectation);
    return () => elements.count().then(compare);
}
class BaseElement extends protractor_1.ElementFinder {
    /**
     * Extend this class, to describe single custom fragment on your page
     *
     * @param {ElementFinder} elementFinder ElementFinder that you want to extend
     * @param {string} name to indentify the element in the logs
     */
    constructor(wrapped, name = 'unnamed') {
        // Basically we are recreating ElementFinder again with same parameters
        super(wrapped.browser_, wrapped.elementArrayFinder_);
        // add logging mixin
        this.name = '';
        this.name = name;
    }
    untilClickable(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitFor('clickable', protractor_1.ExpectedConditions.elementToBeClickable(this), timeout);
            }
            catch (e) {
                this.fail('ERROR Element: ', this.name, 'is not clickable');
            }
        });
    }
    untilPresent(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitFor('present', protractor_1.ExpectedConditions.presenceOf(this), timeout);
            }
            catch (e) {
                this.fail('ERROR Element: ', this.name, 'is not present');
            }
        });
    }
    untilDisplayed(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitFor('visible', protractor_1.ExpectedConditions.visibilityOf(this), timeout);
            }
            catch (e) {
                this.fail('ERROR Element: ', this.name, 'is not displayed');
            }
        });
    }
    untilTextIsPresent(text, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let condition = protractor_1.ExpectedConditions.textToBePresentInElement(this, text);
                yield this.waitFor(`text ${text}`, condition, timeout);
            }
            catch (e) {
                this.fail('ERROR Element: ', this.name, 'text is not present');
            }
        });
    }
    untilTextIsPresentInValue(text, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let condition = protractor_1.ExpectedConditions.textToBePresentInElementValue(this, text);
                yield this.waitFor(`text ${text}`, condition, timeout);
            }
            catch (e) {
                this.fail('ERROR Element: ', this.name, 'text is not present in value');
            }
        });
    }
    untilHidden(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitFor('hidden', protractor_1.ExpectedConditions.invisibilityOf(this), timeout);
            }
            catch (e) {
                this.debug('Element: ', this.name, ' no longer exists.');
            }
        });
    }
    untilAbsent(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitFor('absence', protractor_1.ExpectedConditions.stalenessOf(this), timeout);
        });
    }
    clickWhenReady(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('click', () => __awaiter(this, void 0, void 0, function* () {
                yield this.untilDisplayed(timeout);
                yield this.untilClickable(timeout);
                yield this.click();
            }));
        });
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: may have to revert back to just until present
            // await this.untilPresent();
            yield this.untilDisplayed();
        });
    }
    waitFor(msg, condition, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let wait = timeout || support_1.DEFAULT_WAIT;
            this.debug(`waiting for "${msg}"`, `  | timeout: '${wait}'`);
            yield protractor_1.browser.wait(condition, wait);
            this.debug(`waiting for "${msg}"`, '  - OK');
        });
    }
    run(msg, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug(msg, '- ACTION STARTED');
            yield fn();
            this.debug(msg, '- DONE');
        });
    }
    getTextWhenReady(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.untilDisplayed(timeout);
            return this.getText();
        });
    }
    scrollIntoView() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.executeScript('arguments[0].scrollIntoView(true)', this.getWebElement());
        });
    }
}
exports.BaseElement = BaseElement;
class BaseElementArray extends protractor_1.ElementArrayFinder {
    constructor(wrapped, name = 'unnamed') {
        // see: clone https://github.com/angular/protractor/blob/5.2.0/lib/element.ts#L106
        super(wrapped.browser_, wrapped.getWebElements, wrapped.locator_, wrapped.actionResults_);
        this.name = name;
    }
    untilCount(compare, wait, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(untilCount(this, compare), wait, msg);
        });
    }
    ready(count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.untilCount(count);
            yield this.each((item, index) => __awaiter(this, void 0, void 0, function* () {
                let tempItem = new BaseElement(item, this.name + ' - ' + index);
                yield tempItem.ready();
            }));
        });
    }
    getTextWhenReady() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            return this.getText();
        });
    }
    untilHidden() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.each((item, index) => __awaiter(this, void 0, void 0, function* () {
                let tempItem = new BaseElement(item, this.name + ' - ' + index);
                try {
                    yield tempItem.untilHidden();
                }
                catch (e) {
                    this.debug('Element: ', tempItem.name, ' no longer exists.');
                }
            }));
        });
    }
}
exports.BaseElementArray = BaseElementArray;
class Clickable extends BaseElement {
    ready() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run('ready', () => __awaiter(this, void 0, void 0, function* () {
                yield _super("ready").call(this);
                yield this.untilClickable();
            }));
        });
    }
}
exports.Clickable = Clickable;
mixins.applyMixins(BaseElement, [mixins.Logging]);
mixins.applyMixins(BaseElementArray, [mixins.Logging]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5lbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdWkvYmFzZS5lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBa0c7QUFFbEcsb0NBQW9DO0FBQ3BDLHdDQUEwQztBQU8xQyxTQUFTLGtCQUFrQixDQUFDLE9BQXVCO0lBQ2pELElBQUksT0FBTyxPQUFPLElBQUksUUFBUSxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUM7S0FDcEM7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxRQUE0QixFQUFFLFdBQTJCO0lBQzNFLElBQUksT0FBTyxHQUFxQixrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRSxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQVNELE1BQWEsV0FBWSxTQUFRLDBCQUFhO0lBTzVDOzs7OztPQUtHO0lBQ0gsWUFBWSxPQUFzQixFQUFFLE9BQWUsU0FBUztRQUMxRCx1RUFBdUU7UUFDdkUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFkdkQsb0JBQW9CO1FBQ3BCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFjaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVLLGNBQWMsQ0FBQyxPQUFnQjs7WUFDbkMsSUFBSTtnQkFDRixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLCtCQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDekU7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFD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