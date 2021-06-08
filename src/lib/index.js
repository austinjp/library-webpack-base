const plainString = () => {
  return "Hi!"
}

const reactComponent = () => {
  return (
    <span>Hi!</span>
  )
}

const whatever = {
  plainString: plainString,
  reactComponent: reactComponent
}

export default whatever
export { whatever }
