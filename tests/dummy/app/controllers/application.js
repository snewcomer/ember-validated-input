import Controller from '@ember/controller';
import { action } from 'ember-decorators/object';
import { set } from '@ember/object';

import {
  validatePresence
} from 'ember-changeset-validations/validators';

const NEW_MODEL = {
  title: validatePresence(true)
}

export default class App extends Controller {
  model = {
    title: ''
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
    return changeset.validate().then(() => {
      if (changeset.get('isValid')) {
        changeset.execute();
      }
    });
  }

  @action
  submitEvent() {}
}
