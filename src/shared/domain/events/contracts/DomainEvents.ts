export type IEvent = {
  id: string;
  name: string;
  data: any;
  timestamp: Date;
};

export abstract class EventDomain<T> implements IEvent {
  public readonly id: string;
  public readonly name: string;
  public readonly data: T;
  public readonly timestamp: Date;

  constructor(name: string, data: T, id = null) {
    this.id = id ?? Date.now().toString(16);
    this.name = name;
    this.data = data;
    this.timestamp = new Date();
  }
}
