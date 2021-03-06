"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addRole_1 = __importDefault(require("./commands/addRole"));
const check_1 = __importDefault(require("./commands/check"));
const emote_1 = __importDefault(require("./commands/emote"));
const ping_1 = __importDefault(require("./commands/ping"));
const roleInfo_1 = __importDefault(require("./commands/roleInfo"));
const roles_1 = __importDefault(require("./commands/roles"));
const yoink_1 = __importDefault(require("./commands/yoink"));
const who_1 = __importDefault(require("./commands/who"));
const test_1 = __importDefault(require("./commands/test"));
const point_1 = __importDefault(require("./commands/point"));
const commandHandler = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const splitBySpaces = message.cleanContent.split(" ");
    const textCommand = splitBySpaces[0].split("!");
    const assumedMainCommand = textCommand[1].toLowerCase();
    const assumedFirstArgument = splitBySpaces[1];
    // mom?.send(`${assumedMainnCommand} from ${message.channel} in ${message.guild}`);
    // i love switch dont tell anyone theyll call me cringe and unfunctionalpilled
    switch (assumedMainCommand) {
        case "check":
            (0, check_1.default)(message);
            return;
        case "ping":
            (0, ping_1.default)(message);
            return;
        case "addrole":
            const roleString = splitBySpaces.slice(1).join(" ");
            (0, addRole_1.default)(message, roleString);
            return;
        case "roleinfo":
            (0, roleInfo_1.default)(message, assumedFirstArgument);
            return;
        case "roles":
            (0, roles_1.default)(message);
            return;
        case "emote":
            (0, emote_1.default)(message, assumedFirstArgument);
            return;
        case "yoink":
            (0, yoink_1.default)(message, assumedFirstArgument);
            return;
        case "who":
            (0, who_1.default)(message, assumedFirstArgument);
            return;
        case "test":
            (0, test_1.default)(message);
            return;
        case "point":
            if (message.mentions.repliedUser) {
                return (0, point_1.default)(message, message.mentions.repliedUser.id);
            }
            else if ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.size) {
                return (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.forEach((member) => (0, point_1.default)(message, member.id));
            }
            else if (assumedFirstArgument === "random") {
                const members = yield ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.fetch());
                const memberArray = Object.values((members === null || members === void 0 ? void 0 : members.toJSON()) || {}) || [];
                const count = memberArray.length;
                const target = memberArray.length > 0
                    ? memberArray[Math.floor(Math.random() * count)]
                    : message.author;
                (0, point_1.default)(message, target.id);
            }
            else {
                (0, point_1.default)(message, message.author.id);
            }
        default:
            return;
    }
});
exports.default = commandHandler;
//# sourceMappingURL=commandHandler.js.map