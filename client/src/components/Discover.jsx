import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomNumbers } from "../utils";
import Spinner from "./Spinner";

export default function Discover({ cats }) {
  const [nums, setNums] = useState([]);

  useEffect(() => {
    if (cats?.length > 0) {
      const numbers = getRandomNumbers(4, cats.length);
      setNums(numbers);
    }
  }, [cats?.length]);

  return (
    <div className="discover">
      <p className="title title-small">Most Searched Breeds</p>
      <div className="line"></div>
      <div className="discover__title">
        {cats?.length && (
          <h3 className="title title-big">{cats.length} Breeds For you to discover</h3>
        )}
        <Link to="/popular" className="link-cta">
          SEE MORE <span> &rarr;</span>
        </Link>
      </div>
      <div className="discover__items">
        {nums.length > 0 ? (
          nums.map((num) => {
            const cat = cats[num];
            return (
              <Link key={cat.id} to={`/breed/${cat.id}`}>
                <div className="discover-item">
                  <div className="discover-image">
                    <img src={cat.image?.url || "/noimage.png"} alt={cat.name} />
                  </div>
                  <p>{cat.name}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
