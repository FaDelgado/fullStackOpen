import React, { useState, useEffect } from "react";
import axios from "axios";

const App212 = () => {
  const [paises, newPaises] = useState([]);
  const [search, newSearch] = useState([]);
  const [indexShowPais, setIndexShowPais] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [weatherCity, setWeatherCity] = useState({});
  const [capital, setCapital] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      newPaises(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=d0148c8ae1992a9a8f34a1b6b17674cd&query=${capital}`
      )
      .then((response) => {
        setWeatherCity({ ...response.data });
      });
  }, [capital]);

  const handlePaises = (event) => {
    if (event.target.value === "") return newSearch([]);

    const coinciden = paises.filter((pais) => {
      return pais.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    if (coinciden.length > 10) {
      setWeatherCity({});
      return newSearch([{ name: "Muchos paises encontrados" }]);
    }
    if (coinciden.length === 1) {
      setShowInfo(true);
      setIndexShowPais(0);
      setCapital(coinciden[0].capital);
      return newSearch(coinciden);
    }

    setWeatherCity({});
    setShowInfo(false);
    newSearch(coinciden);
  };

  function setIndex(index) {
    setIndexShowPais(index);
    setCapital(search[index].capital);
    setShowInfo(true);
  }

  const InfoPais = ({ paisFound }) => {
    if (
      paisFound.length === 0 ||
      !paisFound[0].hasOwnProperty("languages") ||
      !showInfo
    )
      return <div></div>;

    return (
      <div>
        <h1>{paisFound[indexShowPais].name}</h1>
        <ul>
          <li>Capital: {paisFound[indexShowPais].capital}</li>
          <li>Poblacion: {paisFound[indexShowPais].population}</li>
        </ul>
        <h3>Lenguajes:</h3>
        <ul>
          {paisFound[indexShowPais].languages.map((leng) => (
            <li key={leng.name}>{leng.name}</li>
          ))}
        </ul>

        <img src={paisFound[indexShowPais].flag} alt="bandera" />
      </div>
    );
  };

  const WeatherByCity = ({ weather }) => {
    if (!weather.hasOwnProperty("location")) return <div></div>;
    return (
      <div>
        <h1>{weather.location.name}</h1>
        <h3>{weather.current.weather_descriptions}</h3>
        <h3>{weather.current.temperature}</h3>
        <img src={weather.current.weather_icons[0]} alt="weather" />
      </div>
    );
  };

  const Button = ({ index }) => {
    if (!search[0].hasOwnProperty("languages")) return <div></div>;
    return <button onClick={() => setIndex(index)}>Ver</button>;
  };

  const ListPaises = () => {
    if (search.length === 1 && search[0].hasOwnProperty("languages")) {
      return (
        <div>
          <InfoPais paisFound={search} />
          <WeatherByCity weather={weatherCity} />
        </div>
      );
    }

    return (
      <div>
        <ul>
          {search.map((pais, index) => (
            <li key={pais.name}>
              {pais.name}
              <Button index={index} />
            </li>
          ))}
        </ul>
        <InfoPais paisFound={search} />
        <WeatherByCity weather={weatherCity} />
      </div>
    );
  };

  return (
    <div>
      Buscar
      <input onChange={handlePaises} placeholder="buscar" />
      <ListPaises />
    </div>
  );
};

export default App212;
