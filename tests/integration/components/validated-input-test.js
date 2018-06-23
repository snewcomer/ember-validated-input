import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, blur } from '@ember/test-helpers';
import Changeset from 'ember-changeset';
import { isPresent } from '@ember/utils';

const VALUE_PATH = 'title';

module('Integration | Component | validated input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    this.label = 'heyo';
    this.valuePath = VALUE_PATH;
    this.placeholder = VALUE_PATH;
    this.model = { name: '' };
    await render(hbs`{{validated-input label=label valuePath=valuePath placeholder=placeholder model=model}}`);
    assert.equal(find('input').getAttribute('placeholder'), VALUE_PATH);
    assert.equal(find('input').required, false, 'required is false');
    assert.equal(find('input').autocomplete, 'off', 'autocomplete is off');
    assert.equal(find('label').textContent, 'heyo', 'label works');
  });

  test('it renders textarea', async function(assert) {
    assert.expect(2);
    this.valuePath = VALUE_PATH;
    this.placeholder = VALUE_PATH;
    this.model = { name: '' };
    await render(hbs`{{validated-input valuePath=valuePath placeholder=placeholder textarea=true model=model}}`);
    assert.equal(find('textarea').getAttribute('placeholder'), VALUE_PATH);
    assert.equal(find('textarea').required, false, 'required is false');
  });

  test('it renders required', async function(assert) {
    assert.expect(2);
    this.valuePath = VALUE_PATH;
    this.required = true;
    this.model = { name: '' };
    await render(hbs`{{validated-input valuePath=valuePath required=required model=model}}`);
    assert.equal(find('input').required, true, 'has required attr');
    assert.equal(find('input').autofocus, false, 'autofocus default false');
  });

  test('it renders disabled', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.disabled = "disabled";
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath disabled=disabled}}`);
    assert.equal(find('input').disabled, true, 'has required attr');
  });

  test('it renders id', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath}}`);
    assert.equal(find('#title').id, 'title', 'has id attr');
  });

  test('it renders name', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.name = "email";
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath name=name}}`);
    assert.equal(find('[name=email]').name, 'email', 'has name attr');
  });

  test('textarea renders disabled', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.disabled = "disabled";
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath textarea=true disabled=disabled}}`);
    assert.equal(find('textarea').disabled, true, 'has required attr');
  });

  test('textarea renders name', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.name = "wat";
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath textarea=true name=name}}`);
    assert.equal(find('textarea').name, 'wat', 'has name attr');
  });

  test('textarea renders id', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath textarea=true}}`);
    assert.equal(find('#title').id, 'title', 'has id attr');
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
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath autofocus=autofocus}}`);
    assert.equal(find('input').autofocus, true, 'has autofocus');
  });

  test('type works', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.required = true;
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath type="number"}}`);
    assert.equal(find('input').type, 'number', 'has type set');
  });

  test('textarea works', async function(assert) {
    assert.expect(1);
    this.valuePath = VALUE_PATH;
    this.model = { name: '' };
    await render(hbs`{{validated-input model=model valuePath=valuePath textarea=true}}`);
    assert.equal(find('textarea').type, 'textarea', 'has textarea');
  });

  test('renders error', async function(assert) {
    this.model = {
      title: ''
    };
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath}}`);
    await fillIn('input', 'foo');
    await fillIn('input', '');
    await blur('input');
    assert.equal(find('.error').textContent.trim(), 'need a title');
  });

  test('calls onBlur', async function(assert) {
    assert.ok(true);
    this.model = {
      title: ''
    };
    this.onBlur = (evt) => {
      assert.ok(evt, 'evt passed');
    };
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath onBlur=onBlur}}`);
    await fillIn('input', 'foo');
    await blur('input');
  });

  test('calls onInput', async function(assert) {
    assert.ok(true);
    this.model = {
      title: ''
    };
    this.onInput = (evt) => {
      assert.ok(evt, 'evt passed');
    };
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath onInput=onInput}}`);
    await fillIn('input', 'foo');
  });

  test('textarea renders error', async function(assert) {
    this.model = {
      title: ''
    };
    let validator = ({ newValue }) => isPresent(newValue) || ['need a title'];
    this.changeset = new Changeset(this.model, validator);
    this.valuePath = VALUE_PATH;
    await render(hbs`{{validated-input model=model changeset=changeset valuePath=valuePath textarea=true}}`);
    await fillIn('textarea', 'foo');
    await fillIn('textarea', '');
    await blur('textarea');
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
    await render(hbs`{{validated-input model=model showError=showError changeset=changeset valuePath=valuePath}}`);
    await fillIn('input', 'foo');
    await fillIn('input', '');
    await blur('input');
    assert.equal(find('.error'), null);
  });

});
