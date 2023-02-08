"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWasDeleted = void 0;
const DomainEvents_1 = require("../contracts/DomainEvents");
class UserWasDeleted extends DomainEvents_1.EventDomain {
    static eventName = "user-was-created";
    constructor(payload) {
        super(UserWasDeleted.eventName, payload);
    }
    static handler(state, event) {
        state.deletedAt = event.timestamp;
        state.updatedAt = event.timestamp;
        return state;
    }
}
exports.UserWasDeleted = UserWasDeleted;
