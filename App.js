import React, { useEffect, useState, useRef } from 'react';

import {
  LocationAccuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from 'expo-location'; 

import MapView, { Marker } from 'react-native-maps';

import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';