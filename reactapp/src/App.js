import "./App.css";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [card, setCard] = useState(null);

  const fetchCard = () => {
    setCard(null);
    fetch(`/search-card?query=${searchQuery}`)
      .then((res) => res.json())
      .then((res) => setCard(res.data));
  };

  const changeToJapanese = (uri) => {
    let clickedCard = card.filter(
      (el) => el.image_uris && el.image_uris.normal === uri
    );
    fetch(
      `/translate?set=${clickedCard[0].set}&collector=${clickedCard[0].collector_number}`
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch(() => console.log("No picture found")); // what do if there is no card ??????????????
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      fetchCard();
    }
  };

  return (
    <>
      <input
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <button onClick={fetchCard}>Click to search card</button>
      <div className="card-container">
        {card &&
          card.map((el) => (
            <div key={el.oracle_id}>
              <img
                onClick={(e) => changeToJapanese(e.target.src)}
                className="card"
                src={el.image_uris ? el.image_uris.normal : null}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
