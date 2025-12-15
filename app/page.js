// // app/page.js

// app/page.js
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  const user = await currentUser();
  const userId = user?.id;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-900 mb-4">
          💎 Virtual Coding Gems
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Learn. Build. Shine. Master coding with guided courses, AI tutors,
          and real-time collaboration.
        </p>

        {/* Authenticated */}
        {userId ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
              <p className="text-lg font-semibold text-indigo-800 mb-1">
                Welcome back! 👋
              </p>
              <p className="text-sm text-gray-600">
                Signed in as{" "}
                <span className="font-medium text-gray-800">
                  {user.emailAddresses?.[0]?.emailAddress}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg transition-all"
              >
                🚀 Go to Studnt Portal
              </Link>

              <Link
                href="/instructor"
                className="px-8 py-4 rounded-xl bg-white border-2 border-indigo-600 text-indigo-700 font-semibold hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all"
              >
                🎓 Instructor Portal
              </Link>
            </div>
          </div>
        ) : (
          /* Signed Out */
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-lg text-gray-700">
                Sign in to access your courses, track progress, and start
                coding today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/sign-in"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg transition-all"
              >
                🔐 Sign In
              </Link>

              <Link
                href="/sign-up"
                className="px-8 py-4 rounded-xl bg-white border-2 border-indigo-600 text-indigo-700 font-semibold hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all"
              >
                ✨ Create Account
              </Link>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
          Built with ❤️ using Next.js, Clerk, Prisma & AI
        </div>
      </div>
    </main>
  );
}


// import Link from "next/link";
// import { auth, currentUser } from "@clerk/nextjs/server";

// export default async function Home() {
//   const { userId } = await auth();
//   const user = userId ? await currentUser() : null;
  
//   return (
//     <main style={{ padding: '3rem', textAlign: 'center' }}>
//       <h1>Virtual Coding Gems— Next.js Starter</h1>
      
//       {userId ? (
//         <div>
//           <p>Welcome! You're signed in.</p>
//           <p>Your Clerk ID: {userId}</p>
//           <p>Email: {user?.emailAddresses?.[0]?.emailAddress}</p>
//           <Link href="/dashboard" style={{ color: 'blue', textDecoration: 'underline', marginRight: '1rem' }}>
//             Go to Dashboard
//           </Link>
//           <Link href="/instructor" style={{ color: 'blue', textDecoration: 'underline' }}>
//             Go to Instructor Page
//           </Link>
//         </div>
//       ) : (
//         <div>
//           <p>Welcome! Please sign in to continue.</p>
//           <div style={{ marginTop: '1rem' }}>
//             <Link href="/sign-in" style={{ color: 'blue', marginRight: '1rem' }}>
//               Sign In
//             </Link>
//             <Link href="/sign-up" style={{ color: 'blue' }}>
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }