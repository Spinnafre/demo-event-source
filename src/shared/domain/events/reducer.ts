import { EventDomain, IEvent } from "./contracts/DomainEvents";

type EventsHandlers = {
  // user-was-created : handler(state,event)
  [event_name: string]: (state: any, event: any) => any;
};

/*
    Sua função é processar todos os eventos em um único estado, gerando de fato
    o estado final de tal estado de uma entidade.
*/
export class EventsReducer {
  // Event Listeners
  private eventsHandlers: EventsHandlers = {};

  constructor(eventsHandlers: EventsHandlers) {
    this.eventsHandlers = eventsHandlers;
  }

  // Irá de fato atualizar o estado para a versão mais atual com base em todos os eventos passados
  reducer<U>(state: U, events: IEvent[]): any {
    return events.reduce((prevState, currentEvent) => {
      const cloneState = JSON.parse(JSON.stringify(prevState));
      return this.eventsHandlers[currentEvent.name](cloneState, currentEvent);
    }, state);
  }
}
