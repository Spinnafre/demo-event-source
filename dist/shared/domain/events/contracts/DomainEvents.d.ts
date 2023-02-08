export declare abstract class EventDomain<T> {
    readonly id: string;
    readonly name: string;
    readonly data: T;
    readonly timestamp: Date;
    constructor(name: string, data: T, id?: null);
}
