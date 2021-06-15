import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

const DOMAIN = 'https://www.anapioficeandfire.com'

export enum FILTER_PARAM_KEYS {
  NAME = 'name',
  GENDER = 'gender',
  CULTURE = 'culture',
  BORN = 'born',
  DIED = 'died',
  IS_ALIVE = 'isAlive'
}

export interface Filtered {
  [FILTER_PARAM_KEYS.NAME]?:string
  [FILTER_PARAM_KEYS.GENDER]?:string
  [FILTER_PARAM_KEYS.CULTURE]?:string
  [FILTER_PARAM_KEYS.BORN]?:string
  [FILTER_PARAM_KEYS.DIED]?:string
  [FILTER_PARAM_KEYS.IS_ALIVE]?:boolean
}

export interface FetchCharacterListItem {
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

export type FetchCharacterListResponse = FetchCharacterListItem[]

export class CharacterStore {
  fetchData:FetchCharacterListResponse = []
  data:FetchCharacterListResponse = []
  isInit:boolean = false
  pageCount:number = 1
  pageSize:number = 10

  constructor() {
    makeAutoObservable(this)
  }

  getData() {
    return this.data
  }

  setData(data:FetchCharacterListResponse) {
    this.data = data
  }

  async fetch(page?:number, filtered?:Filtered) {
    if (this.pageCount > this.pageSize) {
      return
    }

    if (page) {
      this.pageCount = page
    }

    const filteringParameters = filtered ?
      '&' + Object.entries(filtered).map(([key, value]) => `${key}=${value}`).join('&') :
      ''
    const res = await axios.get<FetchCharacterListResponse>(`${DOMAIN}/api/characters?page=${this.pageCount}&pageSize=10${filteringParameters}`)

    runInAction(() => {
      if (res.status !== 200) {
        throw new Error('SOMETHIN WRONG')
      }

      this.pageCount = this.pageCount + 1

      this.data = [
        ...this.data,
        ...res.data
      ]

      this.fetchData = [
        ...this.fetchData,
        ...res.data
      ]

      this.isInit = true
    })
  }
}