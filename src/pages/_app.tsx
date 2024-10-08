import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '../amplify'; // Import the Amplify configuration
import Layout from '../components/layout' // Changed 'Layout' to 'layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Layout>
          <Component {...pageProps} />
          {user && (
            <button onClick={signOut}>Sign out</button>
          )}
        </Layout>
      )}
    </Authenticator>
  );
}

export default MyApp