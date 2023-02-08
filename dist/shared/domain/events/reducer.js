"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsReducer = void 0;
class EventsReducer {
    eventsHandlers = {};
    constructor(eventsHandlers) {
        this.eventsHandlers = eventsHandlers;
    }
    reducer(state, events) {
        events.reduce(() => {
            return {};
        }, 0);
    }
}
exports.EventsReducer = EventsReducer;
