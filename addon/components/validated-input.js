import Component from '@ember/component';
import layout from '../templates/components/validated-input';
import { get, set } from '@ember/object';
import { assert } from '@ember/debug';

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
    checkValidity=(action "checkValidity")
  }}
  ```

  @class ValidatedInput
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  layout,

  classNames: ['validated-input'],
  type: 'text',
  required: false,

  didInsertElement() {
    this._super(...arguments)

    if (!get(this, 'checkValidity')) {
      assert('You must pass an action `checkValidity`', get(this, 'checkValidity'));
    }
  },
  
  actions: {
    /**
     * @method validateProperty 
     * @param {Object} changeset 
     * @param {String} valuePath 
     * @param {Object} e 
     */
    validateProperty(changeset, valuePath, e) {
      set(changeset, valuePath, e.target.value);
      // return changeset.validate(valuePath);
    },
    /**
     * outer component can check on-input
     * optional
     * @method checkValidity
     * @param {String|Integer} value 
     */
    checkValidity(value) {
      if (get(this, 'checkValidity')) {
        get(this, 'checkValidity')(value);
      }
    }
  }
});
