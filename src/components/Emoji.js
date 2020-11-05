import React from 'react'
const Emoji = ({ symbol, size, label }) => (
  <span
    className="emoji"
    role="img"
    style={{ fontSize: size }}
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
)

Emoji.defaultProps = {
  size: 16,
}
export default Emoji
