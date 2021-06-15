import styled from '@emotion/styled';
import { ReactElement } from 'react';

export interface CharacterListTitleProps {
  title:string
}

const CharacterListTitleH2Style = styled.h2`
  border-bottom: 1px solid #eaeaea;
  margin: 10px 0 10px 0;
`

export const CharacterListTitle = (props:CharacterListTitleProps):ReactElement => {
  return (
    <CharacterListTitleH2Style>{props.title}</CharacterListTitleH2Style>
  )
};