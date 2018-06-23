import Ember from 'ember';
import Component from '@ember/component';
import layout from '../templates/components/validated-input';
import { get, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIMEOUT = Ember.testing ? 10 : 150;

/**
  `validated-input`

  ## default usage

  ```handlebars
  {{validated-input
    changeset=changeset
    valuePath="name"
    type="text"
    placeholder="Name"
    required=true
  }}
  ```

  @class ValidatedInput
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  layout,

  classNames: ['validated-input'],
  classNameBindings: ['hasError:validated-input--error'],
  type: 'text',
  textarea: false,
  disabled: false,
  autocomplete: 'off',
  readonly: false,
  required: false,
  autofocus: false,
  showError: true,
  hasError: false,
  name: null,

  _checkValidity: task(function* (changeset, snapshot, valuePath, value) {
    yield timeout(DEBOUNCE_TIMEOUT);
    set(changeset, valuePath, value);
    if (!changeset.get(`error.${valuePath}`)) {
      set(this, 'hasError', false);
    } else {
      changeset.restore(snapshot);
    }
  }).restartable(),

  actions: {
    /**
     * @method validateProperty
     * @param {Object} changeset
     * @param {String} valuePath
     * @param {Object} e
     */
    validateProperty(changeset, valuePath, e) {
      set(changeset, valuePath, e.target.value);

      if (changeset.get(`error.${valuePath}`)) {
        set(this, 'hasError', true);
      } else {
        set(this, 'hasError', false);
      }

      if (get(this, 'onBlur')) {
        get(this, 'onBlur')(e);
      }
      if (get(this, 'onInput')) {
        get(this, 'onInput')(e);
      }
      // return changeset.validate(valuePath);
    },

    /**
     * @method checkValidity
     * @param {Object} changeset
     * @param {String|Integer} value
     */
    checkValidity(changeset, value) {
      const valuePath = get(this, 'valuePath');
      get(this, '_checkValidity').perform(changeset, changeset.snapshot(), valuePath, value);
    }
  }
});
