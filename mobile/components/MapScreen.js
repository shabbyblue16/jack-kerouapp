import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { GOOGLE_API_KEY } from '@env';

import { SearchBar } from './index';
import _debounce from './debounce';

const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place';

const MapScreen = () => {
  const [search, setSearch] = useState({ term: '', fetchPredictions: false });
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(true);
  // const [dest, setDest] = useState({lat: 0.0000, long: 0.0000});
  const [showDest, setShowDest] = useState(false);

  const region = {
    latitude: 35.5951,
    longitude: -82.5515,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const biltmore = {
    latitude: 35.5406,
    longitude: -82.5523,
  }

  const onChange = () => {
    if (search.term.trim() === '') return;
    if (!search.fetchPredictions) return;

    const apiUrl = `${GOOGLE_PLACES_API}/autocomplete/json?&input=${search.term}&location=${region.latitude}&2C${region.longitude}&radius=50000&strictBounds=true&key=${GOOGLE_API_KEY}`;
    axios({
      method: 'get',
      url: apiUrl,
    })
      .then((res) => {
        console.log(res.data);
        const { predictions } = res.data;
        setPredictions(predictions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _debounce(onChange, 1000, [search.term]);

  const onTap = (placeId, description) => {
    const apiUrl = `${GOOGLE_PLACES_API}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    axios({
      method: 'get',
      url: apiUrl
    })
      .then((res) => {
        const { location } = res.data.result.geometry;
        console.log('location', location);
        const { lat, lang } = location;
        setShowPredictions(false);
        setSearch({ term: description });
        // setDest({ lat: lat, lang: lang });
        setShowDest(true);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}>
        <Marker
          coordinate={{
            latitude: 35.5916,
            longitude: -82.5504,
          }}
          description={'rider'}
        />
        <Marker
          coordinate={{
            latitude: 35.5751,
            longitude: -82.5515
          }}
          description={'driver'}>
        </Marker>
        {showDest && <Marker
          coordinate={biltmore}
          description={'driver'}>
        </Marker>}
      </MapView>
      <View style={search}>
        <SearchBar
          value={search.term}
          onChange={(text) => {
            setSearch({ term: text, fetchPredictions: true });
          }}
          showPredictions={showPredictions}
          predictions={predictions}
          onTap={onTap}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  search: {
    paddingHorizontal: 20,

  }
});

export default MapScreen;