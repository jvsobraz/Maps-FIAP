/* Vamos modificar nosso App.js para o código a seguir, primeiro devemos fazer os
seguintes imports: */

import React, { useEffect, useState, useRef } from 'react';

import {
  LocationAccuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from 'expo-location'; 

import MapView, { Marker } from 'react-native-maps';

import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

/* Depois dentro da nossa função App podemos trazer a função
requestLocationPermissions() que vai requisitar o usuário permissão para pegar a
localização dele: */

async function requestLocationPermissions() {
  const { granted }= await requestForegroundPermissionsAsync();

  if (granted) {
    const getCurrentPosition = await getCurrentPositionAsync();
    setLocation(currentPosition);
    console.log('Localização atual ->', currentPosition);
  } else {
    console.log('Permission denied');
  }
}

/* Depois dentro da nossa função App podemos trazer a função myCustomLocation()
que vai pegar a informação de usuário digitada: */

async function myCustomLocation() {
  if (newLocation != '') {
    const splitLocation = newLocation.split(',');
    const latitude = parseFloat(splitLocation[0]);
    const longitude = parseFloat(splitLocation[1]);
    myCustomLocation
    setLocation({
      coords: {
        latitude,
        longitude
      }
    });
  }
}

/* Traremos a requestLocationPermissions() pra dentro do useEffect() pra chamar
quando abrir a página: */

useEffect(() => {
  requestLocationPermissions();
}, [])

/* Teremos mais um useEffect para "visualizar" a posição da pessoa enquanto ela
anda: */

useEffect(() => {
  watchPositionAsync({
    accuracy: LocationAccuracy.Highest,
    timeInterval: 1000,
    distanceInterval: 1
  }, (response) => {
    console.log('Nova Localização ->', response);
    setLocation(response);
    mapRef.current?.animateCamera({
      pitch: 70,
      center: response.coords
    })
  })
}, [])

/* Aqui temos toda nossa DOM, com os estilos e renderizando nosso MapView: */

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.text}>Maps FIAP</Text>
    </View>
    {Location &&
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0805,
        longitudeDelta: 0.0805
      }}
    >
    </MapView>
  }
  <View style={styles.TextInputContainer}>
    <TextInput
      styles={styles.TextInput}
      placeholder='Digite a latitude e a longitude'
      onChangeText={setNewLocation}
      value={newLocation}
    />
    <TouchableOpacity style={styles.button}>
      <Text style={styles.textButton} onPress={myCustomLocation}>IR</Text>
    </TouchableOpacity>
  </View>
</View>
)

/* E aqui nossos estilos: */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 2,
    width: '100%'
  },
  header: {
    height: 100,
    justifyContent: 'center'
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold'
  },
  TextInputContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  TextInput: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    width: 50,
    borderRadius: 20,
    justifyContent: 'center'
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});