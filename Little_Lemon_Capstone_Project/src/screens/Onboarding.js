import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../App';

export default function Onboarding() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const { onboard } = useContext(AuthContext);

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = firstName.trim().length > 0 && isEmailValid(email);

  const handleNext = () => {
    if (isFormValid) {
      onboard({ firstName, email, lastName: '', phoneNumber: '', orderStatuses: false, passwordChanges: false, specialOffers: false, newsletter: false });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Let us get to know you</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name *</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="John" />
        
        <Text style={styles.label}>Email *</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="john@example.com" keyboardType="email-address" autoCapitalize="none" />
      </View>

      <TouchableOpacity 
        style={[styles.button, !isFormValid && styles.buttonDisabled]} 
        disabled={!isFormValid}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EDEFEE', padding: 20, justifyContent: 'space-between' },
  title: { fontSize: 40, fontWeight: 'bold', color: '#495E57', textAlign: 'center', marginTop: 40 },
  subtitle: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
  inputContainer: { flex: 1, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 5, color: '#333333' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: '#F4CE14', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonDisabled: { backgroundColor: '#CCCCCC' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#333333' }
});