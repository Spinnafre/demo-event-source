import { EventDomain } from "./contracts/DomainEvents";
type EventsHandlers = {
    [event_name: string]: (state: any, event: any) => any;
};
export declare class EventsReducer {
    private eventsHandlers;
    constructor(eventsHandlers: EventsHandlers);
    reducer<U, E>(state: U, events: Array<EventDomain<E>>): any;
}
export {};
