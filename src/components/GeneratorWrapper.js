import React, { useState } from 'react'
import { useStyletron } from 'baseui'
import { Paragraph4 } from 'baseui/typography'
import { ChevronRight, ChevronDown } from 'baseui/icon'
import Generator from '../components/generator'
import Preview from '../components/preview'

const GeneratorWrapper = ({ focusElement }) => {
  const [css] = useStyletron()
  const [phone, setPhone] = useState('')
  const [text, setText] = useState('')
  const [showBubble, setShowBubble] = useState(false)

  const mainGenerator = css({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
    alignItems: 'center',
    justifyContent: 'center',
  })

  const rightSide = css({
    width: '100%',
    maxWidth: '510px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '@media screen and (max-width: 995px)': {
      flexDirection: 'column',
    },
  })

  const leftSide = css({
    width: '100%',
    maxWidth: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })

  return (
    <div className={mainGenerator}>
      <div className={leftSide}>
        <Generator
          setGlobalPhone={setPhone}
          setGlobalText={setText}
          globalText={text}
          setShowBubble={setShowBubble}
          focusElement={focusElement}
        />
      </div>
      <div className={rightSide}>
        <div
          className={css({
            margin: '30px',
            textAlign: 'center',
            maxWidth: '100px',
          })}
        >
          <ChevronDown
            size={64}
            className={css({
              '@media screen and (min-width: 995px)': {
                display: 'none',
              },
            })}
          />
          <ChevronRight
            size={64}
            className={css({
              '@media screen and (max-width: 995px)': {
                display: 'none',
              },
            })}
          />
          <Paragraph4>This is how your users will see it</Paragraph4>
        </div>
        <Preview phone={phone} text={text} showBubble={showBubble} />
      </div>
    </div>
  )
}

export default GeneratorWrapper
