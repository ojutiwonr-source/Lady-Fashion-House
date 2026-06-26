import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../store/store';

type Props = NativeStackScreenProps<any, 'Wardrobe'>;

export default function WardrobeScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const outfits = useSelector((state: RootState) => state.fashion.outfits);

  const handleDeleteOutfit = (outfitId: string) => {
    Alert.alert(
      'Delete Outfit',
      'Are you sure you want to delete this outfit?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            dispatch({
              type: 'DELETE_OUTFIT',
              payload: outfitId,
            });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👗 My Wardrobe</Text>
        <Text style={styles.subtitle}>Total Outfits: {outfits.length}</Text>
      </View>

      {outfits.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>✨</Text>
          <Text style={styles.emptyStateText}>Your wardrobe is empty!</Text>
          <Text style={styles.emptyStateSubtext}>
            Go to Design to create your first outfit.
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('Design')}
          >
            <Text style={styles.createButtonText}>Create Outfit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.outfitsContainer}>
          {outfits.map((outfit) => (
            <View key={outfit.id} style={styles.outfitCard}>
              <View style={styles.outfitHeader}>
                <Text style={styles.outfitName}>{outfit.name}</Text>
                <Text style={styles.outfitStyle}>{outfit.style}</Text>
              </View>

              <View style={styles.outfitItems}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>👕 Top:</Text>
                  <Text style={styles.itemValue}>{outfit.top}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>👖 Bottom:</Text>
                  <Text style={styles.itemValue}>{outfit.bottom}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>👟 Shoes:</Text>
                  <Text style={styles.itemValue}>{outfit.shoes}</Text>
                </View>
                {outfit.accessory && outfit.accessory !== 'None' && (
                  <View style={styles.itemRow}>
                    <Text style={styles.itemLabel}>✨ Accessory:</Text>
                    <Text style={styles.itemValue}>{outfit.accessory}</Text>
                  </View>
                )}
              </View>

              <View style={styles.outfitFooter}>
                <Text style={styles.createdDate}>
                  Created: {new Date(outfit.createdAt).toLocaleDateString()}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteOutfit(outfit.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#FFB6D9',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  createButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outfitsContainer: {
    padding: 16,
  },
  outfitCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFB6D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  outfitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE4F0',
  },
  outfitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1493',
    flex: 1,
  },
  outfitStyle: {
    backgroundColor: '#FFB6D9',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  outfitItems: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 100,
  },
  itemValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    backgroundColor: '#FFF0F5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  outfitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#FFE4F0',
  },
  createdDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FFE4F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FF1493',
    fontSize: 12,
    fontWeight: '600',
  },
});
