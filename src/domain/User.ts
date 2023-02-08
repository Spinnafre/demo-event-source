import { IEvent } from "./../shared/domain/events/contracts/DomainEvents";
import { EventDomain } from "../shared/domain/events/contracts/DomainEvents";
import { EventsReducer } from "../shared/domain/events/reducer";
import { UserWasCreated } from "../shared/domain/events/user/UserWasCreated";
import { UserWasDeleted } from "../shared/domain/events/user/UserWasDeleted";
import { UserWasUpdated } from "../shared/domain/events/user/UserWasUpdated";

import hasher from "../shared/utils/Hasher";

export type IUserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

interface IEventReducer {
  [event_name: string]: (state: any, event: any) => any;
}

class User implements IUserProps {
  public "id"?: string;
  public "name" = "";
  public "email" = "";
  public "password" = "";
  public "createdAt"?: Date;
  public "updatedAt"?: Date;
  public "deletedAt"?: Date;

  /*
    Irá ser o responsável por receber o estado e eventos e com base nos seus handlers de eventos 
    passado na sua criação da instância, irá processar todos os eventos adicionando respectivamentes
    ao estado até o estado ficar na versão mais atual.
  */
  private eventsReducer: EventsReducer;

  // Events
  private pendingEvents: Array<EventDomain<any>> = []; // Eventos que estão na memória e ainda não foram salvos
  private persistentEvents: Array<EventDomain<any>> = []; // Eventos que já foram persistidos

  constructor(persistedEvents: Array<EventDomain<any>> = []) {
    const handlers = {
      [UserWasCreated.eventName]: UserWasCreated.handler,
      [UserWasDeleted.eventName]: UserWasDeleted.handler,
      [UserWasUpdated.eventName]: UserWasUpdated.handler,
    };

    this.eventsReducer = new EventsReducer(handlers);

    // Se estiver injetando eventos anteriores já persistido, como estou criando um estado
    // novo então terá que realizar a redução de todos os eventos passados e assim criar
    // tal entidade com seu estado final.
    if (persistedEvents.length > 0) {
      this.persistentEvents = persistedEvents;
      //Vai ter que atualizar o meu estado rodando todos os eventos passados
      this.updateInternalState();
    }
  }

  // Irá apenas criar uma entidade com atributos e estado nulo e irá adionar o evento
  // de criação para depois ser usado na redução dos eventos para gerar o estado final.
  static create(props: IUserProps): User {
    if (!props.name || !props.email) {
      throw new Error(
        "❌ Error : [User.create] : Missing params to create a user !"
      );
    }

    // Toda entidade começa com um estado inicial e a ideia é que ele seja alterado por meio de
    // eventos, por isso que crio primeiro um user com dados nulos e só depois ao chamar o getter
    // state será realizado a computação dos eventos gerando o estado final da entidade.
    const user = new User();

    const createdEvents = [
      new UserWasCreated({ ...props, id: hasher(props.email) }),
    ];

    user.addPendingEvents(createdEvents);

    return user;
  }
  // Sempre que for chamado, irá ter que computar todos os meus eventos passados e assim
  // irá criar o estado final.
  get endState() {
    const initialState = new User();
    const currentState = this.eventsReducer.reducer<User>(
      initialState,
      this.events
    );

    return {
      ...currentState,
    };
  }

  // Pega os eventos de acordo com a ordem crononológica que deverá ser executado, respeitando
  // primeiro os já persistidos e só assim depois adicionar os pendentes.
  get events(): Array<EventDomain<any>> {
    return [...this.persistentEvents, ...this.pendingEvents];
  }

  private updateInternalState() {
    const new_current_state: any = this.endState;

    //Atualiza as propriedades do objeto criado a partir das propriedades do estado computado
    for (const property of Object.keys(new_current_state)) {
      let current = Reflect.get(this, property);
      current = Reflect.get(new_current_state, property);
    }
  }

  addPendingEvents(events: Array<EventDomain<any>> = []): this {
    this.pendingEvents = this.pendingEvents.concat(events);
    this.removePendingEvents();
    return this;
  }

  removePendingEvents(): this {
    this.persistentEvents = this.persistentEvents.concat(this.pendingEvents);
    this.pendingEvents = [];
    return this;
  }

  delete(): this {
    this.addPendingEvents([new UserWasDeleted(this)]);
    return this;
  }

  update(props: Pick<IUserProps, "name" | "password">): this {
    this.addPendingEvents([new UserWasUpdated(props)]);
    return this;
  }
}

export { User };
