import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { COLORS, styles as themeStyles } from '../../utils/theme';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: string;
  unit: {
    name: string;
    handle: string;
    logoUrl: string | null;
  };
  _count: {
    attendees: number;
  };
}

const API_URL = 'http://localhost:3000';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await axios.get(`${API_URL}/events/student/eligible`);
      setEvents(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  }

  const renderEvent = ({ item }: { item: Event }) => (
    <Link href={`/(tabs)/events/${item.unit.handle}/${item.id}`} asChild>
      <TouchableOpacity style={styles.eventCard}>
        <View style={styles.eventHeader}>
          <View style={styles.unitInfo}>
            {item.unit.logoUrl ? (
              <View style={styles.unitLogo}>
                <Ionicons name="people" size={20} color={COLORS.primary} />
              </View>
            ) : (
              <View style={styles.unitLogo}>
                <Ionicons name="people" size={20} color={COLORS.primary} />
              </View>
            )}
            <Text style={styles.unitName}>{item.unit.name}</Text>
          </View>
          <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.eventTitle}>{item.title}</Text>
        
        {item.date && (
          <View style={styles.eventMeta}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
        
        {item.location && (
          <View style={styles.eventMeta}>
            <Ionicons name="location-outline" size={16} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
        )}
        
        <View style={styles.eventFooter}>
          <View style={styles.attendees}>
            <Ionicons name="people-outline" size={16} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{item._count.attendees} attending</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No events available</Text>
        </View>
      }
    />
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'PUBLISHED':
      return { backgroundColor: 'rgba(16, 185, 129, 0.1)' };
    case 'APPROVED':
      return { backgroundColor: 'rgba(99, 102, 241, 0.1)' };
    default:
      return { backgroundColor: 'rgba(148, 163, 184, 0.1)' };
  }
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
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
  eventCard: {
    ...themeStyles.card,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  unitName: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '600',
  },
  eventTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});