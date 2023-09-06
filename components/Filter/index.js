

export default function Filter({
  verleih,
  onOptionChange,
  handleFilter,
  menuArten,
}) {
  console.log("menuArten", menuArten);
  return (
    <fieldset>
      <legend> Filter </legend>
      <fieldset>
        <legend>Verleih</legend>
        <input
          type="radio"
          name="verleih"
          value="ja"
          id="ja"
          checked={verleih === "ja"}
          onChange={onOptionChange}
        />
        <label for="ja">ja</label>
        <input
          type="radio"
          name="verleih"
          value="nein"
          id="nein"
          checked={verleih === "nein"}
          onChange={onOptionChange}
        />
        <label for="nein">nein</label>
        <input
          type="radio"
          name="verleih"
          value="egal"
          id="egal"
          checked={verleih === "egal"}
          onChange={onOptionChange}
        />
        <label for="egal">egal</label>
      </fieldset>
      <div>
        <legend>Was gibt`s:</legend>
        {menuArten.map(
          (artMenu) => (
            console.log("artMenu", artMenu),
            (
              <label for={artMenu.art} key={artMenu.id}>
                {artMenu.art}
                <input
                  type="checkbox"
                  name="MenuArt"
                  value={artMenu.art}
                  id={artMenu.id}
                  onChange={() => handleFilter(artMenu.id)}
                  checked={artMenu.checked}
                />
              </label>
            )
          )
        )}
      </div>
    </fieldset>
  );
}
