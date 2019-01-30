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
class Settings extends ui.BaseElement {
    constructor(el, name = 'Settings') {
        super(el, name);
        this.settingsDropdownDiv = new ui.BaseElement(this.$('.f8-table-config__settings-dropdown'), 'settings div');
        this.settingsDropDown = new ui.Dropdown(this.$('.f8-table-config__settings .dropdown-toggle'), this.$('.f8-table-config__settings-dropdown'));
        this.moveToDisplayedAttributeButton = new ui.Clickable(this.settingsDropdownDiv.$("span[tooltip='Move to Displayed Attributes']"), 'move to displayed attribute');
        this.moveToAvailableAttributeButton = new ui.Clickable(this.settingsDropdownDiv.$("span[tooltip='Move to Available Attributes']"), 'move to available attribute');
        this.close = new ui.Clickable(this.settingsDropdownDiv.$('.fa-close.btn'), ' close button');
    }
    settingready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.settingsDropDown.ready();
        });
    }
    clickSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.settingsDropDown.ready();
            yield this.settingsDropDown.clickWhenReady();
        });
    }
    selectAttribute(AttributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.settingsDropDown.select(AttributeValue);
        });
    }
    moveToDisplayedAttribute() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.moveToDisplayedAttributeButton.clickWhenReady();
            yield this.close.clickWhenReady();
        });
    }
    moveToAvailableAttribute() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.moveToAvailableAttributeButton.clickWhenReady();
            yield this.close.clickWhenReady();
        });
    }
}
exports.Settings = Settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi91aS9wbGFubmVyL3NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwrQkFBK0I7QUFFL0IsTUFBYSxRQUFTLFNBQVEsRUFBRSxDQUFDLFdBQVc7SUFtQjFDLFlBQVksRUFBaUIsRUFBRSxJQUFJLEdBQUcsVUFBVTtRQUM5QyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBbkJsQix3QkFBbUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMscUNBQXFDLENBQUMsRUFDN0MsY0FBYyxDQUNmLENBQUM7UUFDRixxQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsNkNBQTZDLENBQUMsRUFDckQsSUFBSSxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUM5QyxDQUFDO1FBQ0YsbUNBQThCLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUMvQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLDhDQUE4QyxDQUFDLEVBQzFFLDZCQUE2QixDQUM5QixDQUFDO1FBQ0YsbUNBQThCLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUMvQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLDhDQUE4QyxDQUFDLEVBQzFFLDZCQUE2QixDQUM5QixDQUFDO1FBQ0YsVUFBSyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBSXZGLENBQUM7SUFFSyxZQUFZOztZQUNoQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0tBQUE7SUFFSyxhQUFhOztZQUNqQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQyxDQUFDO0tBQUE7SUFFSyxlQUFlLENBQUMsY0FBc0I7O1lBQzFDLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7SUFFSyx3QkFBd0I7O1lBQzVCLE1BQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFSyx3QkFBd0I7O1lBQzVCLE1BQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNELE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwQyxDQUFDO0tBQUE7Q0FDRjtBQTdDRCw0QkE2Q0MifQ==