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
const planner_1 = require("../page_objects/planner");
const support = require("../support");
describe('Work Item list: ', () => {
    let planner;
    let c = new support.Constants();
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield support.desktopTestSetup();
        planner = new planner_1.PlannerPage(protractor_1.browser.baseUrl);
        yield planner.openInBrowser();
        yield planner.waitUntilUrlContains('typegroup');
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield planner.waitUntilUrlContains('typegroup');
        yield planner.ready();
        yield planner.workItemList.overlay.untilHidden();
    }));
    it('Should Quick create UnicodeSymbols workitems', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = {
            title: 'Ω≈ç√∫˜µ≤≥÷åß∂ƒ©˙∆˚¬…æœ∑´®†¥¨ˆøπ“‘¡™£¢∞§¶•ªº–≠¸˛Ç◊ı˜Â¯˘¿ÅÍÎÏ˝ÓÔÒÚÆ☃Œ„´‰ˇÁ¨ˆØ∏”’`⁄€‹›ﬁﬂ‡°·‚—±⅛⅜⅝⅞ЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя٠١٢٣٤٥٦٧٨٩',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
    }));
    it('Should Quick Create TwoByteCharacters workitems', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = {
            title: '田中さんにあげて下さいパーティーへ行かないか和製漢語部落格사회과학원 어학연구소찦차를 타고 온 펲시맨과 쑛다리 똠방각하社會科學院語學研',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
    }));
    it('Should Quick Create JapaneseEmoticons workitems', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = {
            title: 'ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ(｡◕ ∀ ◕｡)｀ｨ(´∀｀∩__ﾛ(,_,*)・(￣∀￣)・:*:ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ,。・:*:・゜’( ☻ ω ☻ )。・:*:・゜’(╯°□°）╯︵ ┻━┻)(ﾉಥ益ಥ）ﾉ﻿ ┻━┻┬─┬ノ( º _ ºノ)( ͡° ͜ʖ ͡°)',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
    }));
    it('Should Quick Create RightToLeftStrings workitems', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = {
            title: 'בְּרֵאשִׁית, בָּרָא אֱלֹהִים, אֵת הַשָּׁמַיִם, וְאֵת הָאָרֶץم نفس سقطت وبالتحديد،, جزيرتي باستخدام أن دنو. إذ هنا؟ الستار وتنصيب كان. أهّل ايطاليا، بريطانيا-فرنسا قد أخذ. سليمان، إتفاقية بين ما',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
    }));
    it('Should Quick Create ScriptInjection workitems', () => __awaiter(this, void 0, void 0, function* () {
        let newWorkItem = {
            title: '<script>alert(123)</script> &lt;script&gt;alert(&#39;123&#39;);&lt;/script&gt; <img src=x onerror=alert(123) /> <svg><script>123<1>alert(123)</script>',
        };
        yield planner.createWorkItem(newWorkItem);
        expect(yield planner.workItemList.hasWorkItem(newWorkItem.title)).toBeTruthy();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2l0ZW0tbmF1Z2h0eS1zdHJpbmcuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NwZWNzL3dvcmtpdGVtLW5hdWdodHktc3RyaW5nLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUFxQztBQUNyQyxxREFBc0Q7QUFDdEQsc0NBQXNDO0FBR3RDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDaEMsSUFBSSxPQUFvQixDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWhDLFNBQVMsQ0FBQyxHQUFTLEVBQUU7UUFDbkIsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEdBQUcsSUFBSSxxQkFBVyxDQUFDLG9CQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUIsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxHQUFTLEVBQUU7UUFDcEIsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFLEdBQVMsRUFBRTtRQUM1RCxJQUFJLFdBQVcsR0FBRztZQUNoQixLQUFLLEVBQ0gsMkxBQTJMO1NBQzlMLENBQUM7UUFDRixNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakYsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFTLEVBQUU7UUFDL0QsSUFBSSxXQUFXLEdBQUc7WUFDaEIsS0FBSyxFQUNILHdFQUF3RTtTQUMzRSxDQUFDO1FBQ0YsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pGLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBUyxFQUFFO1FBQy9ELElBQUksV0FBVyxHQUFHO1lBQ2hCLEtBQUssRUFDSCxpSkFBaUo7U0FDcEosQ0FBQztRQUNGLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqRixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQVMsRUFBRTtRQUNoRSxJQUFJLFdBQVcsR0FBRztZQUNoQixLQUFLLEVBQ0gsbU1BQW1NO1NBQ3RNLENBQUM7UUFDRixNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakYsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFTLEVBQUU7UUFDN0QsSUFBSSxXQUFXLEdBQUc7WUFDaEIsS0FBSyxFQUNILHdKQUF3SjtTQUMzSixDQUFDO1FBQ0YsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9