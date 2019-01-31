import { Then, When } from 'cucumber';
import addButton from './AddButton.page';

Then('the add reminder button {string} visible', condition =>
  addButton.visible(condition));

When('the add reminder button is pressed', () => addButton.press());
