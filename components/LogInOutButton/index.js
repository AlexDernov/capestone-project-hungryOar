import { signIn, signOut } from "next-auth/react"

export default function LogInOutButton({session2}) {
 
  if (session2) {
    return (
      <>
        {session2.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}