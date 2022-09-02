import { useEffect, useState } from "react";
import heroBg from "../images/hero-bg.png";
import logo from "../images/catwiki.svg";
import search from "../images/search.svg";
import { Link } from "react-router-dom";

export default function Hero({ cats }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setResults([]);
      if (searchTerm.length > 2) {
        setResults(cats.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase())));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
      setResults([]);
    };
  }, [searchTerm, cats]);

  return (
    <div className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero__search">
        <div className="hero__search--logo">
          <img src={logo} alt="catwiki" className="inverted" />
        </div>
        <h3 className="white">Get to know more about your cat breed</h3>
        <div className="hero__search--input">
          <input
            type="text"
            placeholder="Enter your breed"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={search} alt="search" />
        </div>
        {results.length > 0 && (
          <div className="hero__search--results">
            <ul>
              {results.map((cat) => {
                return (
                  <li key={cat.id}>
                    <Link key={cat.id} to={`/breed/${cat.id}`}>
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
