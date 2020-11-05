import React from 'react'
import { useStyletron } from 'baseui'
import { Paragraph3, Paragraph4 } from 'baseui/typography'
import profile from '../images/blank-profile-picture.svg';

import sendButton from '../images/send-button.svg'

const Preview = ({ phone, text, showBubble }) => {
  const [css] = useStyletron()

  const previewContainer = css({
    minHeight: '450px',
    maxWidth: '280px',
    backgroundColor: '#ECE5DD',
    position: 'relative',
    width: '100%',
    height: '100%',
  })

  const previewHeader = css({
    backgroundColor: '#ededed',
    height: '50px',
    width: '100%',
    display: 'flex',
    borderBottom: '1px solid #f0f1f2',
  })

  const previewProfilePic = css({
    width: '40px',
    height: '40px',
    margin: 'auto 5px',
    padding: '5px',
    borderRadius: '50%',
  })

  const previewTextArea = css({
    backgroundColor: '#fff',
    minHeight: '30px',
    width: '250px',
    borderRadius: '50px',
    display: 'flex',
    marginLeft: '10px',
  })

  const previewBottom = css({
    backgroundColor: '#f0f0f0',
    width: '100%',
    minHeight: '50px',
    position: 'absolute',
    bottom: '0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  })

  const previewSendButton = css({
    width: '30px',
    height: '30px',
    margin: 'auto 5px',
    padding: '5px',
    borderRadius: '50%',
  })

  const previewChatBubble = css({
    position: 'absolute',
    bottom: '60px',
    right: '10px',
    boxShadow: '0 1px 0.5px rgba(0,0,0,.13)',
    maxWidth: '200px',
    padding: '10px',
    backgroundColor: '#DCF8C6',
    borderRadius: '7.5px',
  })

  const phoneWrapper = css({
    padding: '35px 8px 35px 8px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    borderWidth: '1px',
    minHeight: '450px',
    maxWidth: '280px',
    width: '100%',
    height: '100%',
  })

  return (
    <div className={phoneWrapper}>
      <div className={previewContainer}>
        <div className={previewHeader}>
          <img src={profile} alt="profile" className={previewProfilePic} />
          <Paragraph3>{phone} </Paragraph3>
        </div>

        {showBubble && (
          <div className={previewChatBubble}>
            <Paragraph3 $style={{ margin: '0', overflowWrap: 'break-word' }}>
              {text}
            </Paragraph3>
          </div>
        )}

        <div className={previewBottom}>
          <div className={previewTextArea}>
            {!showBubble && (
              <Paragraph4
                $style={{ margin: 'auto 10px', overflowWrap: 'break-word' }}
              >
                {text.substring(0, 31)} {text.length > 31 && ' ...'}
              </Paragraph4>
            )}
          </div>
          <img src={sendButton} alt="profile" className={previewSendButton} />
        </div>
      </div>
    </div>
  )
}

export default Preview
