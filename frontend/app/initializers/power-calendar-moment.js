import { registerDateLibrary } from 'ember-power-calendar';
import DateUtils from 'ember-power-calendar-moment';

// This function will automatically run when the Ember application boots up.
export function initialize() {
  registerDateLibrary(DateUtils);
}

export default {
  initialize,
};
