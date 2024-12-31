import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native';
// import { fetchPosts, } from '../store/actions/action';
import axios from 'axios';
import { Pinbox } from '../assets/icons';
import { Typography } from '../utilities/constants/constant.style';
import { LightThemeColors, DarkThemeColors } from '../utilities/constants';
import { useTheme } from '../../ThemeContext';

const PlaceItem = ({ item, handleResultPress }) => {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
  const styles = createStyles(colors);
  const [pressed, setpressed] = useState(false)

  return (
    <TouchableOpacity
      style={[styles.container_C3, {
        // backgroundColor: pressed ? colors.Neutral_06 : colors.Primary_01,
        backgroundColor: colors.white,
      }]}
      onPressIn={() => setpressed(true)}
      onPressOut={() => setpressed(false)}
      onPress={() => handleResultPress(item)}
    >
      <View style={styles.location_c1}>
        <Pinbox height={32} width={32} />
      </View>
      <View style={styles.location_c2}>
        <Text style={[{ color: colors.black }]}>{item.text}</Text>
        <Text style={[{ color: colors.black, width: `80%` }]}>{item.place_name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const PlacesModal = ({ onClose, isVisible, cameraRef }) => {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === 'dark' ? DarkThemeColors : LightThemeColors;
  const styles = createStyles(colors);

  const dispatch = useDispatch();
  const [locationSearch, setlocationSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleResultPress = (item) => {
    const [longitude, latitude] = item.center;
    // dispatch(fetchPosts([latitude, longitude]));
    setlocationSearch('');
    setResults([]);
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: 17,
        animationDuration: 1000,
      });
    }
    onClose()
  };
  const handleSearch = async (text) => {
    setlocationSearch(text);
    if (text.length > 2) {
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ`);
        setResults(response.data.features);
      } catch (error) {
        console.error(error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <Modal
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container}>
          <View style={[styles.container_C1, { gap: 16 }]}>
            <View style={{ flex: 1, height: 80, justifyContent: 'center', alignItems: 'center', }}>
              <TextInput
                style={styles.searchInput}
                value={locationSearch}
                onChangeText={(e) => {
                  handleSearch(e)
                  setlocationSearch(e)
                }}
                placeholder={'Search for a location...'}
                placeholderTextColor={colors.black}
                secureEntry={false}
                maxLength={null}
              />
            </View>
            <Text style={{ color: colors.black }} onPress={() => { onClose(); setlocationSearch(''); setResults([]) }}>{'Cancel'}</Text>
          </View>
          <FlatList
            data={results}
            contentContainerStyle={{ maxWidth: '100%' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem item={item} handleResultPress={handleResultPress} />}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PlacesModal;

const createStyles = (colors) => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
    },
    container: {
      width: '100%',
      height: '90%',
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: colors.white,
    },
    container_C1: {
      height: 80,
      paddingHorizontal: 16,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: colors.black,
      borderBottomWidth: .5,
    },

    container_C3: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 16,
    },
    location_c1: {
      width: 50,
      height: 68,
      justifyContent: 'center',
    },
    location_c2: {
      width: '100%',
      minHeight: 68,
      justifyContent: 'center',
      paddingRight: 16,
      borderBottomColor: colors.black,
      borderBottomWidth: 1
    },
    searchInput: {
      width: '100%',
      paddingLeft: '5%',
      borderColor: colors.black,
      borderWidth: 1,
      borderRadius: 25,
      color: colors.black,
    }
  });
};
