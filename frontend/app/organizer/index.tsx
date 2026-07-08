import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS, styles as themeStyles } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function OrganizerDashboard() {
  const [stats] = useState({
    totalEvents: 12,
    upcomingEvents: 3,
    totalRegistrations: 456,
    avgAttendance: 78,
  });

  const quickActions = [
    { icon: 'add-circle', label: 'Create Event', href: '/organizer/create-event' as const },
    { icon: 'calendar', label: 'My Events', href: '/organizer/my-events' as const },
    { icon: 'people', label: 'My Unit', href: '/organizer/my-unit' as const },
    { icon: 'stats-chart', label: 'Analytics', href: '/organizer/analytics' as const },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Organizer Dashboard</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[themeStyles.card, styles.statCard]}>
          <Ionicons name="calendar" size={28} color={COLORS.primary} />
          <Text style={styles.statValue}>{stats.totalEvents}</Text>
          <Text style={styles.statLabel}>Total Events</Text>
        </View>

        <View style={[themeStyles.card, styles.statCard]}>
          <Ionicons name="today" size={28} color={COLORS.success} />
          <Text style={styles.statValue}>{stats.upcomingEvents}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>

        <View style={[themeStyles.card, styles.statCard]}>
          <Ionicons name="people" size={28} color={COLORS.warning} />
          <Text style={styles.statValue}>{stats.totalRegistrations}</Text>
          <Text style={styles.statLabel}>Registrations</Text>
        </View>

        <View style={[themeStyles.card, styles.statCard]}>
          <Ionicons name="trending-up" size={28} color={COLORS.error} />
          <Text style={styles.statValue}>{stats.avgAttendance}%</Text>
          <Text style={styles.statLabel}>Avg Attendance</Text>
        </View>
      </View>

      <View style={themeStyles.card}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsList}>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href} asChild>
              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon as any} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  statCard: {
    width: '48%',
    margin: '1%',
    alignItems: 'center',
    padding: 20,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsList: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionLabel: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
});