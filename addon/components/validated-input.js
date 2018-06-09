import Ember from 'ember';
import Component from '@ember/component';
import layout from '../templates/components/validated-input';
import { get, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_TIMEOUT = Ember.testing ? 10 : 200;

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
  autocomplete: false,
  readonly: false,
  required: false,
  autofocus: false,
  showError: true,
  hasError: false,
  name: null,

  _checkValidity: task(function* (changeset, copyChangeset, valuePath, value) {
    yield timeout(DEBOUNCE_TIMEOUT);
    set(copyChangeset, valuePath, value);
    if (!copyChangeset.get(`error.${valuePath}`)) {
      set(changeset, valuePath, value);
      set(this, 'hasError', false);
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
     * @param {Object} copyChangeset - using changeset helper
     * @param {String} valuePath
     * @param {String|Integer} value
     */
    checkValidity(changeset, copyChangeset, value) {
      const valuePath = get(this, 'valuePath');
      get(this, '_checkValidity').perform(changeset, copyChangeset, valuePath, value);
    }
  }
});
