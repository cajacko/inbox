import { Then } from 'cucumber';
import addButton from './AddButton.page';

Then('the add reminder button {string} visible', condition =>
  addButton.visible(condition));
