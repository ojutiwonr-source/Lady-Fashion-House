import React, { useState } from 'react';
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

type Props = NativeStackScreenProps<any, 'Runway'>;

const THEMES = ['Casual', 'Formal', 'Sporty', 'Bohemian', 'Vintage'];

export default function RunwayScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const outfits = useSelector((state: RootState) => state.fashion.outfits);
  const shows = useSelector((state: RootState) => state.runway.shows);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedOutfitId, setSelectedOutfitId] = useState<string | null>(null);

  const handleShowOutfit = (outfitId: string) => {
    if (!selectedTheme) {
      Alert.alert('Error', 'Please select a theme first');
      return;
    }

    const outfit = outfits.find(o => o.id === outfitId);
    if (!outfit) return;

    const scoreBonus = Math.random() * 50 + 50;
    const show = {
      id: Date.now().toString(),
      outfit,
      theme: selectedTheme,
      audience: Math.floor(Math.random() * 500) + 100,
      score: Math.floor(scoreBonus),
      feedback: getRandomFeedback(),
      createdAt: new Date(),
    };

    dispatch({
      type: 'END_SHOW',
      payload: show,
    });

    Alert.alert('Show Complete!', `Score: ${show.score}\nAudience: ${show.audience}\nFeedback: ${show.feedback}`);
    setSelectedTheme(null);
    setSelectedOutfitId(null);
  };

  const getRandomFeedback = () => {
    const feedbacks = [
      'Stunning design!',
      'Absolutely fabulous!',
      'Love the creativity!',
      'Impressive collection!',
      'Fresh and stylish!',
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Select Runway Theme</Text>
        <View style={styles.themeGrid}>
          {THEMES.map((theme) => (
            <TouchableOpacity
              key={theme}
              style={[
                styles.themeButton,
                selectedTheme === theme && styles.selectedTheme,
              ]}
              onPress={() => setSelectedTheme(theme)}
            >
              <Text style={styles.themeText}>{theme}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👗 Select Outfit to Display</Text>
        {outfits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No outfits yet!</Text>
            <Text style={styles.emptyStateSubtext}>Go to Design to create some outfits first.</Text>
          </View>
        ) : (
          <View>
            {outfits.map((outfit) => (
              <TouchableOpacity
                key={outfit.id}
                style={[
                  styles.outfitCard,
                  selectedOutfitId === outfit.id && styles.selectedOutfit,
                ]}
                onPress={() => setSelectedOutfitId(outfit.id)}
              >
                <View style={styles.outfitInfo}>
                  <Text style={styles.outfitName}>{outfit.name}</Text>
                  <Text style={styles.outfitDetails}>
                    {outfit.top} • {outfit.bottom} • {outfit.shoes}
                  </Text>
                </View>
                <Text style={styles.selectCheckmark}>
                  {selectedOutfitId === outfit.id ? '✓' : '○'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {selectedOutfitId && selectedTheme && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.showButton}
            onPress={() => handleShowOutfit(selectedOutfitId)}
          >
            <Text style={styles.showButtonText}>🎉 Start Runway Show</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Show History ({shows.length})</Text>
        {shows.length === 0 ? (
          <Text style={styles.emptyStateText}>No shows yet. Create one above!</Text>
        ) : (
          <View>
            {shows.slice(-5).reverse().map((show) => (
              <View key={show.id} style={styles.showHistoryCard}>
                <View style={styles.showHistoryContent}>
                  <Text style={styles.showHistoryTitle}>{show.outfit.name}</Text>
                  <Text style={styles.showHistoryDetail}>Theme: {show.theme}</Text>
                  <Text style={styles.showHistoryDetail}>Audience: {show.audience}</Text>
                  <Text style={styles.showHistoryFeedback}>"{show.feedback}"</Text>
                </View>
                <Text style={styles.showScore}>{show.score}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  section: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#FFB6D9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 12,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  themeButton: {
    backgroundColor: '#FFF0F5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFB6D9',
    width: '48%',
    alignItems: 'center',
  },
  selectedTheme: {
    backgroundColor: '#FF1493',
    borderColor: '#FF1493',
  },
  themeText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#BBB',
  },
  outfitCard: {
    backgroundColor: '#FFF0F5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFB6D9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOutfit: {
    backgroundColor: '#FFE4F0',
    borderColor: '#FF1493',
  },
  outfitInfo: {
    flex: 1,
  },
  outfitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 4,
  },
  outfitDetails: {
    fontSize: 12,
    color: '#666',
  },
  selectCheckmark: {
    fontSize: 24,
    color: '#FF1493',
    marginLeft: 10,
  },
  showButton: {
    backgroundColor: '#FF1493',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  showButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  showHistoryCard: {
    backgroundColor: '#FFF0F5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FF1493',
  },
  showHistoryContent: {
    flex: 1,
  },
  showHistoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 4,
  },
  showHistoryDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  showHistoryFeedback: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999',
    marginTop: 4,
  },
  showScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF1493',
    marginLeft: 12,
  },
});
