
export const setWeatherName  = (weatherMain,setName) => {

    if (weatherMain === "Clouds") {
        setName("cloudy");
      } else if (weatherMain === "clear") {
        setName("clear");
      } else if (weatherMain === "Rain") {
        setName("rain");
      } else if (weatherMain === "Thunderstorm") {
        setName("thunder");
      } else if (weatherMain === "Drizzle") {
        setName("drizzle");
      } else if (weatherMain === "Snow") {
        setName("snow");
      } else if (
        weatherMain === "Mist" ||
        weatherMain === "Fog"
      ) {
        setName("mist");
      } else if (weatherMain === "Tornado") {
        setName("tornado");
      } else if (
        weatherMain === "Sand" ||
        weatherMain === "Dust"
      ) {
        setName("sand");
      } else {
        setName("clear");
      }
}



