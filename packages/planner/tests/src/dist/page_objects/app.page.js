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
const ui_1 = require("../ui");
const base_page_1 = require("./base.page");
class AppPage extends base_page_1.BasePage {
    /**
     * Extend this class, to describe Application Page(after logging in)
     *
     * @param {url} string URL where the extended page resides
     */
    constructor(url) {
        super(url);
        this.appTag = protractor_1.$('f8-app');
        this.mainNavBar = new ui_1.BaseElement(protractor_1.$('header ul.navbar-primary.persistent-secondary'), 'Main Navigation Bar');
        this.planTab = new ui_1.Clickable(this.mainNavBar.element(protractor_1.by.xpath("//span[text()='Plan']")), 'Plan Tab');
        this.backLogTab = new ui_1.Clickable(this.mainNavBar.element(protractor_1.by.xpath("//span[text()=' Backlog ']")), 'Backlog Tab');
        this.boardTab = new ui_1.Clickable(this.mainNavBar.element(protractor_1.by.xpath("//span[text()=' Board ']")), 'Board Tab');
        this.QueryTab = new ui_1.Clickable(protractor_1.element(protractor_1.by.cssContainingText('.nav.persistent-secondary li>a', 'Query')), 'Query Tab');
    }
    /**
     * Returns an instance of the BaseElement that can be found using
     * the {css} and contains the {text}.
     *
     * @param {ui} The Base Element Class e.g. Button, TextInput
     * @param {css}  Css within the appTag that identifies the element
     * @param {text} text in the element
     *
     */
    innerElement(ui, css, text) {
        const element = this.appTag.element(protractor_1.by.cssContainingText(css, text));
        return new ui(element, text);
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(protractor_1.ExpectedConditions.visibilityOf(this.appTag));
        });
    }
    clickPlanTab() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.planTab.clickWhenReady();
        });
    }
    clickBacklogTab() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.backLogTab.clickWhenReady();
        });
    }
    clickBoardTab() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.boardTab.clickWhenReady();
        });
    }
    clickQueryTab() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.QueryTab.clickWhenReady();
        });
    }
}
exports.AppPage = AppPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9wYWdlX29iamVjdHMvYXBwLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFrRjtBQUVsRiw4QkFBK0M7QUFDL0MsMkNBQXVDO0FBRXZDLE1BQXNCLE9BQVEsU0FBUSxvQkFBUTtJQW9CNUM7Ozs7T0FJRztJQUNILFlBQVksR0FBWTtRQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUF6QmIsV0FBTSxHQUFHLGNBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQixlQUFVLEdBQUcsSUFBSSxnQkFBVyxDQUMxQixjQUFDLENBQUMsK0NBQStDLENBQUMsRUFDbEQscUJBQXFCLENBQ3RCLENBQUM7UUFDRixZQUFPLEdBQUcsSUFBSSxjQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEcsZUFBVSxHQUFHLElBQUksY0FBUyxDQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFFLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFDL0QsYUFBYSxDQUNkLENBQUM7UUFDRixhQUFRLEdBQUcsSUFBSSxjQUFTLENBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQUUsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxFQUM3RCxXQUFXLENBQ1osQ0FBQztRQUNGLGFBQVEsR0FBRyxJQUFJLGNBQVMsQ0FDdEIsb0JBQU8sQ0FBQyxlQUFFLENBQUMsaUJBQWlCLENBQUMsZ0NBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFDeEUsV0FBVyxDQUNaLENBQUM7SUFTRixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLENBQUMsRUFBc0IsRUFBRSxHQUFXLEVBQUUsSUFBWTtRQUM1RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVLLEtBQUs7O1lBQ1QsTUFBTSxvQkFBTyxDQUFDLElBQUksQ0FBQywrQkFBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNoQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRUssZUFBZTs7WUFDbkIsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLENBQUM7S0FBQTtJQUVLLGFBQWE7O1lBQ2pCLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFFSyxhQUFhOztZQUNqQixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkMsQ0FBQztLQUFBO0NBQ0Y7QUE5REQsMEJBOERDIn0=