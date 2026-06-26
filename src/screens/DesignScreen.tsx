import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../store/store';

type Props = NativeStackScreenProps<any, 'Design'>;

const FASHION_ITEMS = {
  tops: ['Red T-Shirt', 'Blue Blouse', 'White Crop Top', 'Black Jacket', 'Pink Sweater'],
  bottoms: ['Blue Jeans', 'Black Skirt', 'White Shorts', 'Brown Pants', 'Denim Skirt'],
  shoes: ['Red Heels', 'White Sneakers', 'Black Boots', 'Gold Sandals', 'Pink Flats'],
  accessories: ['Gold Necklace', 'Pearl Earrings', 'Sunglasses', 'Hat', 'Scarf'],
};

export default function DesignScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.fashion.selectedItems);
  const [outfitName, setOutfitName] = useState('');

  const handleSelectItem = (category: string, item: string) => {
    dispatch({
      type: 'SELECT_ITEM',
      payload: { category, item },
    });
  };

  const handleSaveOutfit = () => {
    if (!outfitName.trim()) {
      Alert.alert('Error', 'Please enter an outfit name');
      return;
    }
    if (!selectedItems.top || !selectedItems.bottom || !selectedItems.shoes) {
      Alert.alert('Incomplete Outfit', 'Please select a top, bottom, and shoes');
      return;
    }

    const newOutfit = {
      id: Date.now().toString(),
      name: outfitName,
      top: selectedItems.top,
      bottom: selectedItems.bottom,
      shoes: selectedItems.shoes,
      accessory: selectedItems.accessory || 'None',
      createdAt: new Date(),
      style: 'casual' as const,
    };

    dispatch({
      type: 'SAVE_OUTFIT',
      payload: newOutfit,
    });

    Alert.alert('Success', 'Outfit saved! Go to Runway to display it.');
    setOutfitName('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.previewSection}>
        <Text style={styles.sectionTitle}>Your Design Preview</Text>
        <View style={styles.preview}>
          <Text style={styles.previewText}>👤</Text>
          <View style={styles.selectedItems}>
            <Text style={styles.selectedItem}>Top: {selectedItems.top || 'Not selected'}</Text>
            <Text style={styles.selectedItem}>Bottom: {selectedItems.bottom || 'Not selected'}</Text>
            <Text style={styles.selectedItem}>Shoes: {selectedItems.shoes || 'Not selected'}</Text>
            <Text style={styles.selectedItem}>Accessory: {selectedItems.accessory || 'None'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.designSection}>
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>👕 TOPS</Text>
          <View style={styles.itemGrid}>
            {FASHION_ITEMS.tops.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.itemButton,
                  selectedItems.top === item && styles.selectedButton,
                ]}
                onPress={() => handleSelectItem('top', item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>👖 BOTTOMS</Text>
          <View style={styles.itemGrid}>
            {FASHION_ITEMS.bottoms.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.itemButton,
                  selectedItems.bottom === item && styles.selectedButton,
                ]}
                onPress={() => handleSelectItem('bottom', item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>👟 SHOES</Text>
          <View style={styles.itemGrid}>
            {FASHION_ITEMS.shoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.itemButton,
                  selectedItems.shoes === item && styles.selectedButton,
                ]}
                onPress={() => handleSelectItem('shoes', item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>✨ ACCESSORIES</Text>
          <View style={styles.itemGrid}>
            {FASHION_ITEMS.accessories.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.itemButton,
                  selectedItems.accessory === item && styles.selectedButton,
                ]}
                onPress={() => handleSelectItem('accessory', item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.saveSection}>
        <Text style={styles.label}>Outfit Name:</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveOutfit}
        >
          <Text style={styles.saveButtonText}>💾 Save This Outfit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  previewSection: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FFB6D9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 12,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 10,
    paddingVertical: 20,
  },
  previewText: {
    fontSize: 60,
    marginBottom: 10,
  },
  selectedItems: {
    width: '100%',
    paddingHorizontal: 16,
  },
  selectedItem: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  designSection: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 12,
  },
  itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  itemButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFB6D9',
    width: '48%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF1493',
    borderColor: '#FF1493',
  },
  itemText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  saveSection: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: '#FFB6D9',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
