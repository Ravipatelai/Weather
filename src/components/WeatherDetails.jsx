/* eslint-disable react/prop-types */
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

function WeatherDetails({weather}) {

    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long", // Day of the week
      day: "numeric", // Day of the month
      month: "long", // Month name
      year: "numeric", // Full year
    });

  return (
    
    <div
    className="app  w-80  md:w-[700px] mt-12 rounded-3xl bg-gray-50 backdrop-filter backdrop-blur-sm   dark:bg-black border-2  dark:border-rose-600  shadow-md dark:shadow-red-500 "
    
  >
    {typeof weather.main != "undefined" ? (
      <div className="mt-10">
        <h1 className="temperature  dark:text-purple-500 text-cyan-400 font-bold">
          {Math.round(weather.main.temp)}°c
        </h1>
        <p className=" location uppercase dark:text-green-600 text-red-500 font-semibold">
          {weather.weather[0].description}
        </p>

        <div className="location-box  dark:text-pink-500 text-orange-500 ">
          <div className="location mt-11">
            {weather.name}, {weather.sys.country}
          </div>

          <div className="date">{formattedDate}</div>
        </div>
        <div className="weather-box  mt-10 dark:text-sky-500 text-pink-500">
          <div className="temp">
            <p className="wind-speed">
              {Math.round(weather.wind.speed)}km/h{" "}
              <span>
                <FaWind />
              </span>
            </p>

            <p className="humidity">
              {Math.round(weather.main.humidity)}
              <span>
                <WiHumidity size={40} />
              </span>
            </p>
          </div>
        </div>
      </div>
    ) : (
      <h1 className="text-2xl text-red-500 font-bold">
        No data for given city
      </h1>
    )}
  </div>
  )
}

export default WeatherDetails