'use client'

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"

const DashboardPage = () => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <main className="min-h-screen px-6 py-10">
          <h1 className="text-3xl font-bold">Welcome to your dashboard</h1>
          <p className="mt-2 text-gray-600">You are successfully signed in.</p>
        </main>
      </SignedIn>
    </>
  )
}

export default DashboardPage
