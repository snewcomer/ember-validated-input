import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, blur } from 'ember-native-dom-helpers';
import Changeset from 'ember-changeset';
import { isPresent } from '@ember/utils';

const VALUE_PATH = 'title';

module('Integration | Component | validated input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    this.valuePath = VALUE_PATH;
    this.placeholder = VALUE_PATH;
    await render(hbs`{{validated-input valuePath=valuePath placeholder=placeholder checkValidity=checkValidity}}`);
    assert.equal(find('input').getAttribute('placeholder'), VALUE_PATH);
    assert.equal(find('input').required, false, 'required is false');
  });

  test('it renders required', async function(assert) {
    assert.expect(2);
    this.valuePath = VALUE_PATH;
    this.required = true;
    await render(hbs`{{validated-input valuePath=valuePath required=required checkValidity=checkValidity}}`);
    assert.equal(find('input').required, true, 'has required attr');
    assert.equal(find('input').autofocus, false, 'autofocus default false');
  });

  test('autofocus works', async function(assert) {
    assert.expect(1);
    this.model = { 
      title: ''
    };
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    this.autofocus = true;
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath autofocus=autofocus checkValidity=checkValidity}}`);
    assert.equal(find('input').autofocus, true, 'has autofocus');
  });

  test('type works', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.required = true;
    await render(hbs`{{validated-input valuePath=valuePath type="number" checkValidity=checkValidity}}`);
    assert.equal(find('input').type, 'number', 'has type set');
  });

  test('renders error', async function(assert) {
    this.model = { 
      title: ''
    };
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath checkValidity=checkValidity}}`);
    await fillIn('input', 'foo');
    await fillIn('input', '');
    await blur('input');
    assert.equal(find('.error').textContent.trim(), 'need a title');
  });

  test('does not render error if false', async function(assert) {
    this.model = { 
      title: ''
    };
    this.showError = false;
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input model=model showError=showError changeset=changeset valuePath=valuePath checkValidity=checkValidity}}`);
    await fillIn('input', 'foo');
    await fillIn('input', '');
    await blur('input');
    assert.equal(find('.error'), null);
  });

});
