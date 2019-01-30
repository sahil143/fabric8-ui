"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const support_1 = require("../support");
class Logging {
    constructor() {
        this.name = '';
    }
    log(action, ...msg) {
        let className = this.constructor.name;
        support_1.info(`${action}: ${className}('${this.name}')`, ...msg);
    }
    debug(context, ...msg) {
        let className = this.constructor.name;
        support_1.debug(`${className}('${this.name}'): ${context}`, ...msg);
    }
    fail(action, ...msg) {
        let className = this.constructor.name;
        /* to display errors in red */
        console.error('\x1b[31m%s', `${action}: ${className}('${this.name}')`, ...msg, '\x1b[0m');
    }
}
exports.Logging = Logging;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21peGlucy9sb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXlDO0FBRXpDLE1BQWEsT0FBTztJQUFwQjtRQUNFLFNBQUksR0FBVyxFQUFFLENBQUM7SUFpQnBCLENBQUM7SUFmQyxHQUFHLENBQUMsTUFBYyxFQUFFLEdBQUcsR0FBYTtRQUNsQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN0QyxjQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssU0FBUyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZSxFQUFFLEdBQUcsR0FBYTtRQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN0QyxlQUFLLENBQUMsR0FBRyxTQUFTLEtBQUssSUFBSSxDQUFDLElBQUksT0FBTyxPQUFPLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxJQUFJLENBQUMsTUFBYyxFQUFFLEdBQUcsR0FBYTtRQUNuQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN0Qyw4QkFBOEI7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxNQUFNLEtBQUssU0FBUyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxHQUFHLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1RixDQUFDO0NBQ0Y7QUFsQkQsMEJBa0JDIn0=