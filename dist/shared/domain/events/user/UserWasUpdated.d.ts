import { IUserProps } from "../../../../domain/User";
import { User } from "../../../../domain/User";
import { EventDomain } from "../contracts/DomainEvents";
declare class UserWasUpdated extends EventDomain<Pick<IUserProps, "name" | "password">> {
    static readonly eventName = "user-was-updated";
    constructor(payload: Pick<IUserProps, "name" | "password">);
    static handler(state: User, event: EventDomain<IUserProps>): User;
}
export { UserWasUpdated };
