import Image from "next/image";
import styled from "styled-components";

const Button = styled.button`
margin: 5px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-style: none;
  color: var(--primary-color);
  &: hover {
    font-size: 1.2em;
`;
/* position: absolute;
  right: 1rem;
  top: 1.5rem; */
export default function FavoriteButton({ isLiked, onToggleLiked, id }) {
  return (
    <Button aria-label="FavoriteButton" onClick={() => onToggleLiked(id)} isLiked={isLiked}>
      <Image
        src={!isLiked ? "/images/heart.svg" : "/images/heartLiked.svg"}
        width={30}
        height={30}
        alt="LikeButton" /* color=`${isLiked ? red: black}` */
      />
    </Button>
  );
}