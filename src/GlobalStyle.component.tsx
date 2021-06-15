import { Global, css } from '@emotion/react';
import { ReactElement } from 'react';

export const GlobalStyle = ():ReactElement => {
  return (
    <>
      <Global
        styles={
          css`
            html,body, ul, li {
              margin: 0px;
              padding: 0px;
            }

            img {
              width: 100%;
              height: 100%;
            }

            li {
              list-style-type: none;
            }

            a {
              color: #000;
              text-decoration: none;
            }

            div, section {
              box-sizing: border-box;
            }
          `
        }
      />
    </>
  )
};