import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { COLORS, styles as themeStyles } from '../../utils/theme';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Unit {
  id: string;
  name: string;
  handle: string;
  type: string;
  tagline: string | null;
  description: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  _count: {
    events: number;
  };
}

const API_URL = 'http://localhost:3000';

export default function ClubsScreen() {
  const [clubs, setClubs] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    try {
      const response = await axios.get(`${API_URL}/units`);
      setClubs(response.data.data);
    } catch (error) {
      console.error('Failed to load clubs:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const renderClub = ({ item }: { item: Unit }) => (
    <Link href={`/(tabs)/clubs/${item.handle}`} asChild>
      <TouchableOpacity style={styles.clubCard}>
        <View style={styles.clubHeader}>
          <View style={styles.clubLogo}>
            {item.logoUrl ? (
              <Text style={styles.logoText}>{item.name.charAt(0)}</Text>
            ) : (
              <Ionicons name="people" size={24} color={COLORS.primary} />
            )}
          </View>
          <View style={styles.clubInfo}>
            <Text style={styles.clubName}>{item.name}</Text>
            {item.tagline && (
              <Text style={styles.clubTagline} numberOfLines={1}>
                {item.tagline}
              </Text>
            )}
          </View>
        </View>
        
        {item.description && (
          <Text style={styles.clubDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        
        <View style={styles.clubFooter}>
          <View style={styles.clubType}>
            <Ionicons name="shield-outline" size={16} color={COLORS.textMuted} />
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
          <View style={styles.eventsCount}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textMuted} />
            <Text style={styles.typeText}>{item._count.events} events</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={clubs}
      renderItem={renderClub}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No clubs yet</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginTop: 16,
  },
  clubCard: {
    ...themeStyles.card,
    marginBottom: 12,
  },
  clubHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  clubLogo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  clubTagline: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  clubDescription: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  clubFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  clubType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginLeft: 6,
  },
});