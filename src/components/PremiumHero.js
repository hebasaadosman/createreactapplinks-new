import React from "react"
import { useStyletron } from "baseui"
import { Paragraph2 } from "baseui/typography"
import premiumCard from "../images/premium-6-dollars-black.png"

const PremiumHero = () => {
  const [css] = useStyletron()
  const innerHero = css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "960px",
    margin: `0 auto`,
    padding: "1rem 0",
  })
  const leftSection = css({
    flex: "2",
    color: "#fff",
    minWidth: "300px",
    marginBottom: "3rem",
    padding: "0 1rem",
  })
  return (
    <div style={{ background: "linear-gradient(-45deg,#23a6d5,#23d5ab)" }}>
      <div
        style={{
          width: "100%",
          minHeight: "320px",
        }}
      >
        <div className={innerHero}>
          <div className={leftSection}>
            <h1 className={css({ fontSize: "2.5rem", color: "white" })}>
              Walink Premium{" "}
            </h1>
            <Paragraph2 $style={{ color: "#fff", fontSize: "1.3rem" }}>
              <strong>
                Create, track and edit your branded WhatsApp links.
              </strong>{" "}
            </Paragraph2>
            <Paragraph2 $style={{ color: "#fff", fontSize: "1.2rem" }}>
              Premium links are the perfect tool for your business to increase
              the number of users who reach you on WhatsApp and grow your sales.
            </Paragraph2>
          </div>
          <div>
            <img
              src={premiumCard}
              alt="walink analytics"
              className={css({
                maxWidth: "320px",
                maxHeight: "320px",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumHero
