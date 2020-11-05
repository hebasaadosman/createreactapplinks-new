import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Paragraph1, Paragraph4 } from 'baseui/typography'
import { FiInstagram, FiTwitter } from 'react-icons/fi'
import Header from './header';
import Logo from '../images/logo-walink.svg';


import Emoji from './Emoji'

const Layout = ({ children, hero, page }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
    
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} page={page} />
      {hero && <> {hero}</>}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          minHeight: '80vh',
        }}
      >
        <main>{children}</main>
      </div>
      <footer
        style={{
          marginTop: 'auto',
          backgroundColor: '#f3f3f3',
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 20,
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="logo-black" style={{ height: 50 }} />
            <div
              style={{
                display: 'flex',
                margin: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <a
                href="/"
                target="_blank"
                alt="Walink Instagram"
                rel="noopener noreferrer"
                style={{ lineHeight: 1, marginTop: '2px' }}
              >
                <FiInstagram />
              </a>
              <span style={{ margin: '0 5px' }}> | </span>
              <a
                href="#"
                target="_blank"
                alt="Walink Twitter"
                rel="noopener noreferrer"
                style={{ lineHeight: 1, marginTop: '2px' }}
              >
                <FiTwitter />
              </a>
            </div>
          </div>
          <div style={{ maxWidth: '830px' }}>
            <Paragraph1 style={{ color: '#343434', margin: 0 }}>
              Made with <Emoji symbol={'💚'} /> by Heba Saad.{' '}
              {new Date().getFullYear()}, All rights reserved
            </Paragraph1>

            <Paragraph4 style={{ color: '#343434', margin: 0 }}>
              Walink Inc. is neither associated with nor sponsored by WhatsApp
              Inc. or Facebook Inc. We offer a service based on WhatsApp’s
              public API. By using our service, you are accepting our{' '}
              <a
                style={{ color: '#4299E1' }}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms of service
              </a>{' '}
              and{' '}
              <a
                style={{ color: '#4299E1' }}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy.
              </a>{' '}
              | Heba Saad
            </Paragraph4>
          </div>
        </div>
        {}
      </footer>
    </>
  )
}

export default Layout
