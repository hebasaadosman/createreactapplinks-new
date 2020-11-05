import React, { useState } from 'react'
import { Input, SIZE } from 'baseui/input'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { Button, SHAPE, SIZE as ButtonSize } from 'baseui/button'
import { Notification, KIND } from 'baseui/notification'
import { Search } from 'baseui/icon'
import { useStyletron } from 'baseui'
import { FiExternalLink } from 'react-icons/fi'
import Emoji from './Emoji'
import axios from 'axios'
import { toaster, ToasterContainer } from 'baseui/toast'

const SearchLink = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)
  const [isNotAvailable, setIsNotAvailable] = useState(false)
  const [showSearchButton, setShowSearchButton] = useState(true)
  const [css] = useStyletron()

  const searchUser = async () => {
    if (!user || user.length < 3)
      return toaster.negative(<>The link must be 3 characters or more</>)
    setLoading(true)
    try {
      const response = await axios.get(`https://search.wa.link/${user}`)
      console.log(response.data)
      if (response.data.available) {
        setIsAvailable(true)
        setIsNotAvailable(false)
      } else {
        setIsAvailable(false)
        setIsNotAvailable(true)
      }
      setShowSearchButton(false)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)

      return toaster.negative(
        <>We couldn't check the link. Try again later</>
      )
    }
  }

  const handleChangeUser = e => {
    const cleanUser = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '')
    setUser(cleanUser)
    setIsAvailable(false)
    setIsNotAvailable(false)
    setShowSearchButton(true)
  }

  const resetState = () => {
    setShowSearchButton(true)
    setIsNotAvailable(false)
    setIsAvailable(false)
  }

  const goToApp = () => {
    trackCustomEvent({
      category: 'App',
      action: 'Click',
      label: 'CTA Search',
    })
    window.location.href = 'https://app.wa.link/register'
  }

  const searchContainer = css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  })

  const searchCard = css({
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    borderRadius: '10px',
    padding: '0.5rem',
  })

  return (
    <>
      <div className={searchCard}>
        <div className={searchContainer}>
          <Input
            size={SIZE.large}
            placeholder="YourBrand"
            onChange={handleChangeUser}
            value={user}
            overrides={{
              InputContainer: {
                style: {
                  borderTopRightRadius: '10px',
                  borderTopLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
                },
              },
              Root: {
                style: {
                  width: '70%',
                  marginLeft: '1rem',
                  marginRight: '1rem',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  borderTopRightRadius: '10px',
                  borderTopLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  '@media screen and (max-width: 620px)': {
                    width: '100%',
                  },
                },
              },
            }}
          />
          {showSearchButton && (
            <Button
              shape={SHAPE.pill}
              startEnhancer={() => <Search size={24} />}
              isLoading={loading}
              onClick={searchUser}
              overrides={{
                BaseButton: {
                  style: {
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: '#00b66c',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                  },
                },
              }}
            >
              Search link
            </Button>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isAvailable && (
            <Notification
              closeable
              kind={KIND.positive}
              onClose={resetState}
              overrides={{
                Body: {
                  style: {
                    width: '100%',
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    textAlign: 'center',
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                  },
                },
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p style={{ textAlign: 'center' }}>
                  <Emoji symbol={'🎉'} />{' '}
                  <strong
                    style={{
                      fontSize: '1.2rem',
                      wordBreak: 'break-all',
                      hyphens: 'auto',
                    }}
                  >
                    wa.link/{user}
                  </strong>
                  <Emoji symbol={'🎉'} /> is available! Get it now for $6 USD
                  before someone else does.
                </p>
                <Button
                  onClick={goToApp}
                  kind={KIND.secondary}
                  shape={SHAPE.pill}
                  startEnhancer={() => <FiExternalLink size={24} />}
                  size={ButtonSize.compact}
                  overrides={{
                    BaseButton: {
                      style: {
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                      },
                    },
                  }}
                >
                  Buy it now!
                </Button>
              </div>
            </Notification>
          )}
          {isNotAvailable && (
            <Notification
              closeable
              onClose={resetState}
              kind={KIND.negative}
              overrides={{
                Body: {
                  style: {
                    width: '100%',
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    textAlign: 'center',
                  },
                },
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <p style={{ textAlign: 'center' }}>
                  <Emoji symbol={'😭'} />{' '}
                  <strong style={{ fontSize: '1.2rem' }}>
                    wa.link/{user}{' '}
                  </strong>
                  <Emoji symbol={'😭'} /> Not available. Please try another
                  user.
                </p>
              </div>
            </Notification>
          )}
        </div>
      </div>
      <ToasterContainer
        overrides={{
          ToastBody: {
            style: {
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
            },
          },
        }}
      />
    </>
  )
}

export default SearchLink
