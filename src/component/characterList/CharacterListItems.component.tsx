import styled from '@emotion/styled';
import { ReactElement, useRef } from 'react';
import { useCharacterStore } from '../store/character/useCharacterStore';

export interface CharacterListItem {
  url:string
  name:string
  gender:string
  culture:string
  born:string
  died:string
  titles:string[]
  aliases:string[]
  father:string
  mother:string
  spouse:string
  allegiances:string[]
  books:string[]	
  povBooks:string[]
  tvSeries:string[]
  playedBy:string[]
}

export type CharacterListResponse = CharacterListItem[]

export interface CharacterListItemsProps {
  items: CharacterListResponse
}

const CharacterListItemsLiStyle = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  & h3 {
    margin: 6px;
  }

  & button {
    width: 50px;
    height: 30px;
  }
`

const CharacterListItemDescDivStyle = styled.div`
  width: calc(100% - 70px);
  & h3, p {
    margin: 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
  }
`

export const CharacterListItems = (props:CharacterListItemsProps):ReactElement => {
  const characterStore = useCharacterStore()

  return (
    <ul>
      {
        props.items.map((item, idx) => {
          return (
            <CharacterListItemsLiStyle
              key={item.name + '-' + idx}
            >
              <CharacterListItemDescDivStyle>
                <h3>name: {item.name}</h3>
                <p>aliases: {item.aliases.join(',')}</p>
                <p>title: {item.titles.join(',')}</p>
                <p>books: {item.books.length}</p>
                <p>tvSeries: {item.tvSeries.length}</p>
              </CharacterListItemDescDivStyle>
              <button
                onClick={() =>{
                  characterStore.setData(characterStore.data.filter((data, _idx) => _idx !== idx))
                }}
              >삭제</button>
            </CharacterListItemsLiStyle>
          )
        })
      }
    </ul>
  )
};