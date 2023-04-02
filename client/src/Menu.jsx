import axios from "axios";
import { useState, useEffect } from "react";
import "./css/menu.css";

function Menu(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [lang , setLang] = useState("C++");
  async function getMenuItem() {
    let data = await axios.get("https://sarazaiten.el.r.appspot.com/");
    setMenuItems(data.data);
  }

  function sendPrompt(e) {
    console.log(e.target.value);
    props.processPrompt(e.target.value + " in " + lang);
  }

  function updateLang(e) {
    setLang(e.target.value)
  }

  useEffect(() => {
    getMenuItem();
  }, []);

  return (
    <div className="mainMenuStyle" style={{ maxWidth: "500px" }}>
      <ul>
        {menuItems.map((items, index) => (
        <>
          <button
            key={index}
            value={menuItems[index].prompt}
            onClick={sendPrompt}
            style={{
              cursor: "pointer",
              display: "block",
              marginTop: "20px",
              backgroundColor: "transparent",
              color: "#2C3333",
              borderStyle: "none",
              fontSize: "1em",
              textAlign: "left",
            }}
          >
            {menuItems[index].title}
          </button>
          </>
        ))}
      </ul>
      <label for="">Enter language of choice</label>
      <input onChange={updateLang} defaultValue="C++" style={{width : "100%"}}/>
    </div>
  );
}

export default Menu;
