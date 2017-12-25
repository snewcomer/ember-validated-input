# ember-validated-input

Most likely you will want to take this as a blueprint for your own input. I currently use it in my own projects and is beta.

NOTE: this addon depends on ember-changeset as a dependency in your own project to work.  Also this addon does not support its own styles.

## Installation

`ember install ember-validated-input`

## Usage

```hbs
{{#validated-input checkValidity=(action "checkValidity")}}
{{/validated-input}}
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
