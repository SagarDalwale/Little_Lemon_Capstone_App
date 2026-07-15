import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../App';
import Header from '../components/Header';

export default function Profile({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: '', lastName: '', email: '', phoneNumber: ''
  });

  useEffect(() => {
    const loadProfileData = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) setProfile(JSON.parse(data));
    };
    loadProfileData();
  }, []);

  const handleSaveChanges = async () => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Changes saved successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} showAvatar={false} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={profile.firstName} onChangeText={(text) => setProfile({...profile, firstName: text})} />

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={profile.lastName} onChangeText={(text) => setProfile({...profile, lastName: text})} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={profile.email} onChangeText={(text) => setProfile({...profile, email: text})} keyboardType="email-address" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={profile.phoneNumber} onChangeText={(text) => setProfile({...profile, phoneNumber: text})} keyboardType="phone-pad" />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333333' },
  label: { fontSize: 14, color: '#666666', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  saveButton: { backgroundColor: '#495E57', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  logoutButton: { backgroundColor: '#F4CE14', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#EE9972' },
  logoutButtonText: { color: '#333333', fontSize: 16, fontWeight: 'bold' }
});