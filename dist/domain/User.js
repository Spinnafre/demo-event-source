"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const reducer_1 = require("../shared/domain/events/reducer");
const UserWasCreated_1 = require("../shared/domain/events/user/UserWasCreated");
const UserWasDeleted_1 = require("../shared/domain/events/user/UserWasDeleted");
const UserWasUpdated_1 = require("../shared/domain/events/user/UserWasUpdated");
const Hasher_1 = __importDefault(require("../shared/utils/Hasher"));
class User {
    "id";
    "name" = "";
    "email" = "";
    "password" = "";
    "createdAt";
    "updatedAt";
    "deletedAt";
    eventsReducer;
    pendingEvents = [];
    persistentEvents = [];
    constructor(persistedEvents = []) {
        const handlers = {
            [UserWasCreated_1.UserWasCreated.eventName]: UserWasCreated_1.UserWasCreated.handler,
            [UserWasDeleted_1.UserWasDeleted.eventName]: UserWasDeleted_1.UserWasDeleted.handler,
            [UserWasUpdated_1.UserWasUpdated.eventName]: UserWasUpdated_1.UserWasUpdated.handler,
        };
        this.eventsReducer = new reducer_1.EventsReducer(handlers);
        if (persistedEvents.length > 0) {
            this.persistentEvents = persistedEvents;
            this.updateInternalState();
        }
    }
    static create(props) {
        if (!props.name || !props.email) {
            throw new Error("❌ Error : [User.create] : Missing params to create a user !");
        }
        const user = new User();
        const createdEvents = [
            new UserWasCreated_1.UserWasCreated({ ...props, id: (0, Hasher_1.default)(props.email) }),
        ];
        user.addPendingEvents(createdEvents);
        return user;
    }
    get endState() {
        const initialState = new User();
        const currentState = this.eventsReducer.reducer(initialState, this.events);
        return {
            ...currentState,
        };
    }
    get events() {
        return {
            ...this.persistentEvents,
            ...this.pendingEvents,
        };
    }
    updateInternalState() {
        const new_current_state = this.endState;
        for (const property of Object.keys(new_current_state)) {
            let current = Reflect.get(this, property);
            current = Reflect.get(new_current_state, property);
        }
    }
    addPendingEvents(events = []) {
        this.pendingEvents = this.pendingEvents.concat(events);
        this.removePendingEvents();
        return this;
    }
    removePendingEvents() {
        this.persistentEvents = this.persistentEvents.concat(this.pendingEvents);
        this.pendingEvents = [];
        return this;
    }
    delete() {
        this.addPendingEvents([new UserWasDeleted_1.UserWasDeleted(this)]);
        return this;
    }
    update(props) {
        this.addPendingEvents([new UserWasUpdated_1.UserWasUpdated(props)]);
        return this;
    }
}
exports.User = User;
