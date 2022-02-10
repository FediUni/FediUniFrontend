"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.message = new rxjs_1.Subject();
    }
    MessageService.prototype.sendMessage = function (message) {
        this.message.next(message);
    };
    MessageService.prototype.clearMessages = function () {
        this.message = new rxjs_1.Subject();
    };
    MessageService.prototype.onMessage = function () {
        return this.message.asObservable();
    };
    MessageService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
