import React, { useState,useEffect } from 'react'
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps'
import { Button, SHAPE } from 'baseui/button'
import { Paragraph4 } from 'baseui/typography'
import { useStyletron } from 'baseui'

const Steps = ({ changeFocus }) => {
  const [current, setCurrent] = useState(0)
  const [css] = useStyletron()

  const handleStepChange = (step, focusElement) => {
    if (step) setCurrent(step)
    if (focusElement) changeFocus(focusElement)
  }

  return (
    <div
      className={css({
        maxWidth: '450px',
        height: '100%',
      })}
    >
      <h2 style={{ textAlign: 'center', color: '#fff' }}>
        How to create your WhatsApp link
      </h2>
      <ProgressSteps
        current={current}
        overrides={{
          Root: {
            style: {
              borderTopRightRadius: '20px',
              borderTopLeftRadius: '20px',
            },
          },
        }}
      >
        <NumberedStep title="Type your WhatsApp phone number">
          <Paragraph4>
            Type the phone number which you want to be contacted. Remember to
            check your country code.
          </Paragraph4>
          <Button
            shape={SHAPE.pill}
            size="compact"
            onClick={() => handleStepChange(1)}
            overrides={{
              BaseButton: {
                style: {
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                },
              },
            }}
          >
            Next
          </Button>
        </NumberedStep>
        <NumberedStep title="Add a custom message for users to send to you">
          <Paragraph4>
            This message is optional, but it is a great way to personalize your
            link e.g “Hello, I want more info”.
          </Paragraph4>
          <Button
            shape={SHAPE.pill}
            size="compact"
            onClick={() => handleStepChange(2)}
            overrides={{
              BaseButton: {
                style: {
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                },
              },
            }}
          >
            Next
          </Button>
        </NumberedStep>
        <NumberedStep title="Click on “Generate my wa.link”, copy it and use it anywhere you want!">
          <Paragraph4>
            The generator creates a shortened link and also a QR code for you to
            download.
          </Paragraph4>
          <Button
            shape={SHAPE.pill}
            size="compact"
            onClick={() => handleStepChange(null, 'phone')}
            overrides={{
              BaseButton: {
                style: {
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                },
              },
            }}
          >
            Let’s get started!
          </Button>
        </NumberedStep>
      </ProgressSteps>
    </div>
  )
}

export default Steps
