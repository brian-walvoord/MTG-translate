import "./App.css";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [card, setCard] = useState(null);
  const [foreignCard, setForeignCard] = useState(null);

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
      .then((res) => setForeignCard(res.image_uris.normal))
      .catch(() => window.alert("There is no Japanese card available."));
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      fetchCard();
    }
  };

  const sendPost = () => {
    fetch("/translate/", {
      method: "POST",
    });
  };

  return (
    <div>
      <button onClick={sendPost}>Click to send post request</button>
      <input
        onKeyUp={handleKeyPress}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
      <button onClick={fetchCard}>Click to search card</button>
      {foreignCard && <img className="foreign-card" src={foreignCard}></img>}
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
    </div>
  );
}

export default App;
