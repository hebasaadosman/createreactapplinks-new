import React from "react";
import { Picker } from 'emoji-mart'
import { Button, SHAPE, SIZE, KIND } from 'baseui/button'
import { StatefulPopover } from 'baseui/popover'
import { Caption2 } from 'baseui/typography'
import Emoji from '../components/Emoji'
import 'emoji-mart/css/emoji-mart.css'

const EmojiSelector = ({ onSelect, hint }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StatefulPopover 
        content={() => (
          <Picker
            native={true}
            color="#00b66c"
            perLine={12}
            emojiSize={20}
            emoji=""
            title="Pick your emoji"
            onSelect={emoji => onSelect(emoji.native)}
            style={{ margin: '0 auto' }}
            sheetSize={16}
            
          />
        )}
        accessibilityType={'tooltip'}
        
      >
        <Button 
          shape={SHAPE.round}
          size={SIZE.compact}
          kind={KIND.tertiary}
          type="button"
          overrides={{
            BaseButton: {
              style: {
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                marginRight: '0.5rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                paddingTop: '3px',
                paddingBottom: '3px',
                paddingLeft: '3px',
                paddingRight: '3px',
              },
            },
          }}
        >
          <Emoji symbol={'😀'} size={17} />
        </Button>
      </StatefulPopover>
      <Caption2>{hint}</Caption2>
    </div>
  )
}

export default EmojiSelector

