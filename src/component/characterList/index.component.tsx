import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { ReactElement, useEffect, useRef } from 'react';
import { useCharacterStore } from '../store/character/useCharacterStore';
import { CharacterListFilter } from './CharacterListFilter.component';
import { CharacterListItems } from './CharacterListItems.component';
import { CharacterListTitle } from './CharacterListTitle.component';

const CharacterListSectionStyle = styled.section`
  margin: 0 auto;
  padding: 10px;
  max-width: 640px;
  min-width: 360px;
  height: 100vh;
  overflow: hidden auto;
`

export const CharacterList = observer(():ReactElement => {
  const characterStore = useCharacterStore()
  const rootRef = useRef<HTMLDivElement>(null)
  const observableRef = useRef<HTMLDivElement>(null)
  let IO:IntersectionObserver|null = null

  useEffect(() => {
    characterStore.fetch()
  }, [])

  useEffect(() => {
    IO = new IntersectionObserver((entries:IntersectionObserverEntry[], io:IntersectionObserver):void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          characterStore.fetch()
          IO?.unobserve(entry.target)
        }
      })
    }, {
      root:rootRef.current,
      threshold: 1.0
    })

    observableRef.current && IO.observe(observableRef.current)
  }, [characterStore.fetchData])

  return (
    <CharacterListSectionStyle
      ref={rootRef}
    >
      <CharacterListTitle title={'Musinsa homework'}/>
      <CharacterListFilter />
      {
        characterStore.data &&
          <CharacterListItems items={characterStore.data}/>
      }
      {
        characterStore.data.length > 0 &&
          <div ref={observableRef}></div>
      }
    </CharacterListSectionStyle>
  )
});