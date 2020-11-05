import React from "react"
import { useStyletron } from "baseui"
import { Paragraph2 } from "baseui/typography"
import { ListItem, ListItemLabel } from "baseui/list"
import { Check } from "baseui/icon"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CTA from "../components/RegisterCTA"
import PremiumHero from "../components/PremiumHero"
import SearchLink from "../components/SearchLink"
import BenefitsSlider from "../components/BenefitsSlider"
// import Emoji from '../components/Emoji'
import statsIcon from "../images/line-stats.svg"
import businessCardIcon from "../images/business-cards.svg"
import networkingCardIcon from "../images/networking-group.svg"

export default () => {
  const [css] = useStyletron()

  const cardClass = css({
    height: "100%",
    width: "300px",
    margin: "30px auto",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "15px",

    background: "linear-gradient(-45deg, #23a6d5, #23d5ab)",
  })

  const cardTitle = css({
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#fff",
    padding: "5px",
  })

  const iconClass = css({
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  })

  return (
    <Layout page="premium" hero={<PremiumHero />}>
      <SEO
        title="Create your WhatsApp link with yout brand"
        description="Create your own WhatsApp link with branded URL, analytics and control. With Walink Premium increase your brand awareness and get more benefits."
        hreflang={[
          {
            rel: "alternate",
            hrefLang: "en",
            href: "https://create.wa.link/premium",
          },
          {
            rel: "alternate",
            hrefLang: "es",
            href: "https://crear.wa.link/premium",
          },
          {
            rel: "alternate",
            hrefLang: "pt",
            href: "https://criar.wa.link/premium",
          },
          {
            rel: "alternate",
            hrefLang: "x-default",
            href: "https://create.wa.link/premium",
          },
        ]}
      />
      <div>
        <div style={{ margin: "4rem 0" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              marginBottom: "2.5rem",
            }}
          >
            Find a custom wa.link for your business
          </h2>
          <SearchLink />
        </div>
      </div>
      <div
        className={css({
          textAlign: "center",
          marginTop: "4rem",
          marginBottom: "2rem",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          paddingTop: "2rem",
        })}
      >
        <h2>Features included in Premium</h2>
      </div>
      <div
        className={css({
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
        })}
      >
        <div className={cardClass}>
          <div className={iconClass}>
            <img
              src={businessCardIcon}
              alt="walink analytics"
              className={css({
                maxWidth: "50px",
                maxHeight: "50px",
              })}
            />
          </div>
          <h3 className={cardTitle}>Branded links</h3>
          <ListItem artwork={props => <Check {...props} />}>
            <ListItemLabel>
              wa.link/<strong>YourCompany</strong>
            </ListItemLabel>
          </ListItem>
          <ListItem artwork={props => <Check {...props} />}>
            <ListItemLabel>
              wa.link/<strong>YourBrand</strong>
            </ListItemLabel>
          </ListItem>
          <ListItem
            overrides={{
              Root: {
                style: {
                  borderRadius: "0 0 15px 15px",
                },
              },
            }}
            artwork={props => <Check {...props} />}
          >
            <ListItemLabel>
              wa.link/<strong>YourName</strong>
            </ListItemLabel>
          </ListItem>
        </div>
        <div className={cardClass}>
          <div className={iconClass}>
            <img
              src={networkingCardIcon}
              alt="walink analytics"
              className={css({
                maxWidth: "50px",
                maxHeight: "50px",
              })}
            />
          </div>
          <h3 className={cardTitle}>Updatable info</h3>
          <ListItem artwork={props => <Check {...props} />}>
            <ListItemLabel>
              Change the WhatsApp number of your link.
            </ListItemLabel>
          </ListItem>
          <ListItem artwork={props => <Check {...props} />}>
            <ListItemLabel>Change the custom message.</ListItemLabel>
          </ListItem>
          <ListItem
            overrides={{
              Root: {
                style: {
                  borderRadius: "0 0 15px 15px",
                },
              },
            }}
            artwork={props => <Check {...props} />}
          >
            <ListItemLabel>Change the custom URL.</ListItemLabel>
          </ListItem>
        </div>
        <div className={cardClass}>
          <div className={iconClass}>
            <img
              src={statsIcon}
              alt="walink analytics"
              className={css({
                maxWidth: "50px",
                maxHeight: "50px",
              })}
            />
          </div>
          <h3 className={cardTitle}>Analytics</h3>
          <ListItem artwork={props => <Check {...props} />}>
            <ListItemLabel>Daily and hourly clicks.</ListItemLabel>
          </ListItem>
          <ListItem artwork={props => <Check {...props} />}>
            <ListItemLabel>Clicks by location.</ListItemLabel>
          </ListItem>
          <ListItem
            overrides={{
              Root: {
                style: {
                  borderRadius: "0 0 15px 15px",
                },
              },
            }}
            artwork={props => <Check {...props} />}
          >
            <ListItemLabel>Source of clicks</ListItemLabel>
          </ListItem>
        </div>
      </div>
      <div style={{ marginBottom: "3rem" }}>
        <div
          className={css({
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "3rem",
          })}
        >
          <h2>Why is Walink Premium ideal for your business?</h2>
          <Paragraph2>
            Find out why our service is the best solution to drive customers to
            your WhatsApp chat.
          </Paragraph2>
        </div>
        <BenefitsSlider />
      </div>
      <CTA
        description={
          <>
            You are a few clicks away from increasing your sales through
            WhatsApp.
          </>
        }
        title="Are you ready for Premium?"
        currentPage="Premium"
      />
    </Layout>
  )
}
