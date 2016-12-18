// Import Vue and the component being tested
var Vue = require('vue');
var MyComponent = require('../../app/src/components/Header.vue');
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('MyComponent', () => {
  // Inspect the raw component options
  it('has a mounted hook', () => {
    expect(typeof MyComponent.mounted).toBe('function')
  })
});
