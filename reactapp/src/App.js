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
            <div
              // onClick={(e) => changeToJapanese(e.target.src)}
              key={el.oracle_id}
            >
              <img
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
