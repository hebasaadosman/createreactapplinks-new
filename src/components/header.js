import React from 'react'
import { Link, navigate } from 'gatsby'
import { trackCustomEvent, OutboundLink } from 'gatsby-plugin-google-analytics'
import { Button, SHAPE, SIZE, KIND } from 'baseui/button'
import { StatefulMenu } from 'baseui/menu'
import { StatefulPopover } from 'baseui/popover'
import { MdTranslate } from 'react-icons/md'
import walinkLogo from '../images/logo-walink.svg'

const Header = ({ page }) => {
  const goToLang = item => {
    if (item.href) {
      window.location.href = item.href
    }
  }

  const goToPremium = item => {
    if (item.href && item.href === 'premium') {
      trackCustomEvent({
        category: 'Premium',
        action: 'Click',
        label: 'Go To Premium',
      })
      navigate('/premium')
    }
    if (item.href && item.href === 'register') {
      trackCustomEvent({
        category: 'Premium',
        action: 'Click',
        label: 'Go To Register',
      })
      window.location.href = 'https://app.wa.link/register'
    }

    if (item.href && item.href === 'login') {
      trackCustomEvent({
        category: 'Premium',
        action: 'Click',
        label: 'Go To Login',
      })
      window.location.href = 'https://app.wa.link/'
    }
  }

  return (
    <header
      style={{
        background: '#fff',
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0.5rem 1.0875rem`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          <img
            src={walinkLogo}
            alt="white-logo"
            style={{ height: 45, cursor: 'pointer', marginBottom: -5 }}
          />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <OutboundLink
            style={{
              fontSize: '.8rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '15px',
            }}
            href="https://walink.io/blog"
          >
            Blog
          </OutboundLink> */}

          {/* <StatefulPopover
            content={() => (
              <StatefulMenu
                onItemSelect={({ item }) => goToLang(item)}
                items={[
                  { label: 'Español', href: 'https://crear.wa.link' },
                  { label: 'Português', href: 'https://criar.wa.link' },
                ]}
              />
            )}
            showArrow
            renderall
            returnFocus
            autoFocus
          >
            <Button
              kind={KIND.minimal}
              size={SIZE.compact}
              shape={SHAPE.pill}
              overrides={{
                BaseButton: {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                  },
                },
              }}
            >
              <MdTranslate size="18px" style={{ marginRight: 4 }} />
              lang
            </Button>
          </StatefulPopover> */}

          <StatefulPopover
            content={() => (
              <StatefulMenu
                onItemSelect={({ item }) => goToPremium(item)}
                items={[
                  { label: 'About Premium', href: 'premium' }
                  // { label: 'Register', href: 'register' },
                  // { label: 'Login', href: 'login' },
                ]}
              />
            )}
            showArrow
            renderall
            returnFocus
            autoFocus
          >
            <Button
              shape={SHAPE.pill}
              size={SIZE.compact}
              kind={KIND.primary}
              overrides={{
                BaseButton: {
                  style: {
                    marginRight: '5px',
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                  },
                },
              }}
            >
              Premium
            </Button>
          </StatefulPopover>
        </div>
      </div>
    </header>
  )
}
export default Header
