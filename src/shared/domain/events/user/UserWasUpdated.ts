import { IUserProps } from "../../../../domain/User";
import { User } from "../../../../domain/User";
import { EventDomain } from "../contracts/DomainEvents";

class UserWasUpdated extends EventDomain<
  Pick<IUserProps, "name" | "password">
> {
  static readonly eventName = "user-was-updated";

  constructor(payload: Pick<IUserProps, "name" | "password">) {
    super(UserWasUpdated.eventName, payload);
  }

  // handler : método estático assiciado ao evento
  static handler(state: User, event: EventDomain<IUserProps>): User {
    state.email = event.data.email;
    state.password = event.data.password ?? state.password;
    state.updatedAt = event.timestamp;

    return state;
  }
}

export { UserWasUpdated };
