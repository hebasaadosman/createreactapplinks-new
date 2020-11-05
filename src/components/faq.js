import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Accordion, Panel } from 'baseui/accordion'
import { useStyletron } from 'baseui'

const Faq = () => {
  const [css] = useStyletron()

  return (
    <div className={css({ marginBottom: '20px', minHeight: '300px' })}>
      <Accordion renderAll>
        <Panel title="How much does Walink charge for links?">
          The links that you create with the generator in create.wa.link are
          totally <strong> free. </strong>
          <br />
          <br />
          You can also access Walink Premium and{' '}
          <strong> create branded links for 6 USD a year</strong> that include
          more features like custom URL and an admin dashboard to edit the
          link's info and view analytics.{' '}
          <OutboundLink
            href="https://app.wa.link/register"
            target="_blank"
            rel="noopener noreferrer"
            alt="Register Walink"
          >
            Register now to purchase your firts Premium link here.
          </OutboundLink>
        </Panel>
        <Panel title="What is the custom message?">
          It’s a default message that appears on the user’s text input field
          once they click on your link and open the chat. This way it’s easier
          for them to start a conversation and you will know exactly where the
          user came from.
        </Panel>
        <Panel title="How to add a WhatsApp link (wa.link) to the Instagram bio?">
          One of the most common places to use your WhatsApp links generated
          with Walink, is the Instagram profile. Note that this social network
          only admits 1 link in the bio, so if you already have a link there,
          you will have to replace it.
          <br />
          <br />
          Go to your Instagram profile, then click "Edit Profile", and fill the
          input for "Website" with the wa.link you just made.
          <br />
          <br />
          Remember that if you don't fill the "Website" field, your users won't
          be able to click your link and you will miss the opportunity of an
          immediate contact with your clients.
        </Panel>
        <Panel title="Why is there a website asking if I want to send a message?">
          Sometimes, especially on desktop or laptop, when a user clicks a
          WhatsApp link the browser will open a new tab where the person is
          asked if they want to send a message to ###-###-### WhatsApp number.
          This is the way WhatsApp keeps the links safe for users, so if this is
          happening on your links you can rest assure it is working perfectly.
        </Panel>
        <Panel title="How can I create a link with custom (branded) URL?">
          Free generated links URLs are assigned randomly using numbers and
          letters. If you’d like to create a link with custom URL like{' '}
          <strong>wa.link/YourBrand</strong>, you can{' '}
          <OutboundLink
            href="https://app.wa.link/register"
            target="_blank"
            rel="noopener noreferrer"
            alt="Register Walink"
          >
            register in Walink Premium
          </OutboundLink>{' '}
          to get all the benefits including custom URLs.
        </Panel>
        <Panel title="How can I know how many clicks are my links getting?">
          Free generated links don't support analytics options, so you can't
          know how many clicks are these links getting.
          <br />
          <br />
          <strong>Walink Premium</strong> does offer analytics and many other
          features.{' '}
          <OutboundLink
            href="https://app.wa.link/register"
            target="_blank"
            rel="noopener noreferrer"
            alt="Register Walink"
          >
            Register here to get all the benefits from Premium links.
          </OutboundLink>
        </Panel>
        <Panel title="Does Walink work in my country?">
          Walink generated links work on any country where WhatsApp is
          officially available.
        </Panel>
        <Panel title="Where can I report a bug or issue?">
          Free generated links do not offer personalized support. However, if
          you find a bug or any issue using Walink you can reach us on twitter{' '}
          <OutboundLink
            href="https://twitter.com/walinkguru"
            target="_blank"
            rel="noopener noreferrer"
            alt="@walinkguru"
          >
            @walinkguru
          </OutboundLink>
          . Register on{' '}
          <OutboundLink
            href="https://app.wa.link/register"
            target="_blank"
            rel="noopener noreferrer"
            alt="Register Walink"
          >
            Walink Premium{' '}
          </OutboundLink>
          to create your own branded links and receive personalized support.
        </Panel>
      </Accordion>
    </div>
  )
}

export default Faq
