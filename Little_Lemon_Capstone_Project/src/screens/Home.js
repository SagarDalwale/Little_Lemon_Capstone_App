import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

const menuData = [
  { id: '1', name: 'Greek Salad', price: '$12.99', description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese.', category: 'starters', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500' },
  { id: '2', name: 'Bruschetta', price: '$7.99', description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.', category: 'starters', image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500' },
  { id: '3', name: 'Lemon Pasta', price: '$14.99', description: 'Italian pasta sauce with fresh lemon juice, heavy cream, garlic, and parmesan cheese.', category: 'mains', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500' },
];

const categories = ['starters', 'mains', 'desserts', 'drinks'];

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(menuData);

  useEffect(() => {
    let result = menuData;
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredMenu(result);
  }, [searchQuery, selectedCategory]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showAvatar={true} />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <Text style={styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search menu items..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownTitle}>ORDER FOR DELIVERY!</Text>
        <FlatList 
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryButton, selectedCategory === item && styles.categoryActive]}
              onPress={() => setSelectedCategory(selectedCategory === item ? '' : item)}
            >
              <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList 
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
              <Text style={styles.menuItemPrice}>{item.price}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  hero: { backgroundColor: '#495E57', padding: 20 },
  heroTitle: { fontSize: 40, fontWeight: 'bold', color: '#F4CE14' },
  heroSubtitle: { fontSize: 24, color: '#FFFFFF', marginBottom: 10 },
  heroText: { color: '#EDEFEE', fontSize: 16, marginBottom: 15 },
  searchBar: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 10, fontSize: 16 },
  breakdownContainer: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#EDEFEE' },
  breakdownTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  categoryButton: { backgroundColor: '#EDEFEE', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 16, marginRight: 10 },
  categoryActive: { backgroundColor: '#495E57' },
  categoryText: { color: '#495E57', fontWeight: 'bold' },
  categoryTextActive: { color: '#FFFFFF' },
  menuItem: { flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EDEFEE', alignItems: 'center' },
  menuItemName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  menuItemDesc: { color: '#666666', marginBottom: 5 },
  menuItemPrice: { fontSize: 16, fontWeight: 'bold', color: '#495E57' },
  menuItemImage: { width: 80, height: 80, borderRadius: 8, marginLeft: 15 }
});