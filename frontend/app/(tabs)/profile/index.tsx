import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS, styles as themeStyles } from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const profileSections = [
    {
      title: 'Account Information',
      items: [
        { icon: 'mail', label: 'Email', value: user?.email },
        { icon: 'person', label: 'Full Name', value: user?.fullName },
        { icon: 'shield', label: 'Role', value: user?.role?.replace('_', ' ') },
      ],
    },
  ];

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.fullName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.role}>{user.role?.replace('_', ' ')}</Text>
      </View>

      {profileSections.map((section, index) => (
        <View key={index} style={[themeStyles.card, styles.section]}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <View
              key={itemIndex}
              style={[
                styles.infoRow,
                itemIndex < section.items.length - 1 && styles.infoRowBorder,
              ]}
            >
              <View style={styles.infoLeft}>
                <Ionicons name={item.icon as any} size={20} color={COLORS.textMuted} />
                <Text style={styles.infoLabel}>{item.label}</Text>
              </View>
              <Text style={styles.infoValue} numberOfLines={1}>
                {item.value || 'N/A'}
              </Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={[themeStyles.card, styles.logoutButton]} onPress={logout}>
        <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
        <Text style={[styles.logoutText, { color: COLORS.error }]}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>CampusFlow v1.0.0</Text>
    </ScrollView>
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
  header: {
    padding: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  role: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginLeft: 12,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  version: {
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
  },
});