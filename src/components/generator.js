import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  PhoneInput,
  COUNTRIES,
  StyledFlag,
  CountrySelectDropdown,
} from 'baseui/phone-input'
import loadable from '@loadable/component'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import SuccessModal from './successModal'
import { Button, SHAPE, KIND } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import Emoji from '../components/Emoji'
import { Textarea } from 'baseui/textarea'
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js/min'
import QRCode from 'qrcode'
import { isMobile } from 'react-device-detect'

const EmojiSelector = loadable(() => import('../components/EmojiSelector'))

function createUrl(countryCode, phone, message) {
  return message
    ? 'https://api.whatsapp.com/send?phone=' +
        countryCode +
        phone +
        '&text=' +
        encodeURIComponent(message)
    : 'https://api.whatsapp.com/send?phone=' + countryCode + phone
}

function CustomFlag(props) {
  const { children, ...rest } = props
  return <StyledFlag iso={props.$iso} {...rest} />
}

const Generator = ({
  setGlobalPhone,
  setGlobalText,
  globalText,
  setShowBubble,
  focusElement,
}) => {
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState(COUNTRIES['US'])
  const [phoneError, setPhoneError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [waLink, setWaLink] = useState('')
  const [qrDataUrl, setQRDataUrl] = useState('')
  const phoneRef = useRef(null)

  const debouncedSearchTerm = useDebounce(globalText, 800)

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.get('https://ip2c.org/s')
        const countryCode = response.data.split(';')[1]
        setCountry(COUNTRIES[countryCode])
        localStorage.setItem('country', countryCode)
        console.log('called get country')
      } catch (e) {
        setCountry(COUNTRIES['US'])
        console.log('Error on getting user country')
      }
    }
    const localCountry = localStorage.getItem('country')
    if (localCountry) {
      try {
        setCountry(COUNTRIES[localCountry])
      } catch (e) {
        setCountry(COUNTRIES['US'])
      }
    } else {
      getCountry()
    }
  }, [])

  useEffect(() => {
    setGlobalPhone(`${country.dialCode} ${phone}`)
  }, [country, phone, setGlobalPhone])

  useEffect(() => {
    if (debouncedSearchTerm) {
      setShowBubble(true)
    }
  }, [debouncedSearchTerm, setShowBubble])

  useEffect(() => {
    if (focusElement === 'phone') {
      phoneRef.current.focus()
    }
  }, [focusElement])

  const generateQR = async text => {
    try {
      const imgData = await QRCode.toDataURL(text, { width: 300, margin: 2 })
      setQRDataUrl(imgData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (phoneError) setPhoneError('')
    if (messageError) setMessageError('')

    if (globalText.length > 1000)
      return setMessageError(
        'The message is too long, the maximum is 1000 characters'
      )
    const phoneNumber = parsePhoneNumberFromString(phone, country.id)

    if (phoneNumber) {
      if (phoneNumber.isValid()) {
        setLoading(true)
        const countryCode = country.dialCode.replace('+', '')
        const phoneWithOutCode = phoneNumber.number.replace(
          country.dialCode,
          ''
        )
        const request = {
          phone: phoneWithOutCode,
          countryCode: countryCode,
          message: globalText,
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '3SPdHlx5Kn8Wv3PYFwg5L6YAxBmFi3D06a8PDZvG',
          },
        }

        try {
          const response = await axios.post(
            'https://api.wa.link/v1/newlink',
            request,
            config
          )
          if (response.data.status === 'success') {
            const shortUrl = response.data.data.shortUrl
            setWaLink(shortUrl)
            generateQR(shortUrl)

            setOpenModal(true)
            setLoading(false)

            trackCustomEvent({
              category: 'Generator',
              action: 'Click',
              label: 'Successful Walink',
            })
          } else {
            trackCustomEvent({
              category: 'Generator',
              action: 'Error',
              label: 'Status error',
            })
            setLoading(false)
            return setMessageError(
              'Seems something happened while generating the link. Try again later'
            )
          }
        } catch (e) {
          trackCustomEvent({
            category: 'Generator',
            action: 'Error',
            label: 'API error',
          })
          setLoading(false)
          return setMessageError(
            'Can not generate link. Please try again later'
          )
        }
      } else {
        trackCustomEvent({
          category: 'Generator',
          action: 'Error',
          label: 'No valid phone',
        })
        return setPhoneError(
          "Check your phone number (maybe it's wrong) and try again."
        )
      }
    } else {
      trackCustomEvent({
        category: 'Generator',
        action: 'Error',
        label: 'No phone',
      })
      return setPhoneError(
        "Check your phone number (maybe it's wrong) and try again."
      )
    }
  }

  const handlePhoneChange = event => {
    const formatPhone = new AsYouType(country.id).input(
      event.currentTarget.value
    )
    setPhone(formatPhone)
    setPhoneError('')
  }

  const handelTextChange = value => {
    setGlobalText(value)
    setShowBubble(false)
  }

  const handleTestLink = () => {
    if (phoneError) setPhoneError('')
    if (messageError) setMessageError('')

    if (globalText.length > 1000)
      return setMessageError(
        'The message is too long, the maximum is 1000 characters'
      )
    const phoneNumber = parsePhoneNumberFromString(phone, country.id)

    if (phoneNumber) {
      if (phoneNumber.isValid()) {
        const countryCode = country.dialCode.replace('+', '')
        const phoneWithOutCode = phoneNumber.number.replace(
          country.dialCode,
          ''
        )
        const previewURL = createUrl(countryCode, phoneWithOutCode, globalText)
        trackCustomEvent({
          category: 'Generator',
          action: 'Click',
          label: 'Preview',
        })
        window.open(previewURL, '_blank')
      } else {
        return setPhoneError(
          "Check your phone number (maybe it's wrong) and try again."
        )
      }
    } else {
      return setPhoneError(
        "Check your phone number (maybe it's wrong) and try again."
      )
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        padding: 15,
        borderRadius: 15,
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl
          label="Type your WhatsApp phone number"
          caption="Remember to check your country code"
          error={phoneError}
        >
          <PhoneInput
            text={phone}
            inputRef={phoneRef}
            error={phoneError}
            country={country}
            placeholder="Your phone number here"
            onTextChange={e => handlePhoneChange(e)}
            onCountryChange={event => {
              setCountry(event.option)
              localStorage.setItem('country', event.option.id)
              console.log(event.option.id)
            }}
            overrides={{
              Input: {
                props: {
                  overrides: {
                    InputContainer: {
                      style: {
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                      },
                    },
                  },
                },
              },
              PhoneInput: {
                style: {
                  borderBottomLeftRadius: '10px',
                },
              },
              FlagContainer: {
                component: CustomFlag,
              },
              CountrySelect: {
                props: {
                  overrides: {
                    Dropdown: {
                      component: CountrySelectDropdown,
                    },
                  },
                },
              },
            }}
          />
        </FormControl>
        <FormControl
          caption="Example: “Hello, I want more info about the product”"
          label="Custom message"
          error={messageError}
        >
          <>
            {!isMobile && (
              <EmojiSelector
                hint="Add emoji"
                onSelect={emoji => setGlobalText(text => text + emoji)}
              />
            )}
            <Textarea
              placeholder="Add a custom message that users will send to you"
              onChange={e => handelTextChange(e.target.value)}
              value={globalText}
              error={messageError}
              overrides={{
                InputContainer: {
                  style: {
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                  },
                },
              }}
            />
          </>
        </FormControl>

        <div style={{ textAlign: 'center' }}>
          <Button
            shape={SHAPE.pill}
            kind={KIND.secondary}
            overrides={{
              BaseButton: {
                style: {
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                  width: '100%',
                },
              },
            }}
            type="button"
            onClick={handleTestLink}
          >
            Preview
          </Button>
          <p>- or -</p>
        </div>

        <Button
          shape={SHAPE.pill}
          isLoading={loading}
          overrides={{
            BaseButton: {
              style: {
                backgroundColor: '#00b66c',
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                width: '100%',
              },
            },
          }}
          type="submit"
          // onClick={handleSubmit}
        >
          Generate my wa.link <Emoji symbol={'😁'} size={20} />
        </Button>
      </form>

      {/* <div style={{ marginTop: '1rem' }}>
        <Notification
          kind={NotiKIND.warning}
          overrides={{
            Body: {
              style: {
                width: 'auto',
                borderTopRightRadius: '10px',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                textAlign: 'center',
              },
            },
          }}
        >
          We're currently experiencing intermittent unavailability on our link
          generator. If you get an error message please try again later.
        </Notification>
      </div> */}
      <SuccessModal
        waLink={waLink}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        qrDataUrl={qrDataUrl}
      />
    </div>
  )
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default Generator
