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
const fs = require("fs");
const protractor_1 = require("protractor");
var BrowserMode;
(function (BrowserMode) {
    BrowserMode[BrowserMode["Phone"] = 0] = "Phone";
    BrowserMode[BrowserMode["Tablet"] = 1] = "Tablet";
    BrowserMode[BrowserMode["Desktop"] = 2] = "Desktop";
})(BrowserMode = exports.BrowserMode || (exports.BrowserMode = {}));
exports.seconds = (n) => n * 1000;
exports.minutes = (n) => n * exports.seconds(60);
exports.DEFAULT_WAIT = exports.seconds(60);
exports.LONG_WAIT = exports.minutes(3);
exports.LONGER_WAIT = exports.minutes(10);
exports.LONGEST_WAIT = exports.minutes(30);
function setBrowserMode(mode) {
    return __awaiter(this, void 0, void 0, function* () {
        let window = protractor_1.browser.driver.manage().window();
        switch (mode) {
            case BrowserMode.Phone:
                yield window.setSize(430, 667);
                break;
            case BrowserMode.Tablet:
                yield window.setSize(768, 1024);
                break;
            case BrowserMode.Desktop:
                yield window.setSize(1920, 1080);
                break;
            default:
                throw Error('Unknown mode');
        }
    });
}
exports.setBrowserMode = setBrowserMode;
function desktopTestSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield setBrowserMode(BrowserMode.Desktop);
    });
}
exports.desktopTestSetup = desktopTestSetup;
/*
 * The function uses auth and refresh tokens to login
 */
function loginWithTokens() {
    return __awaiter(this, void 0, void 0, function* () {
        // Bypass login by supplying auth and refresh token
        protractor_1.browser.get(protractor_1.browser.baseUrl + '/?token_json=' + protractor_1.browser.token);
    });
}
exports.loginWithTokens = loginWithTokens;
/*
 * Joins the arguments as URI paths ensuring there's exactly one '/' between each path entry
 */
function joinURIPath(...args) {
    // TODO: improve this method using available modules for uri operations
    let answer = null;
    for (let i = 0, j = arguments.length; i < j; i++) {
        let arg = arguments[i];
        if (i === 0 || !answer) {
            answer = arg;
        }
        else {
            if (!answer.endsWith('/')) {
                answer += '/';
            }
            if (arg.startsWith('/')) {
                arg = arg.substring(1);
            }
            answer += arg;
        }
    }
    return answer;
}
exports.joinURIPath = joinURIPath;
/**
 * Write screenshot to file
 * Example usage:
 *   support.writeScreenshot('exception1.png');
 *
 * Ref: http://blog.ng-book.com/taking-screenshots-with-protractor/
 */
function writeScreenshot(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        let png = yield protractor_1.browser.takeScreenshot();
        let stream = fs.createWriteStream(filename);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
        info(`Saved screenshot to: ${filename}`);
    });
}
exports.writeScreenshot = writeScreenshot;
function timestamp() {
    let date = new Date();
    let time = date.toLocaleTimeString('en-US', { hour12: false });
    let ms = (date.getMilliseconds() + 1000).toString().substr(1);
    return `${time}.${ms}`;
}
function debugEnabled(...msg) {
    console.log(`[${timestamp()}]:`, ...msg);
}
function debugNoop(...msg) { }
function info(...msg) {
    console.info(`[${timestamp()}]:`, ...msg);
}
exports.info = info;
exports.debug = process.env.DEBUG ? debugEnabled : debugNoop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3N1cHBvcnQvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDJDQUFxQztBQUVyQyxJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDckIsK0NBQUssQ0FBQTtJQUNMLGlEQUFNLENBQUE7SUFDTixtREFBTyxDQUFBO0FBQ1QsQ0FBQyxFQUpXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBSXRCO0FBRVksUUFBQSxPQUFPLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEMsUUFBQSxPQUFPLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxlQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFekMsUUFBQSxZQUFZLEdBQUcsZUFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLFFBQUEsU0FBUyxHQUFHLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixRQUFBLFdBQVcsR0FBRyxlQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUIsUUFBQSxZQUFZLEdBQUcsZUFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRXhDLFNBQXNCLGNBQWMsQ0FBQyxJQUFpQjs7UUFDcEQsSUFBSSxNQUFNLEdBQUcsb0JBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFdBQVcsQ0FBQyxLQUFLO2dCQUNwQixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixNQUFNO1lBQ1IsS0FBSyxXQUFXLENBQUMsTUFBTTtnQkFDckIsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFD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