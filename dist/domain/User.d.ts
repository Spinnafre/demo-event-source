import { EventDomain } from "../shared/domain/events/contracts/DomainEvents";
export type IUserProps = {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};
declare class User implements IUserProps {
    "id"?: string;
    "name": string;
    "email": string;
    "password": string;
    "createdAt"?: Date;
    "updatedAt"?: Date;
    "deletedAt"?: Date;
    private eventsReducer;
    private pendingEvents;
    private persistentEvents;
    constructor(persistedEvents?: Array<EventDomain<any>>);
    static create(props: IUserProps): User;
    get endState(): any;
    get events(): Array<EventDomain<any>>;
    private updateInternalState;
    addPendingEvents(events?: Array<EventDomain<any>>): this;
    removePendingEvents(): this;
    delete(): this;
    update(props: Pick<IUserProps, "name" | "password">): this;
}
export { User };
