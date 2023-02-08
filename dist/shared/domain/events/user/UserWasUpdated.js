"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWasUpdated = void 0;
const DomainEvents_1 = require("../contracts/DomainEvents");
class UserWasUpdated extends DomainEvents_1.EventDomain {
    static eventName = "user-was-updated";
    constructor(payload) {
        super(UserWasUpdated.eventName, payload);
    }
    static handler(state, event) {
        state.email = event.data.email;
        state.password = event.data.password ?? state.password;
        state.updatedAt = event.timestamp;
        return state;
    }
}
exports.UserWasUpdated = UserWasUpdated;
