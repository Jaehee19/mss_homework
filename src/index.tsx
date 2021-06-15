import ReactDOM from 'react-dom';
import { CharacterList } from './component/characterList/index.component';
import { CharacterStoreProvider } from './component/store/character/CharacterStore.provider';
import { GlobalStyle } from './GlobalStyle.component';

ReactDOM.render(
  <CharacterStoreProvider>
    <GlobalStyle />
    <CharacterList/>
  </CharacterStoreProvider>,
  document.getElementById('character-list')
);