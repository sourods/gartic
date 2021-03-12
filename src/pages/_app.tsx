import globalStyles from '../styles/global'
const MyApp = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <style jsx>{globalStyles}</style>
  </>
)
export default MyApp
