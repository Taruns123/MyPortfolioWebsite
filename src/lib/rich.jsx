/** "Plain text with ==highlighted bits==" → nodes; marks get a highlighter swipe on scroll. */
export function rich(str) {
  return str.split(/(==[^=]+==)/g).map((part, i) =>
    part.startsWith('==') ? <mark key={i} className="hl">{part.slice(2, -2)}</mark> : part,
  )
}
