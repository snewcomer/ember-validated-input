import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';

import {
  validatePresence,
  validateLength,
  validateConfirmation
} from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  title: validatePresence(true),
  name: validatePresence(true),
  password: validatePresence(true),
  passwordConfirmation: [
    validateLength({ min: 6 }),
    validateConfirmation({ on: 'password' })
  ]
}

export default class App extends Controller {
  model = {
    title: '',
    name: ''
  }

  validations = NEW_MODEL;

  /**
   * called when hitting enter or clicking button
   * applies underlying changes to data model
   *
   * @method validate
   * @param {Object} changeset
   */
  @action
  validate(changeset) {
    changeset.validate();
    if (changeset.get('isValid')) {
      changeset.execute();
    }
  }

  @action
  submitEvent() {}
}
