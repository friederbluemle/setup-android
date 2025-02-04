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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const sdk_installer_1 = require("./sdk-installer");
const exec = __importStar(require("@actions/exec"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const platformInput = core.getInput('platform', { required: true });
            const platform = Number(platformInput);
            console.log(`Platform level: ${platform}`);
            const buildToolsInput = core.getInput('build-tools');
            const buildTools = String(buildToolsInput);
            console.log(`Build tools: ${buildTools}`);
            const script = core.getInput('script');
            console.log('Installing Android SDK...');
            yield sdk_installer_1.installAndroidSdk(platform, buildTools);
            console.log('Executing script...');
            yield exec.exec(`${script}`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
