import React from "react";
import "./App.css";
import Banner from "./components/Banner";
import requests from "./services/request";
import Row from "./components/Row";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app">
      {/** navbar */}
      <NavBar />
      {/** banner */}
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comediy Movies" fetchUrl={requests.fetchComediMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
