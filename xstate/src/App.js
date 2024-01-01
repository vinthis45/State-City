import './App.css';
import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState();
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState();


  const handleCountryChange = (e) => {
    setSelectedCountries(e.target.value)
  }

  const handleStateChange = (e) => {
    setSelectedStates(e.target.value)
  }

  const getCountryData = async () => {
    try {
      const data = await fetch("https://crio-location-selector.onrender.com/countries");
      const res = await data.json();
      setCountries(res);
    } catch (err) {
      console.error(err);
    }
  }

  const getStatesData = async () => {
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountries}/states`);
      const res = await data.json();
      console.log(res);
      setStates(res);
    } catch (err) {
      console.error(err);
    }
  }

  const getCitiesData = async () => {
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountries}/state=${selectedStates}/cities`);
      const res = await data.json();
      setCities(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCountryData();
  }, []);

  useEffect(() => {
    if (selectedCountries) {
      getStatesData();
      setSelectedStates("");
      setCities([]);
      setSelectedCities("");
    }

  }, [selectedCountries]);

  useEffect(() => {
    if (selectedCountries && selectedStates) {
      getCitiesData();
      setSelectedCities("")
    }

  }, [selectedCountries, selectedStates]);


  return (
    <div className="App">
      <div>
        <h1><strong>Select Location</strong></h1>
        <div className='selectors'>
          <select onChange={handleCountryChange} value={selectedCountries} className='country'>
            <option value=" " selected disabled={!selectedCountries}>Select Country</option>
            {countries.map((item, idx) => (
              <option value={item} key={idx}>{item}</option>
            ))}
          </select>
          <select onChange={handleStateChange} value={selectedStates} className='state'>
            <option value=" " selected disabled={!selectedStates}>Select State</option>
            {states.map((item, idx) => (
              <option value={item} key={idx}>{item}</option>
            ))}
          </select>
          <select className='city' onChange={(e) => setSelectedCities(e.target.value)} value={selectedCities}>
            <option value=" " disabled={!selectedCities} selected>Select City</option>
            {cities.map((item, idx) => (
              <option value={item} key={idx}>{item}</option>
            ))}
          </select>
        </div>
        {selectedCities && (
          <h2 className='result'>You selected <span className='highlighted'>{selectedCities}</span>,
            <span className='fade'>{" "} {selectedStates}, {selectedCountries}</span>
          </h2>
        )
        }
      </div>
    </div>
  );
}

export default App;
