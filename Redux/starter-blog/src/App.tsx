import { ToastContainer } from 'react-toastify'
// components
import Blog from 'pages/blog'
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Blog />
    </Fragment>
  )
}

export default App
