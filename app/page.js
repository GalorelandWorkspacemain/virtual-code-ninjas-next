import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  
  return (
    <main style={{ padding: '3rem', textAlign: 'center' }}>
      <h1>Virtual Coding Gems— Next.js Starter</h1>
      
      {userId ? (
        <div>
          <p>Welcome! You're signed in.</p>
          <p>Your Clerk ID: {userId}</p>
          <p>Email: {user?.emailAddresses?.[0]?.emailAddress}</p>
          <Link href="/dashboard" style={{ color: 'blue', textDecoration: 'underline', marginRight: '1rem' }}>
            Go to Dashboard
          </Link>
          <Link href="/instructor" style={{ color: 'blue', textDecoration: 'underline' }}>
            Go to Instructor Page
          </Link>
        </div>
      ) : (
        <div>
          <p>Welcome! Please sign in to continue.</p>
          <div style={{ marginTop: '1rem' }}>
            <Link href="/sign-in" style={{ color: 'blue', marginRight: '1rem' }}>
              Sign In
            </Link>
            <Link href="/sign-up" style={{ color: 'blue' }}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}