import { useContext } from "react"
import { CharacterStoreContext } from "./CharacterStore.provider"

export const useCharacterStore = () => {
  const store = useContext(CharacterStoreContext)

  if (store === undefined) {
    throw new Error('Store Empty')
  }

  return store
}