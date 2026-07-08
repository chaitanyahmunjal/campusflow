import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, styles as themeStyles } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

interface Participation {
  id: string;
  qrToken: string;
  status: string;
  createdAt: string;
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    coverImageUrl: string | null;
    unit: {
      name: string;
      handle: string;
      logoUrl: string | null;
    };
  };
}

const API_URL = 'http://localhost:3000';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Participation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      fetchBookings();
    }, [])
  );

  async function fetchBookings() {
    try {
      const response = await axios.get(`${API_URL}/participations/my-registrations`);
      setBookings(response.data.data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGISTERED':
        return COLORS.success;
      case 'ATTENDED':
        return COLORS.primary;
      case 'CANCELLED':
        return COLORS.error;
      default:
        return COLORS.textMuted;
    }
  };

  const renderBooking = ({ item }: { item: Participation }) => (
    <TouchableOpacity
      style={[themeStyles.card, expandedBooking === item.event.id && styles.expandedCard]}
      onPress={() => setExpandedBooking(expandedBooking === item.event.id ? null : item.event.id)}
      activeOpacity={0.7}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.event.title}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <Ionicons
          name={expandedBooking === item.event.id ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={COLORS.textMuted}
        />
      </View>

      <View style={styles.eventMeta}>
        <Ionicons name="calendar-outline" size={16} color={COLORS.textMuted} />
        <Text style={styles.metaText}>{new Date(item.event.date).toLocaleDateString()}</Text>
      </View>

      {item.event.location && (
        <View style={styles.eventMeta}>
          <Ionicons name="location-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.metaText}>{item.event.location}</Text>
        </View>
      )}

      {expandedBooking === item.event.id && item.status === 'REGISTERED' && (
        <View style={styles.qrSection}>
          <View style={styles.qrContainer}>
            <QRCode
              value={item.qrToken}
              size={200}
              color={COLORS.text}
              backgroundColor={COLORS.background}
            />
          </View>
          <Text style={styles.qrInstruction}>Show this QR code at the event entrance</Text>
        </View>
      )}

      {expandedBooking === item.event.id && item.status === 'ATTENDED' && (
        <View style={styles.attendedSection}>
          <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
          <Text style={styles.attendedText}>You attended this event</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.event.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="ticket-outline" size={64} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No bookings yet</Text>
            <Text style={styles.emptySubtext}>Register for events to see your tickets here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 16,
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
  emptySubtext: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 8,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
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
  expandedCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  qrSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  qrContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 12,
  },
  qrInstruction: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  attendedSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  attendedText: {
    color: COLORS.success,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});