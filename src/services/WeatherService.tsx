import Config from '../../config';
import {serializer} from '../../metro.config';

const BASE_URL = Config.BASE_URL;
const API_KEY = Config.API_KEY;

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`,
    );

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching weather data');
    }

    const data = await response.json(); // Parse JSON response
    return data; // Return the weather data
  } catch (error: any) {
    // Handle network or other errors
    throw new Error(error.message || 'An unknown error occurred');
  }
};
