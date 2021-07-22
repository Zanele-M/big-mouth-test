import { Phoneme } from './phoneme';

describe('Phoneme', () => {
  it('should create an instance', () => {
    expect(new Phoneme("",[],[])).toBeTruthy();
  });
});
