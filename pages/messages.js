import MessagesList from "../components/MessagesList";
import MessagesForm from "../components/MessagesForm";
import Head from "next/head.js";
import useSWR from "swr";
import { useRouter } from "next/router";
import TitleSection from "../components/TitleSection";
import { useSession } from "next-auth/react";
import Heading from "../components/Heading";
import LogInOutButton from "../components/LogInOutButton";

export default function MessagesPage() {
  const { data: session } = useSession();
  const { data, isLoading, error, mutate } = useSWR("/api/messages");
  const isAdmin = session?.user.name === "HungryOar";
const router = useRouter();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) return <div>failed to load</div>;
  if (!data) {
    return <h1>You have no new messages at the moment</h1>;
  }
  function handleHome(){
    router.push("/")
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);


    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
        alert("Your message has been successfully sent. Thank you for contacting us!")
        handleHome()
      
    } else {
        console.log("Not ok")
    }
  }
 
  return (
    <div>
      <Head>
        <title>Messages</title>
      </Head>
      <TitleSection>
        {" "}
        {isAdmin ? (
          <Heading>Neue Messages</Heading>
        ) : (
          <Heading>Contact Us!</Heading>
        )}
        <LogInOutButton session={session} />
      </TitleSection>
      {isAdmin ? (
        <MessagesList data={data} mutate={mutate}/>
      ) : 
        <MessagesForm onSubmit={handleSubmit} /> 
      }
    </div>
  );
}
