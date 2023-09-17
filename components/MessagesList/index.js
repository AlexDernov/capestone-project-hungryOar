import styled from "styled-components";
import Head from "next/head";
import MessagePreviewCard from "../MessagePreviewCard";

export default function MessagesList({ data, mutate }) {
  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="HungryOarApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/caffe-oar-icon.ico" />
      </Head>
      <StyledUl>
        {data.length == 0 ? (
          <Par>You don&apos;t have any messages yet</Par>
        ) : (
          data?.map((message) => (
            <MessagePreviewCard
              key={message._id}
              id={message._id}
              name={message.name}
              text={message.text}
              date={message.createdAt}
            />
          ))
        )}
      </StyledUl>
    </>
  );
}
const StyledUl = styled.ul`
  padding: 0;
  margin-top: 80px;
  margin-bottom: 105px;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 375px;
  gap: 1rem;
  list-style-type: none;
`;
const Par = styled.p`
  height: 90vh;
  width: auto;
  padding-top: 30px;
  padding-left: 10px;
  color: grey;
`;
