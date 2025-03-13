import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchWeatherData} from '../services/WeatherService';

interface WeatherState {
  lastSearchedCity: string | null;
  data: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  lastSearchedCity: null,
  data: null,
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLastSearchedCity: (state, action: PayloadAction<string>) => {
      state.lastSearchedCity = action.payload;
    },
    setWeatherData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setLastSearchedCity, setWeatherData, setLoading, setError} =
  weatherSlice.actions;

export default weatherSlice.reducer;
