import React from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { generatePopularList } from '../utils';

export default function PopularPage({ cats }) {
  //const cats = useCats();
  const { data: popular } = useAsync('popular');

  const [popularList, setPopularList] = React.useState([]);

  React.useEffect(() => {
    if (popular && cats) {
      //seed list using api data
      const list = generatePopularList(popular, cats);
      setPopularList(list);
    }
    return () => {};
  }, [popular, cats]);

  if (!popular || !cats) {
    return <h2>Loading Results...</h2>;
  }

  return (
    <div className="popular">
      <h1 className="title title-medium">Top 10 most searched breeds</h1>
      <div className="popular__results">
        {popularList.map((cat, i) => {
          return (
            <div className="popinfo" key={cat.id}>
              <div className="popinfo__image image-small">
                <img src={cat.image?.url || '/noimage.png'} alt={cat.name} />
              </div>
              <div className="popinfo__details">
                <Link to={`/breed/cat.id`}>
                  <h3 className="title title-big">
                    {i + 1}. {cat.name}
                  </h3>
                </Link>
                <p>{cat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
