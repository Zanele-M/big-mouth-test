import { SsmlObject } from './ssml-object';

describe('SsmlObject', () => {
  it('should create an instance', () => {
    expect(new SsmlObject("","","",[])).toBeTruthy();
  });
});
