'use client'
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return(
        <div className="flex justify-center items-center min-h-screen">
            <SignIn path="/sign-in" routing="path" forceRedirectUrl='/dashboared'/>
        </div>
    )
}

export default SignInPage