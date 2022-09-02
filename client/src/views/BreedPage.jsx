import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateRating } from "../utils";

export default function BreedPage({ cats }) {
  const { breedId } = useParams();
  const [cat, setCat] = useState({});

  useEffect(() => {
    setCat(
      cats.find((item) => {
        return item.id === breedId;
      })
    );
  }, [breedId, cats]);

  useEffect(() => {
    //update search count in database
    const sendReq = async (req) => {
      try {
        const res = await axios.post(
          `/api/search`,
          { id: cat.id, name: cat.name },
          { cancelToken: req.token }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (cat && cat.id) {
      let request = axios.CancelToken.source();
      sendReq(request);
    }
  }, [cat]);

  if (!cat) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="breed-page">
      <div className="catinfo">
        <div className="catinfo__image">
          <img src={cat.image?.url || "/noimage.jpg"} alt={cat.name} />
        </div>
        <div className="catinfo__details">
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
          <div className="catinfo__properties">
            <ul className="list-flex-start">
              <li>
                <strong>Temperament:</strong>
                <p>{cat.temperament}</p>
              </li>
              <li>
                <strong>Origin:</strong>
                <p>{cat.origin}</p>
              </li>
              <li>
                <strong>Life Span:</strong>
                <p>{cat.life_span}</p>
              </li>
            </ul>
            <ul>
              <li>
                <strong>Adaptability:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.adaptability).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Affection Level:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.affection_level).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Child Friendly:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.child_friendly).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Grooming:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.grooming).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Intelligence:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.intelligence).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Health Issues:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.health_issues).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Social Needs:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.social_needs).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
              <li>
                <strong>Stranger Friendly:</strong>
                <div className="catinfo__rating">
                  {generateRating(cat.stranger_friendly).map((item, i) => {
                    return (
                      <span key={i} className={`rating-item ${item ? "alive" : "ghost"}`}></span>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cat__photos"></div>
    </div>
  );
}
