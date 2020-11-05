import React, { useRef, useState } from 'react'
import { useStyletron } from 'baseui'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { Button, SHAPE, SIZE } from 'baseui/button'
import { FiExternalLink } from 'react-icons/fi'
import Emoji from './Emoji'

const BenefitsSlider = () => {
  const [css] = useStyletron()
  const [isDown, setIsDown] = useState(false)
  const [left, setLeft] = useState(0)
  const [startX, setStartX] = useState(0)
  const slider = useRef()

  const benefitsContainer = css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  })

  const benefits = css({
    width: '100%',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    // minHeight: '250px',
    display: 'flex',
    overflowX: 'auto',
    cursor: 'grab',
    /* width */
    '::-webkit-scrollbar': {
      height: '5px',
      width: '5px',
      borderRadius: '5px',
    },

    /* Track */
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '10px',
    },

    /* Handle */
    '::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '10px',
    },

    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  })

  const benefitCard = css({
    padding: '1rem',
    margin: '0.6rem 0.5rem',
    minWidth: '280px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px',
    borderRadius: '10px',
  })

  const lastCard = css({
    padding: '1rem',
    margin: '1rem',
    minWidth: '300px',
    // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px',
    borderRadius: '10px',
    textAlign: 'center',
  })

  const mousedown = e => {
    setIsDown(true)
    setStartX(e.pageX - slider.current.offsetLeft)
    setLeft(slider.current.scrollLeft)
  }
  const mouseleave = () => {
    setIsDown(false)
  }

  const mouseup = () => {
    setIsDown(false)
  }

  const mousemove = e => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - slider.current.offsetLeft
    const walk = (x - startX) * 2 //scroll-fast
    slider.current.scrollLeft = left - walk
  }

  const goToApp = () => {
    trackCustomEvent({
      category: 'App',
      action: 'Click',
      label: `CTA Benefits`,
    })

    window.location.href = '#'
  }
    return (
        <div className={benefitsContainer}>
        <div
        className={benefits}
        ref={slider}
        onMouseDown={mousedown}
        onMouseLeave={mouseleave}
        onMouseUp={mouseup}
        onMouseMove={mousemove}
      >
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="🤩" size={25} /> Conversion rate
          </h3>
          <p>
            When users see a <strong>wa.link </strong> they immediately know it
            will take them to <strong>WhatsApp</strong> when they click it,
            increasing your business conversion rate.
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="🔗" size={25} /> Shortlink
          </h3>
          <p>
            Every wa.link can <strong>contain a custom message</strong> without
            affecting the length of your link.
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="️🕵️" size={25} /> Privacy
          </h3>
          <p>
            Privacy is important,
            <strong> Walink does not expose your phone number</strong> or the
            custom message to the web without consent.
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="📱" size={25} />
            Accessibility
          </h3>
          <p>
            Every link comes with its own <strong>QR code</strong> containing
            the same information as the link.
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="💬" size={25} /> Priority
          </h3>
          <p>
            As your phone number is not exposed that guarantees that the{' '}
            <strong>user will first reach you on WhatsApp</strong> before
            calling.
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="📺" size={25} /> Omnichannel
          </h3>
          <p>
            Custom links are perfect for traditional media too (like radio, tv,
            flyers, etc.) because it is{' '}
            <strong>
              easier to remember a brand’s name than a phone number.
            </strong>
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="🎯" size={25} /> Case insensitive
          </h3>
          <p>
            Links are case insensitive so users will always reach you no matter
            if they click a variation of the link like:
            <br />
            <strong> wa.link/YourBrand</strong>
            <br />
            <strong> wa.link/YOURBRAND</strong>
            <br />
            <strong> wa.link/yourbrand</strong>
          </p>
        </div>
        <div className={benefitCard}>
          <h3>
            <Emoji symbol="⚙️" size={25} /> Updatable
          </h3>
          <p>
            Custom links can be edited whenever you need to. You can{' '}
            <strong>
              {' '}
              modify the custom message, phone number and the URL also.
            </strong>
          </p>
        </div>
        <div className={lastCard}>
          <h2>Register now!</h2>
          <p>And purchase your first Premium Walink for 6 USD a year</p>

          <Button
            onClick={goToApp}
            // kind={KIND.secondary}
            shape={SHAPE.pill}
            startEnhancer={() => <FiExternalLink size={24} />}
            size={SIZE.compact}
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
            Register <Emoji symbol={'👑'} size={25} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BenefitsSlider

