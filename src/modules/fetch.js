function fetchCurrentWeather(longitude, latitude, isDegC, isMetric) {
  const searchURL = new URL(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&hourly=weathercode,temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,dewpoint_2m,apparent_temperature" +
      (isDegC ? "" : "&temperature_unit=fahrenheit") +
      (isMetric ? "" : "&windspeed_unit=mph&precipitation_unit=inch")
  );

  // Fetch weather data, reject if response.ok is false
  return (
    fetch(searchURL.toString())
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      )
      // Else, return an object of time and temperature arrays
      .then(
        (json) => ({
          time: json.hourly.time,
          weathercode: json.hourly.weathercode,
          temperature_2m: json.hourly.temperature_2m,
          windspeed_10m: json.hourly.windspeed_10m,
          precipitation: json.hourly.precipitation,
          relativehumidity_2m: json.hourly.relativehumidity_2m,
          dewpoint_2m: json.hourly.dewpoint_2m,
          apparent_temperature: json.hourly.apparent_temperature,
        }),
        (reason) => Promise.reject(new Error(reason))
      )
  );
}

function fetchDailyWeather(longitude, latitude, isDegC, isMetric) {
  const searchURL = new URL(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto" +
      (isDegC ? "" : "&temperature_unit=fahrenheit") +
      (isMetric ? "" : "&windspeed_unit=mph&precipitation_unit=inch")
  );

  // Fetch weather data, reject if response.ok is false
  return (
    fetch(searchURL.toString())
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      )
      // Else, return an object of time and temperature arrays
      .then(
        (json) => ({
          temperature_2m_max: json.daily.temperature_2m_max,
          temperature_2m_min: json.daily.temperature_2m_min,
          sunrise: json.daily.sunrise,
          sunset: json.daily.sunset,
        }),
        (reason) => Promise.reject(new Error(reason))
      )
  );
}

function fetchLonAndLat(query) {
  // Initialize link and append query to the link
  const searchURL = new URL("https://api.geoapify.com/v1/geocode/search");
  const API_KEY = "965f1f8dff9a4cedb5aa2889c3ecdf9e";
  searchURL.searchParams.append("text", query);
  searchURL.searchParams.append("format", "json");
  searchURL.searchParams.append("apiKey", API_KEY);

  const areSameName = (str1, str2) => {
    if (str1 === str2) {return true;}
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {return false;}
    return str1.toLowerCase().replace(/\s/g, '') === str2.toLowerCase().replace(/\s/g, '');
  };

  // Formatting the location for printing
  const locPrint = (city, state, country) => {
    let res = "";
    if (city !== undefined) {
      res += city + ", ";
    }
    if (state !== undefined && !areSameName(state, city)) {
      res += state + ", ";
    }
    if (country !== undefined) {
      res += country;
    }
    return res.length === 0 ? "Unknown Location" : res;
  }

  // Fetch data, then get lon and lat, return error if length is 0
  return (
    fetch(searchURL.toString())
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      )
      // Reject if length is 0 or json rejects, else return
      .then(
        (json) =>
          (json = json.results).length === 0
            ? Promise.reject(new Error("No results found for query."))
            : { 
                lon: Number(json[0].lon), 
                lat: Number(json[0].lat), 
                location: locPrint(json[0].city, json[0].state, json[0].country),
              },
        (reason) => Promise.reject(new Error(reason))
      )
  );
}

function fetchUniversities(query) {
  // Initialize link and append query to the link
  const searchURL = new URL("http://universities.hipolabs.com/search?");
  searchURL.searchParams.append("name", query);

  // Fetch data, then return error if length is 0, else return list of school names
  return fetch(searchURL.toString())
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response.statusText)
    )
    .then(
      (json) => json.map((school) => school.name),
      (reason) => Promise.reject(new Error(reason))
    );
}

export async function fetchUniWeather(query, isDegC, isMetric) {
  // Getting average of an array of number
  const avg = (arr) => arr === undefined ? "N/A" : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

  // Retrying fetch with delay
  const wait = (timeout) => new Promise((res) => setTimeout(res, timeout));
  const retryFetchFunc = async (input, f, retries, delay) => {
    while (retries > 0) {
      try {
        return await f(input);
      } catch (error) {
        --retries;
        await wait(delay);
      }
    }
    return Promise.reject(new Error("Failed to fetch after many retries"));
  };

  // Get weather data in current hour
  const curHour = (new Date).getUTCHours();
  const getCurData = (time, data) => {
    for (let i = 0; i < 24; ++i) {
      if (+time[i].substring(11,13) === curHour) {
        return data[i];
      }
    }
    return "N/A";
  }
  
  // Get unique list of universities from query, return error if length is 0
  let uniList = new Set(await fetchUniversities(query));
  if (uniList.size === 0)
    return Promise.reject(new Error("No results found for query."));
  uniList = Array.from(uniList);

  // Get list of coordinates for each school, retry fetching 3 times with 0.5s timeout
  const coordList = await Promise.all(
    uniList.map(async (uni) => {
        await wait(250);
        return retryFetchFunc(uni, fetchLonAndLat, 3, 500)
          .then((x) => ({ rej: false, name: uni, val: x }))
          .catch((r) => ({ rej: true, name: uni, val: r }));
      }
    )
  ).then((arr) => arr.filter((x) => !x.rej));

  // Get list of weather data for individual universities
  const weatherList = await Promise.all(
    coordList.map(async (uni) => {
      const cur = await fetchCurrentWeather(uni.val.lon, uni.val.lat, isDegC, isMetric);
      const daily = await fetchDailyWeather(uni.val.lon, uni.val.lat, isDegC, isMetric);
      return ({
        name: uni.name,
        curTemp: getCurData(cur.time, cur.temperature_2m),
        humid: getCurData(cur.time, cur.relativehumidity_2m),
        wind: getCurData(cur.time, cur.windspeed_10m),
        prep: getCurData(cur.time, cur.precipitation),
        wmo: getCurData(cur.time, cur.weathercode),
        appTemp: getCurData(cur.time, cur.apparent_temperature),
        dew: getCurData(cur.time, cur.dewpoint_2m),
        maxTemp: daily.temperature_2m_max[0],
        minTemp: daily.temperature_2m_min[0],
        sunrise: new Date(daily.sunrise[0]),
        sunset: new Date(daily.sunset[0]),
        location: uni.val.location,
      });
    })).catch(err => console.log(err.message));
  
  return weatherList;
}

