
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudSun, CloudRain, Sun, CloudSnow, Wind, Droplets, Thermometer, Eye, MapPin } from "lucide-react";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    vis_km: number;
    uv: number;
  };
}

const WeatherDisplay = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");

  // Check if API key is stored in localStorage
  useEffect(() => {
    const storedApiKey = localStorage.getItem('weatherApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      getUserLocation();
    } else {
      setLoading(false);
    }
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to a default location (Mumbai, India)
          fetchWeatherData('Mumbai,India');
        }
      );
    } else {
      // Fallback to a default location
      fetchWeatherData('Mumbai,India');
    }
  };

  const fetchWeatherData = async (location: string) => {
    const storedApiKey = localStorage.getItem('weatherApiKey');
    if (!storedApiKey) {
      setError('Please enter your WeatherAPI.com API key');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${storedApiKey}&q=${location}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error('Weather API error:', err);
      setError('Failed to fetch weather data. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('weatherApiKey', apiKey.trim());
      getUserLocation();
    }
  };

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      fetchWeatherData(locationInput);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    }
    if (lowerCondition.includes('snow')) {
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    }
    if (lowerCondition.includes('cloud')) {
      return <CloudSun className="h-8 w-8 text-gray-500" />;
    }
    return <Sun className="h-8 w-8 text-yellow-500" />;
  };

  if (!localStorage.getItem('weatherApiKey')) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <CloudSun className="h-5 w-5" />
            Weather Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            Get real-time weather data for better farming decisions. Enter your WeatherAPI.com API key to get started.
          </p>
          <form onSubmit={handleApiKeySubmit} className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter your WeatherAPI.com API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Key
            </Button>
          </form>
          <p className="text-xs text-blue-600 mt-2">
            Get your free API key at{" "}
            <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="underline">
              weatherapi.com
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-700">Loading weather data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
        <CardContent className="p-6">
          <p className="text-red-700 mb-4">{error}</p>
          <Button 
            onClick={() => {
              localStorage.removeItem('weatherApiKey');
              setApiKey('');
            }}
            variant="outline"
            className="border-red-300 text-red-700"
          >
            Reset API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-800 flex items-center gap-2">
            {getWeatherIcon(weather.current.condition.text)}
            Weather Information
          </CardTitle>
          <form onSubmit={handleLocationSearch} className="flex gap-2">
            <Input
              placeholder="Search location..."
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-40"
            />
            <Button type="submit" size="sm" variant="outline">
              <MapPin className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location and Temperature */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-800">
                {weather.location.name}, {weather.location.region}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="text-2xl font-bold text-blue-900">
                {weather.current.temp_c}°C
              </span>
              <span className="text-blue-700">{weather.current.condition.text}</span>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-blue-700">Humidity: {weather.current.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-blue-700">Wind: {weather.current.wind_kph} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-blue-700">Visibility: {weather.current.vis_km} km</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span className="text-blue-700">UV Index: {weather.current.uv}</span>
            </div>
          </div>
        </div>

        {/* Agricultural Insights */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-1">Agricultural Insights:</h4>
          <p className="text-green-700 text-sm">
            {weather.current.humidity > 70 
              ? "High humidity - Good for transplanting, monitor for fungal diseases"
              : weather.current.humidity < 40
              ? "Low humidity - Increase watering frequency"
              : "Moderate humidity - Ideal conditions for most plants"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
