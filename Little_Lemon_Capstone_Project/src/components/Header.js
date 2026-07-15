import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Header({ navigation, showAvatar }) {
  return (
    <View style={styles.headerContainer}>
      {navigation.canGoBack() && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      )}
      <Image 
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Lemon.svg' }}
        style={styles.logo}
        resizeMode="contain"
      />
      {showAvatar ? (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatarPlaceholder} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EDEFEE', marginTop: 30 },
  logo: { width: 120, height: 40, flex: 1 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#495E57' },
  backButton: { paddingRight: 15 },
  backText: { fontSize: 24, fontWeight: 'bold', color: '#495E57' }
});