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
const support = require("../support");
var PageOpenMode;
(function (PageOpenMode) {
    PageOpenMode[PageOpenMode["AlreadyOpened"] = 0] = "AlreadyOpened";
    PageOpenMode[PageOpenMode["RefreshBrowser"] = 1] = "RefreshBrowser";
})(PageOpenMode = exports.PageOpenMode || (exports.PageOpenMode = {}));
class BasePage {
    constructor(url) {
        // add logging mixin
        this.name = '...';
        this.url = url;
        this.debug(`url: '${url}'`);
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    open(mode = PageOpenMode.AlreadyOpened) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mode === PageOpenMode.RefreshBrowser) {
                yield this.openInBrowser();
            }
            yield this.ready();
            this.log('Opened');
            return this;
        });
    }
    openInBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.url === undefined) {
                throw Error('Trying to open an undefined url');
            }
            this.log('Authenticating with Auth and Refresh token');
            yield support.loginWithTokens();
            this.log('Opening', this.url);
            let currentUrl = yield protractor_1.browser.getCurrentUrl();
            this.debug('at  :', currentUrl);
            this.debug(`goto: '${this.url}'`);
            yield protractor_1.browser.get(this.url);
            let urlNow = yield protractor_1.browser.getCurrentUrl();
            this.debug('now :', urlNow);
            // wait for page to load
            yield this.waitUntilUrlContains('typegroup');
            yield this.waitUntilTitleContains('Plan');
        });
    }
    waitUntilUrlContains(text, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.urlContains(text), timeout);
        });
    }
    waitUntilTitleContains(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.titleContains('Plan'));
        });
    }
}
exports.BasePage = BasePage;
mixins.applyMixins(BasePage, [mixins.Logging]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGFnZV9vYmplY3RzL2Jhc2UucGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXlEO0FBQ3pELG9DQUFvQztBQUNwQyxzQ0FBc0M7QUFFdEMsSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3RCLGlFQUFhLENBQUE7SUFDYixtRUFBYyxDQUFBO0FBQ2hCLENBQUMsRUFIVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQUVELE1BQXNCLFFBQVE7SUFjNUIsWUFBWSxHQUFZO1FBYnhCLG9CQUFvQjtRQUVwQixTQUFJLEdBQVcsS0FBSyxDQUFDO1FBWW5CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVLLEtBQUs7OERBQUksQ0FBQztLQUFBO0lBRVYsSUFBSSxDQUFDLE9BQXFCLFlBQVksQ0FBQyxhQUFhOztZQUN4RCxJQUFJLElBQUksS0FBSyxZQUFZLENBQUMsY0FBYyxFQUFFO2dCQUN4QyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUM1QjtZQUVELE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFSyxhQUFhOztZQUNqQixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUMxQixNQUFNLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLFVBQVUsR0FBRyxNQUFNLG9CQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sb0JBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTVCLElBQUksTUFBTSxHQUFHLE1BQU0sb0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1Qix3QkFBd0I7WUFDeEIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUFBO0lBRUssb0JBQW9CLENBQUMsSUFBWSxFQUFFLE9BQWdCOztZQUN2RCxNQUFNLG9CQUFPLENBQUMsSUFBSSxDQUFDLCtCQUFrQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRSxDQUFDO0tBQUE7SUFFSyxzQkFBc0IsQ0FBQyxLQUFhOztZQUN4QyxNQUFNLG9CQUFPLENBQUMsSUFBSSxDQUFDLCtCQUFrQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7S0FBQTtDQUNGO0FBMURELDRCQTBEQztBQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMifQ==