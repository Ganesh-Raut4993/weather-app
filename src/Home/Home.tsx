import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setError,
  setLastSearchedCity,
  setLoading,
  setWeatherData,
} from '../redux/weatherSlice';
import {AppDispatch, RootState} from '../redux/store';
import WeatherCard from '../componants/WeatherCard';
import {fetchWeatherData} from '../services/WeatherService';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState<string>('');
  const {data, isLoading, error, lastSearchedCity} = useSelector(
    (state: RootState) => state.weather,
  );

  const handleInputChange = (input: string) => {
    if (!city) {
      setCity(input.trim());
    } else {
      // Replace multiple consecutive spaces with a single space
      const sanitizedInput = input.replace(/\s{2,}/g, ' ');
      setCity(sanitizedInput);
    }
  };

  // Handle Search
  const handleSearch = async () => {
    if (!city.trim()) return;
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const weatherData = await fetchWeatherData(city);
      dispatch(setWeatherData(weatherData));
      dispatch(setLastSearchedCity(city));
    } catch (err: any) {
      dispatch(setError(err.message || 'City not found'));
      dispatch(setWeatherData(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {lastSearchedCity && (
          <Text style={styles.lastSearchedResult}>
            Last searched city: {lastSearchedCity}
          </Text>
        )}
        <TextInput
          style={styles.cityInputFiled}
          placeholder="Enter city name"
          onChangeText={handleInputChange}
          value={city}
          maxLength={20}
        />

        {isLoading && <Text style={styles.loading}>Loading...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}

        {city ? (
          <Text numberOfLines={1} style={styles.result}>
            You are searching for:{' '}
            <Text style={{color: '#007AFF'}}>{city}</Text>
          </Text>
        ) : null}

        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
          <Text style={styles.buttonSearchText}>Get Weather</Text>
        </TouchableOpacity>
        {error ? (
          <Text
            style={
              styles.error
            }>{`Error fetchig ${city} weather information `}</Text>
        ) : null}

        {data && !error ? (
          <WeatherCard
            cityName={data.name}
            temperature={data.main.temp}
            condition={data.weather[0].main === 'Clear' ? 'Sunny' : 'Cloudy'}
            icon={data.weather[0].icon}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  lastSearchedResult: {
    color: 'gray',
  },
  cityInputFiled: {
    width: '80%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  result: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 16,
    color: '#333',
  },
  buttonSearch: {
    width: '80%',
    height: 42,
    borderRadius: 27,
    marginTop: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
  },
  buttonSearchText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
  },
  loading: {
    color: 'blue',
    marginTop: 8,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});
