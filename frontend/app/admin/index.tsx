import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { COLORS, styles as themeStyles } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function AdminDashboard() {
  const [stats] = useState({
    totalUnits: 24,
    pendingEvents: 8,
    totalBudget: 500000,
    allocatedBudget: 320000,
  });

  const managementSections = [
    { icon: 'people', label: 'Manage Units', href: '/admin/units' as const, count: stats.totalUnits },
    { icon: 'document-text', label: 'Event Approvals', href: '/admin/events' as const, count: stats.pendingEvents },
    { icon: 'wallet', label: 'Budget Allocation', href: '/admin/budget' as const },
    { icon: 'people-circle', label: 'Members', href: '/admin/members' as const },
    { icon: 'school', label: 'College Settings', href: '/admin/settings' as const },
    { icon: 'bar-chart', label: 'Analytics', href: '/admin/analytics' as const },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
      </View>

      <View style={[themeStyles.card, styles.budgetCard]}>
        <View style={styles.budgetRow}>
          <View>
            <Text style={styles.budgetLabel}>Total Budget</Text>
            <Text style={styles.budgetValue}>₹{stats.totalBudget.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.budgetLabel}>Allocated</Text>
            <Text style={[styles.budgetValue, { color: COLORS.success }]}>
              ₹{stats.allocatedBudget.toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.budgetProgress}>
          <View
            style={[
              styles.progressBar,
              { width: `${(stats.allocatedBudget / stats.totalBudget) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={themeStyles.card}>
        <Text style={styles.sectionTitle}>Management</Text>
        {managementSections.map((section, index) => (
          <Link key={index} href={section.href} asChild>
            <TouchableOpacity
              style={[
                styles.managementItem,
                index < managementSections.length - 1 && styles.managementItemBorder,
              ]}
            >
              <View style={styles.managementLeft}>
                <View style={styles.managementIcon}>
                  <Ionicons name={section.icon as any} size={22} color={COLORS.primary} />
                </View>
                <Text style={styles.managementLabel}>{section.label}</Text>
              </View>
              <View style={styles.managementRight}>
                {section.count !== undefined && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{section.count}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
              </View>
            </TouchableOpacity>
          </Link>
        ))}
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
  budgetCard: {
    margin: 16,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  budgetLabel: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 8,
  },
  budgetValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  budgetProgress: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  managementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  managementItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  managementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  managementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  managementLabel: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
  managementRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
});