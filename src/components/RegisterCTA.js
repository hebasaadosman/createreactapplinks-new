import React from 'react'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { useStyletron } from 'baseui'
import { Button, SHAPE } from 'baseui/button'
import { FiExternalLink } from 'react-icons/fi'
import { Paragraph2 } from 'baseui/typography'
import Emoji from './Emoji'
import { navigate } from 'gatsby'

export default ({ title, description, currentPage }) => {
  const [css] = useStyletron()

  const ctaContainer = css({
    width: '100%',
    margin: '70px 0',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
    borderRadius: '15px',
    background: 'linear-gradient(-45deg, #23a6d5, #23d5ab)',
    // backgroundColor: 'rgb(238, 238, 238)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffff',
  })

  const ctaClass = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0',
  })

  const goToApp = () => {
    if (currentPage === 'Home') {
      trackCustomEvent({
        category: 'Premium',
        action: 'Click',
        label: `CTA ${currentPage}`,
      })
      navigate('/premium')
    }

    if (currentPage === 'Premium') {
      trackCustomEvent({
        category: 'App',
        action: 'Click',
        label: `CTA ${currentPage}`,
      })

      window.location.href = 'https://app.wa.link/register'
    }
  }
  return (
    <div className={ctaContainer}>
      <div
        className={css({
          padding: '20px',
        })}
      >
        <h2
          className={css({
            fontSize: '2rem',
            textAlign: 'center',
            margin: '30px 0',
          })}
        >
          {title}
        </h2>
        <Paragraph2 style={{ color: '#fff' }}>{description}</Paragraph2>
        <div className={ctaClass}>
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            })}
          >
            <div>
              <div
                className={css({
                  margin: '0 10px',
                })}
              >
                <Button
                  shape={SHAPE.pill}
                  onClick={goToApp}
                  startEnhancer={() => <FiExternalLink size={24} />}
                  overrides={{
                    BaseButton: {
                      style: {
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                      },
                    },
                  }}
                >
                  {currentPage === 'Home' ? (
                    <>
                      About Premium <Emoji symbol={'👑'} size={25} />
                    </>
                  ) : (
                    <>
                      Register <Emoji symbol={'👑'} size={25} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
