import { useAuthenticator } from '@aws-amplify/ui-react';

function HomePage() {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}

export default HomePage;