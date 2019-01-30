"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui = require("../../ui");
const workitem_quickpreview_1 = require("./workitem-quickpreview");
class WorkItemDetailPage extends workitem_quickpreview_1.WorkItemQuickPreview {
    constructor() {
        super(...arguments);
        this.detailPageDiv = new ui.BaseElement(this.$('#wi-detail-form'), 'wi detail page');
    }
}
exports.WorkItemDetailPage = WorkItemDetailPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0tZGV0YWlscGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VpL3BsYW5uZXIvd29ya2l0ZW0tZGV0YWlscGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUMvQixtRUFBK0Q7QUFFL0QsTUFBYSxrQkFBbUIsU0FBUSw0Q0FBb0I7SUFBNUQ7O1FBQ0Usa0JBQWEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDbEYsQ0FBQztDQUFBO0FBRkQsZ0RBRUMifQ==