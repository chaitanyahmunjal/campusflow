import { useAuth } from '../context/AuthContext';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';

export default function AuthRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  const roleRoutes: Record<string, string> = {
    SUPER_ADMIN: '/superadmin',
    ADMIN: '/admin',
    FACULTY: '/faculty',
    ORGANIZER: '/organizer',
    STUDENT: '/student',
    ALUMNI: '/student',
  };

  const targetRoute = roleRoutes[user.role] || '/student';
  
  return <Redirect href={targetRoute} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});