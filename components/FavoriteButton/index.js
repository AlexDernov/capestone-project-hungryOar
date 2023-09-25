import Image from "next/image";
import styled from "styled-components";

export default function FavoriteButton({ isLiked, onToggleLiked, id, name }) {
  return (
    <Button
      aria-label="FavoriteButton"
      onClick={() => onToggleLiked(id)}
      isLiked={isLiked}
      name={name}
    >
      <Image
        src={!isLiked ? "/images/heart.svg" : "/images/heartLiked.svg"}
        width={30}
        height={30}
        alt="LikeButton"
      />
    </Button>
  );
}
const Button = styled.button`
  margin: 5px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-style: none;
  color: var(--primary-color);
`;
