import { IUserProps } from "../../../../domain/User";
import { User } from "../../../../domain/User";
import { EventDomain } from "../contracts/DomainEvents";
declare class UserWasCreated extends EventDomain<IUserProps> {
    static readonly eventName = "user-was-created";
    constructor(payload: IUserProps);
    static handler(state: User, event: EventDomain<IUserProps>): User;
}
export { UserWasCreated };
