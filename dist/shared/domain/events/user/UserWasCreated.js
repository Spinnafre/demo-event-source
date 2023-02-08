"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWasCreated = void 0;
const DomainEvents_1 = require("../contracts/DomainEvents");
class UserWasCreated extends DomainEvents_1.EventDomain {
    static eventName = "user-was-created";
    constructor(payload) {
        super(UserWasCreated.eventName, payload);
    }
    static handler(state, event) {
        state.id = event.id;
        state.name = event.name;
        state.password = event.data.password;
        state.email = event.data.email;
        state.createdAt = event.timestamp;
        state.updatedAt = event.timestamp;
        return state;
    }
}
exports.UserWasCreated = UserWasCreated;
