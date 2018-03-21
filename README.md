ember-validated-input
==============================================================================
Most likely you will want to take this as a blueprint for your own input. I currently use it in my own projects and is beta.

NOTE: this addon depends on ember-changeset as a dependency in your own project to work.  Also this addon does not support its own styles.

## Installation

`ember install ember-validated-input`

## Usage

```hbs
{{validated-input
  model=model
  valuePath="username"
  changeset=changeset
  required=true
  placeholder="Username"
}}
```

### API

- required
  - default false
- model
  - Ember Data model or plain pojo
- valuePath
  - value defined on the model
  - also create #id on element
- changeset
  - a valid Changeset from ember-changeset
- label
  - add you own css for the label to be hidden if need be (https://www.w3.org/WAI/tutorials/forms/labels/)
- placeholder
- type
  - default "text"
- textarea
  - default false
- autofocus
  - default false
- autoresize
  - textarea only, default true
- readonly
  - default false
- disabled
  - default false
- autocomplete
  - default false
- name
  - default null
- showError
  - default true

Installation
------------------------------------------------------------------------------

```
ember install ember-validated-input
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-validated-input`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
