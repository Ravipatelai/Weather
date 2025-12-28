import { useEffect, useState } from "react";
import { MdKeyboardVoice, MdSettingsVoice } from "react-icons/md";

import Spinner from "./components/Spinner";
import { setWeatherName } from "./setWeatherName";
import WeatherDetails from "./components/WeatherDetails";

// ✅ Correct way to access VITE API Key
const apiKey = import.meta.env.VITE_API_KEY;

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [listening, setIsListening] = useState(false);

  // 🎤 Initialize voice recognition
  useEffect(() => {
    if (!recognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const newRecognition = new SpeechRecognition();
      newRecognition.lang = "en-US";
      newRecognition.interimResults = false;

      newRecognition.onresult = async (event) => {
        const voiceQuery = event.results[0][0].transcript.trim();
        await search(voiceQuery);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }
  }, [recognition]);

  const startVoiceSearch = () => {
    setIsListening(true);
    if (recognition) recognition.start();
  };

  // 🌤️ Default city weather on load
  useEffect(() => {
    fetchWeather("Aurangabad");
  }, []);

  // ✅ Function to fetch weather by city
  const fetchWeather = (cityName) => {
    if (!apiKey) {
      alert("API key is missing! Please check your .env file.");
      return;
    }

    setLoading(true);

    fetch(`${api.base}weather?q=${encodeURIComponent(cityName)}&units=metric&APPID=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== 200) {
          alert(result.message || "City Not Found");
          setLoading(false);
          setQuery("");
        } else {
          setWeather(result);
          setQuery("");
          setLoading(false);
          setWeatherName(result.weather[0].main, setName);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // 🔍 Input search
  const search = (searchQuery = query) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery || Number.isInteger(parseInt(trimmedQuery))) {
      alert("Please enter a valid city");
      setQuery("");
      return;
    }
    fetchWeather(trimmedQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search(query);
  };

  // 🌈 Change background based on weather
  useEffect(() => {
    if (name) {
      document.body.className = "";
      document.body.classList.add(name);
    }
  }, [name]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="search-box flex justify-center items-center mt-4 mb-8 px-5">
        <div>
          <input
            type="text"
            className="placeholder-orange-500 mr-5 border-black dark:border-cyan-300 border-2 rounded-2xl w-40 md:w-96 dark:bg-black dark:text-white invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            placeholder="Enter City..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
            required
            name="city"
          />
        </div>

        <div>
          <button
            type="button"
            className="focus:outline-none font-medium rounded-full text-sm px-4 py-2.5 mt-1 text-center me-2 text-rose-600 dark:text-sky-500 dark:bg-black border-2 border-green-500"
            onClick={() => search(query)}
          >
            Search
          </button>
        </div>

        <div>
          <button type="button" onClick={startVoiceSearch}>
            {listening ? (
              <MdSettingsVoice size={32} className="mt-1 text-red-500" />
            ) : (
              <MdKeyboardVoice size={32} className="mt-1 text-red-500" />
            )}
          </button>
        </div>
      </div>

      <WeatherDetails weather={weather} name={name} />
    </>
  );
}

export default App;
