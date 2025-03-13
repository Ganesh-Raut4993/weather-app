import {Image, StyleSheet, Text, View} from 'react-native';

interface WeatherCardProps {
  cityName: string;
  temperature: string;
  condition: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  cityName,
  temperature,
  condition,
  icon,
}) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <View style={styles.card}>
      <Text style={styles.cityName}>{cityName}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Image
        resizeMode="contain"
        style={styles.icon}
        source={{uri: iconUrl}} // Dynamically load the icon using the URL
      />
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 16,
    width: '80%',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 20,
    marginVertical: 8,
  },
  condition: {
    fontSize: 16,
    color: '#555',
  },
  icon: {
    width: 90,
    height: 90,
    marginTop: 8,
  },
});
