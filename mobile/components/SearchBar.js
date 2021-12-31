import React, { FunctionComponent, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';

const SearchBar = ({
  value,
  onChange,
  onTap,
  predictions,
  showPredictions }) => {
  const [inputSize, setInputSize] = useState({ width: 0, height: 0 });

  const renderPredictions = (predictions) => {
    return (
      <FlatList
        data={predictions}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.prediction}
              onPress={() => onTap(item.place_id, item.description)} >
              <Text numberOfLines={1}>{item.description}</Text>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => item.place_id}
        keyboardShouldPersistTaps='handled'
        style={styles.predictionsContainer}
      />
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search destination'
        value={value}
        onChangeText={onChange}
        returnKeyType='search'
        onLayout={(e) => {
          const { heigh, width } = e.nativeEvent.layout;
          setInputSize({ heigh, width });
        }}
      />
      {showPredictions && renderPredictions(predictions)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 20,
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  predictionsContainer: {
    padding: 10,
  },
  prediction: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});

export default SearchBar;