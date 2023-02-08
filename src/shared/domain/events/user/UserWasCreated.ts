import { IUserProps } from "../../../../domain/User";
import { User } from "../../../../domain/User";
import { EventDomain } from "../contracts/DomainEvents";

class UserWasCreated extends EventDomain<IUserProps> {
  static readonly eventName = "user-was-created";

  constructor(payload: IUserProps) {
    super(UserWasCreated.eventName, payload);
  }

  // handler : método estático assiciado ao evento
  static handler(state: User, event: EventDomain<IUserProps>): User {
    state.id = event.id;
    state.name = event.name;
    state.password = event.data.password;
    state.email = event.data.email;
    state.createdAt = event.timestamp;
    state.updatedAt = event.timestamp;

    return state;
  }
}

export { UserWasCreated };
