import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [card, setCard] = useState(null);
  const [foreignCard, setForeignCard] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/load_db_data")
      .then((res) => res.json())
      .then((res) => setData(JSON.parse(res)));
  }, [foreignCard]);

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
      `/translate/?set=${clickedCard[0].set}&collector=${clickedCard[0].collector_number}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setForeignCard(res.image_uris.normal);
        window.alert("Card Translated!");
      })
      .catch(() => window.alert("There is no Japanese card available."));
  };

  const removeCard = async (url) => {
    await fetch(`/remove/?url=${url}`, {
      method: "DELETE",
    });
    fetch("/load_db_data")
      .then((res) => res.json())
      .then((res) => setData(JSON.parse(res)));
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
      <h2 className="page-title">MTG Translator</h2>
      <div className="foreign-card-container">
        <h1>Translated Cards</h1>
        {data &&
          data.map((e) => (
            <img
              onClick={(e) => removeCard(e.target.src)}
              className="foreign-card"
              src={e.fields.url}
            ></img>
          ))}
      </div>
      <div className="search-container">
        <input
          onKeyUp={handleKeyPress}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button onClick={fetchCard}>Search</button>
      </div>
      <h1 className="search-title">Search Results</h1>
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
      <div className="footer"></div>
    </div>
  );
}

export default App;
