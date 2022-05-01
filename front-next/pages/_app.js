import { AppContextProvider } from "@components/Context/AppContext"
import Navbar from "@components/Navbar/Navbar"
import MessageInfo from "@components/Misc/messageInfo"
import "../styles/globals.css"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider>
      <Navbar />
      <MessageInfo />
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
