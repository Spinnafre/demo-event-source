"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDomain = void 0;
class EventDomain {
    id;
    name;
    data;
    timestamp;
    constructor(name, data, id = null) {
        this.id = id ?? Date.now().toString(16);
        this.name = name;
        this.data = data;
        this.timestamp = new Date();
    }
}
exports.EventDomain = EventDomain;
