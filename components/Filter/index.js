import styled from "styled-components";

export default function Filter({
  rental,
  onOptionChange,
  handleFilter,
  menuTypes,
  hidden,
  handleOnClick,
}) {
  return (
    <Div>
      <StyledFilter hidden={hidden}>
        <legend> Filter </legend>
        <fieldset>
          <legend>Verleih</legend>
          <input
            type="radio"
            name="verleih"
            value="ja"
            id="ja"
            checked={rental === "ja"}
            onChange={onOptionChange}
          />
          <label htmlFor="ja">ja</label>
          <input
            type="radio"
            name="verleih"
            value="nein"
            id="nein"
            checked={rental === "nein"}
            onChange={onOptionChange}
          />
          <label htmlFor="nein">nein</label>
          <input
            type="radio"
            name="verleih"
            value="egal"
            id="egal"
            checked={rental === "egal"}
            onChange={onOptionChange}
          />
          <label htmlFor="egal">egal</label>
        </fieldset>
        <div>
          <legend>Was gibt`s:</legend>
          {menuTypes.map((type) => (
            <label htmlFor={type.type} key={type.id}>
              {type.type}
              <input
                type="checkbox"
                name="MenuType"
                value={type.type}
                id={type.id}
                onChange={() => handleFilter(type.id)}
                checked={type.checked}
              />
            </label>
          ))}
        </div>
      </StyledFilter>
      <StyledDiv>
        <StyledHiddenButton onClick={handleOnClick}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.0834 4.375H2.91675L14.5834 18.1708V27.7083L20.4167 30.625V18.1708L32.0834 4.375Z"
              fill="#839FD1"
              stroke="#040404"
              strokeOpacity="0.78"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StyledHiddenButton>
      </StyledDiv>
    </Div>
  );
}
const StyledFilter = styled.fieldset`
  position: absolute;
  z-index: 10;
  margin-top: 0px;
  margin-left: 50px;
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  background-color: rgb(179, 200, 233, 0.7);
`;

const StyledHiddenButton = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  padding-left: 12px;
  background-color: transparent;
  cursor: pointer;
`;
const StyledDiv = styled.div`
  position: absolut;
  right: 20px;
  top: 310px;
  margin-top: 80px;
  margin-bottom: -240px;
  width: 30px;
  height: 30px;
  z-index: 13;
`;
const Div = styled.div`
  position: relativ;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;
