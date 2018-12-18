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

export function createElement(element, parent) {
  const { ref, children } = element
  const name = parent ? parent + capitalize(ref) : ref
  const el = <div className={`${name}`} />
  console.log(name)
  if (children) {
    console.log(children)
    const elements = createElements(children, name)
  }
  return el
}

export function createElements(elements, parent = '') {
  return elements.map(element => createElement(element, parent))
}
