import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./components/Discover";
import Hero from "./components/Hero";
import HomeInfo from "./components/HomeInfo";
import Spinner from "./components/Spinner";
import Layout from "./containers/Layout";
import { useAsync } from "./hooks/useAsync";
import BreedPage from "./views/BreedPage";
import PopularPage from "./views/PopularPage";

function App() {
  const { data: cats } = useAsync("breeds");

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/breed/:breedId" element={<BreedPage cats={cats} />} />
          <Route path="/popular" element={cats ? <PopularPage cats={cats} /> : <Spinner />} />
          <Route
            path="/"
            element={
              <div>
                <Hero cats={cats} />
                <Discover cats={cats} />
                <HomeInfo />
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
