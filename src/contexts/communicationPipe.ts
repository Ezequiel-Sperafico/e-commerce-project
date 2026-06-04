import { createDefaultObjectFromEntry } from "../utils/createDefaultObjectFromEntry";
import { findMissingNumberFromArray } from "../utils/findMissingNumberFromArray";

export enum EEvent {
  WINDOW_TOGGLE = "WINDOW_TOGGLE",
  GENERIC = "GENERIC",
}

type TEventMetadataMap = {
  [EEvent.GENERIC]: void | undefined | null;
  [EEvent.WINDOW_TOGGLE]: {
    toggleWindow: "element" | "section" | "page" | "theme" | "media";
  };
};

interface ISubscriber<T extends EEvent = EEvent> {
  id: number;
  callback: TCallback<T>;
}

type TSubscriberPipes = {
  [Key in EEvent]: ISubscriber<Key>[];
};

type TCallback<T extends EEvent> = (args: TEventMetadataMap[T]) => void;

const subscribers: TSubscriberPipes = createDefaultObjectFromEntry(EEvent, []);

Object.fromEntries(
  (Object.keys(EEvent) as (keyof typeof EEvent)[]).map((KEv) => [
    EEvent[KEv],
    [] as ISubscriber<(typeof EEvent)[typeof KEv]>[],
  ]),
) as TSubscriberPipes;

function subscribe<T extends EEvent = EEvent>(
  eventPipe: T,
  callback: TCallback<T>,
) {
  const id = findMissingNumberFromArray(
    subscribers[eventPipe].map(({ id }) => id),
  );
  subscribers[eventPipe].push({
    id,
    callback,
  });

  return () => unsubscribe(eventPipe, id);
}

function unsubscribe<T extends EEvent = EEvent>(eventPipe: T, rmId: number) {
  subscribers[eventPipe] = subscribers[eventPipe].filter(
    ({ id }) => id !== rmId,
  ) as TSubscriberPipes[T];
}

function dispatch<T extends EEvent = EEvent>(
  eventPipe: T,
  metadata: TEventMetadataMap[T],
) {
  subscribers[eventPipe].forEach(({ callback }) => callback(metadata));
}

export const outLayerObserver = {
  subscribe,
  dispatch,
};
