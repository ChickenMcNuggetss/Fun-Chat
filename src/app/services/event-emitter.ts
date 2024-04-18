export type Listener<K> = (data: K) => void;

interface IEvent<K> {
  [eventName: string]: Listener<K>[];
}

export class EventEmitter<K> {
  private events: IEvent<K> = {};

  public subscribeListener(eventName: string, listener: Listener<K>) {
    if (this.events[eventName]) {
      this.events[eventName].push(listener);
    }
    this.events[eventName] = [listener];
  }

  public emitEvent(eventName: string, data: K) {
    const listenerList = this.events[eventName];
    listenerList?.forEach((listener) => listener(data));
  }

  public unsubscribeListener(eventName: string, listener: Listener<K>) {
    const listenerList = this.events[eventName];
    const index = listenerList.indexOf(listener);
    if (index !== -1) listenerList.slice(index, index + 1);
  }
}

export const authEmitter = new EventEmitter();
