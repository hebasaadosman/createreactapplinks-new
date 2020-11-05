import React, { useState, useEffect } from 'react'
import { Avatar } from 'baseui/avatar'
import { Display4 } from 'baseui/typography'
import { useStyletron } from 'baseui'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal'
import { trackCustomEvent, OutboundLink } from 'gatsby-plugin-google-analytics'
import { Checkbox } from 'baseui/checkbox'
import { KIND, SHAPE, SIZE } from 'baseui/button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Notification, KIND as NotiKind } from 'baseui/notification'
import Emoji from './Emoji'
import whatsAppLogo from '../images/WhatsApp-0e878a0fa68c61b06e781cee2e6bc71f.svg'

const SuccessModal = ({ waLink, isOpen, setIsOpen, qrDataUrl }) => {
  const [css] = useStyletron()
  const [copied, setCopied] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [downloadString, setDownloadString] = useState(qrDataUrl)
  const [addTextToQR, setAddTextToQR] = useState(false)

  const checkCopiedAndClose = () => {
    if (copied) {
      setCopied(false)
      setIsOpen(false)
      setShowNotification(false)
    } else {
      setShowNotification(true)
    }
  }

  useEffect(() => {
    if (addTextToQR) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 300
      canvas.height = 320

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 300, 320)
      const image = new Image()
      image.src = qrDataUrl
      image.onload = function() {
        ctx.drawImage(image, 0, 0)
        ctx.font = 'bold 20px Helvetica'
        ctx.fillStyle = 'black'
        ctx.fillText(waLink.replace('https://', ''), 160, 305)
        setDownloadString(canvas.toDataURL('image/png'))
      }
    } else {
      setDownloadString(qrDataUrl)
    }
  }, [addTextToQR, waLink, qrDataUrl])

  return (
    <Modal
      isOpen={isOpen}
      onClose={checkCopiedAndClose}
      unstable_ModalBackdropScroll={true}
      overrides={{
        Dialog: {
          style: {
            borderTopRightRadius: '10px',
            borderTopLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            borderBottomLeftRadius: '10px',
          },
        },
      }}
    >
      <ModalHeader>This is your WhatsApp short link</ModalHeader>
      <ModalBody>
        <p>
          This is a short link that you can use for share in your social media,
          emails, website or anywhere you want to be contacted easily by your
          users.
        </p>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          })}
        >
          <Avatar name="Jane Doe" size="scale1200" src={whatsAppLogo} />
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={css({ marginLeft: '15px', wordWrap: 'break-word' })}
          >
            <Display4>{waLink.replace('https://', '')}</Display4>
          </a>
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '10px',
          })}
        >
          <Notification
            kind={NotiKind.positive}
            overrides={{
              Body: {
                style: {
                  width: '100%',
                  borderTopRightRadius: '10px',
                  borderTopLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
                },
              },
            }}
          >
            <Emoji symbol={'👑'} /> Get your own{' '}
            <strong>wa.link/YourBrand</strong> with a{' '}
            <OutboundLink
              href="https://create.wa.link/premium"
              target="_blank"
              rel="noopener noreferrer"
              alt="Premium plan"
            >
              Premium plan
            </OutboundLink>{' '}
            <Emoji symbol={'👑'} />
          </Notification>
        </div>
        {!copied && showNotification && (
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '10px',
            })}
          >
            <Notification
              overrides={{
                Body: {
                  style: {
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                  },
                },
              }}
            >
              Be sure to copy the link first before close
            </Notification>
          </div>
        )}
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-evenly',
          })}
        >
          <img
            src={downloadString}
            alt="generated-qr"
            style={{ width: 300, height: addTextToQR ? 320 : 300 }}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          })}
        >
          <Checkbox
            checked={addTextToQR}
            onChange={e => setAddTextToQR(e.target.checked)}
          >
            Add link to QR code
          </Checkbox>
        </div>
      </ModalBody>
      <ModalFooter>
        <CopyToClipboard text={waLink} onCopy={() => setCopied(true)}>
          <ModalButton
            shape={SHAPE.pill}
            size={SIZE.compact}
            overrides={{
              BaseButton: {
                style: {
                  backgroundColor: '#00b66c',
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                },
              },
            }}
          >
            {copied ? 'Copied!' : 'Copy link'}
          </ModalButton>
        </CopyToClipboard>
        <a
          download={waLink.replace('https://', '') + '.png'}
          href={downloadString}
          onClick={() =>
            trackCustomEvent({
              category: 'Generator',
              action: 'Download',
              label: 'Download QR',
            })
          }
          style={{ textDecoration: 'none' }}
        >
          <ModalButton
            kind={KIND.secondary}
            shape={SHAPE.pill}
            size={SIZE.compact}
            overrides={{
              BaseButton: {
                style: {
                  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px',
                },
              },
            }}
          >
            Download QR
          </ModalButton>
        </a>
      </ModalFooter>
    </Modal>
  )
}

export default SuccessModal
