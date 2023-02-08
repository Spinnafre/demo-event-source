import { IUserProps } from "../../../../domain/User";
import { User } from "../../../../domain/User";
import { EventDomain } from "../contracts/DomainEvents";

class UserWasDeleted extends EventDomain<IUserProps> {
  static readonly eventName = "user-was-created";

  constructor(payload: IUserProps) {
    super(UserWasDeleted.eventName, payload);
  }

  // handler : método estático assiciado ao evento
  static handler(state: User, event: EventDomain<IUserProps>): User {
    state.deletedAt = event.timestamp;
    state.updatedAt = event.timestamp;

    return state;
  }
}

export { UserWasDeleted };
