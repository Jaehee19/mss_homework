import { createContext, FC } from "react";
import { CharacterStore } from "./Character.store";

const characterStore = new CharacterStore()

export const CharacterStoreContext = createContext(characterStore);

export const CharacterStoreProvider:FC = (props) => {
  return (
    <CharacterStoreContext.Provider value={characterStore}>
      {props.children}
    </CharacterStoreContext.Provider>
  )
}