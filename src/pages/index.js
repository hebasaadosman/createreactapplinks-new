import React, { useState } from 'react'
import { Link } from 'gatsby'
import { H2, Paragraph2 } from 'baseui/typography'
import { useStyletron } from 'baseui'
import Layout from '../components/layout'
import GeneratorWrapper from '../components/GeneratorWrapper'
import Faq from '../components/faq'
import SEO from '../components/seo'
import Steps from '../components/steps'
import Hero from '../components/hero'
import CTA from '../components/RegisterCTA'

const IndexPage = () => {
  const [css] = useStyletron()
  const [focusElement, setFocusElement] = useState('')

  const centerText = css({
    display: 'flex',
    justifyContent: 'center',
  })

  return (
    <Layout hero={<Hero />}>
      <SEO
        title="Create WhatsApp links"
        hreflang={[
          { rel: 'alternate', hrefLang: 'en', href: 'http://localhost:8000' },
          { rel: 'alternate', hrefLang: 'es', href: 'https://crear.wa.link' },
          { rel: 'alternate', hrefLang: 'pt', href: 'https://criar.wa.link' },
          {
            rel: 'alternate',
            hrefLang: 'x-default',
            href: 'http://http://localhost:8000/',
          },
        ]}
      />
      <div
        className={css({
          margin: '4rem 0',
        })}
      >
        <h2
          className={css({
            textAlign: 'center',
          })}
        >
          What is a WhatsApp link?
        </h2>
        <div className={centerText}>
          <Paragraph2>
            WhatsApp has a feature that allows people to create links, so any
            user can click and start a conversation (chat) directly with the
            person who created the link. This functionality is called{' '}
            <strong>"click to chat"</strong> and as you don’t have to save
            anyone’s phone number to message them, it simplifies interaction.
          </Paragraph2>
        </div>
        <div className={centerText}>
          <Paragraph2>
            Even so, creating WhatsApp links is not user friendly and
            occasionally takes more time than expected. There’s where Walink
            comes in, we provide a tool which you can use to generate shortened
            WhatsApp links, with the <strong>wa.link</strong> domain. This will
            increase your chat conversions, and it’s free!
          </Paragraph2>
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          margin: '50px auto',
          background: 'linear-gradient(-45deg, #23a6d5, #23d5ab)',
          minHeight: '310px',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          borderRadius: '10px',
        })}
      >
        <Steps changeFocus={setFocusElement} />
      </div>
      <div
        id="create-link"
        className={css({
          paddingTop: '10px',
        })}
      >
        <H2 className={css({ textAlign: 'center' })}>Create your link here</H2>
        <GeneratorWrapper focusElement={focusElement} />
      </div>
      <div className={css({ marginTop: '50px' })}>
        <div className={css({ margin: '20px' })}>
          <H2>FAQs - Frequently Asked Questions:</H2>
        </div>
        <Faq />
        <CTA
          title="Do you want a branded link?"
          description={
            <>
              With{' '}
              <Link
                to="/premium"
                style={{ color: '#343434', textDecoration: 'none' }}
              >
                Walink premium
              </Link>{' '}
              you can create, track and modify your custom WhatsApp links.{' '}
              <strong>(wa.link/YourBrand)</strong>
            </>
          }
          currentPage="Home"
        />
      </div>
    </Layout>
  )
}

export default IndexPage
