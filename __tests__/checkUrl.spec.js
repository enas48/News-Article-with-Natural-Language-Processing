import { checkForUrl } from '../src/client/js/urlChecker';
import { handleSubmit } from '../src/client/js/formHandler';
describe('check url function', () => {
  // test stuff
  test('it should return true if input url', () => {
    const url = 'https://www.youtube.com/';
    expect(checkForUrl(url)).toBeTruthy();
  });
  test('The function should be defined', () => {
    const url = 'https://www.youtube.com/';
    expect(checkForUrl(url)).toBeDefined();
  });
});
