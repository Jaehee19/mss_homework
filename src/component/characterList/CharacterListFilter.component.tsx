import styled from '@emotion/styled';
import { ReactElement, useEffect, useState } from 'react';
import { useCharacterStore } from '../store/character/useCharacterStore';
import { CharacterListItem } from './CharacterListItems.component';

type FilterFunc = (data:CharacterListItem) => boolean
interface FilterItem {
  text:string,
  filterFunc:FilterFunc
}

const TabListUlStyle = styled.ul`
  display:flex;
  padding-bottom: 10px;
  overflow: auto hidden;
`

const TabListLiStyle = styled.li`
  margin-right: 10px;
`

export const CharacterListFilter = ():ReactElement => {
  const characterStore = useCharacterStore()
  const [activeFilter, setActiveFilter] = useState<string[]>([])

  const itemData:Record<string, FilterItem> = {
    isAlive: {
      text: '생존인물만',
      filterFunc: data => data.died === ''
    },
    female: {
      text: '여자',
      filterFunc: data => data.gender === 'Female'
    },
    noTvSeries: {
      text: 'tvSeries 없음',
      filterFunc: data => data.tvSeries.length === 0
    },
    haveTvSeriesMoreThenTwo: {
      text: 'tvSeries 2개 이상',
      filterFunc: data => data.tvSeries.length > 2
    }
  }

  useEffect(() => {
    characterStore.setData(characterStore.fetchData)

    const filteredData = characterStore.data.filter((data) => {
      if (activeFilter.length === 0) {
        return true
      }

      let bool = true

      activeFilter.forEach(key => {
        bool = bool && itemData[key].filterFunc(data)
      })

      return bool
    })

    characterStore.setData(filteredData);
  }, [activeFilter])

  return (
    <TabListUlStyle>
      {
        Object.keys(itemData).map((key, idx) => {
          return (
            <TabListLiStyle key={idx}>
              <button
                style={{
                  background: activeFilter.includes(key) ? 'black' : 'white',
                  color: activeFilter.includes(key) ? 'white' : 'black'
                }}
                onClick={() => {
                  const setData = activeFilter.includes(key) ?
                    activeFilter.filter(_key => _key !== key) :
                    [...activeFilter, key]

                  setActiveFilter(setData)
                }}
              >
                {itemData[key].text}
              </button>
            </TabListLiStyle>
          )
        })
      }
      <TabListLiStyle>
        <button onClick={() => { setActiveFilter([])}}>초기화</button>
      </TabListLiStyle>
    </TabListUlStyle>
  )
};