import React from 'react'
import { Button, SHAPE } from 'baseui/button'
import { useStyletron } from 'baseui'
import ArrowDown from 'baseui/icon/arrow-down'
import whatsAppIcon from '../images/WhatsApp-0e878a0fa68c61b06e781cee2e6bc71f.svg'
import Emoji from '../components/Emoji'
import scrollTo from 'gatsby-plugin-smoothscroll'

export default () => {
  const [css] = useStyletron()

  return (
    <div style={{background:"linear-gradient(-45deg,#23a6d5,#23d5ab)"}}>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className={css({
              maxWidth: '600px',
              margin: '60px 10px 10px 10px',
              // background: 'rgb(255,255,255,0.9)',

              // boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              // padding: '0 30px',
              // borderRadius: '15px',
              '@media screen and (max-width: 528px)': {
                margin: '50px 10px 0px 10px',
              },
              '@media screen and (max-width: 468px)': {
                margin: '30px 10px 0px 10px',
              },
              '@media screen and (max-width: 350px)': {
                margin: '20px 10px 0px 10px',
              },
            })}
          >
            <div
              className={css({
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              })}
            >
              <h1 className={css({ fontSize: '2.5rem', color: 'white' })}>
                Create WhatsApp links
              </h1>
              <img
                src={whatsAppIcon}
                alt="whatsapp link"
                className={css({
                  height: '60px',
                  margin: '5px',
                })}
              />
            </div>
            <div className={css({ textAlign: 'center', margin: '10px auto' })}>
              <h2 className={css({ color: 'white' })}>
                Walink is the most popular WhatsApp short link generator
                worldwide <Emoji symbol={'🌎'} size={25} />
              </h2>
            </div>
            <div
              className={css({
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px',
                marginTop: '30px',
              })}
            >
              <Button
                onClick={() => {
                  scrollTo('#create-link')
                }}
                endEnhancer={() => <ArrowDown size={24} />}
                shape={SHAPE.pill}
                overrides={{
                  BaseButton: {
                    style: {
                      backgroundColor: '#00b66c',
                      boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                    },
                  },
                }}
              >
                Create WhatsApp link
              </Button>
            </div>
          </div>
        </div>
        <div style={{position:"relative", maxHeight:"40px",color:"#fff" ,overflow:"hidden"}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,0L120,10.7C240,21,480,43,720,42.7C960,43,1200,21,1320,10.7L1440,0L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
