import { test } from "./lib"

// Need to export stuff or your build will be empty :)
const myExports = {
  test: test
}
export default myExports
export { myExports }
