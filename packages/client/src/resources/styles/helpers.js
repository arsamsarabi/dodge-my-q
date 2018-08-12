const helpers = {};

const pageContainer = () => `
  min-height: calc(100vh - 50px);
  height: calc(100vh - 50px);
  width: 100vw;
  max-width: 1024px;
  margin: 0 auto;
  overflow-y: auto;
  padding: 4px 24px;
`

helpers.pageContainer = pageContainer

export default helpers
export {
  pageContainer,
}

