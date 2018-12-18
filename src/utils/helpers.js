import React from 'react'

export function generateGuid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function createReference(el, refs, ref, parent) {
  if (!el) return
  if (parent) {
    if (!refs[ref]) refs[ref] = {}
    return (refs[ref]['component'] = el)
  } else {
    return (refs[ref] = el)
  }
}

export function createElement(element, css, refs, parent) {
  const { ref, children } = element
  const name = parent ? parent + capitalize(ref) : ref
  if (children) {
    if (!refs[ref]) refs[ref] = {}
    return React.createElement(
      'div',
      {
        ref: el => createReference(el, refs, ref, true),
        className: css[name],
        key: name
      },
      createElements(children, css, refs[ref], name)
    )
  } else {
    return React.createElement('div', {
      ref: el => createReference(el, refs, ref, false),
      className: css[name],
      key: name
    })
  }
}

export function createElements(elements, css, refs, parent = '') {
  return elements.map(element => createElement(element, css, refs, parent))
}
