import { PubSub } from 'apollo-server';
import * as MESSAGE_EVENTS from './message.events.js';

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
};

export default new PubSub();
