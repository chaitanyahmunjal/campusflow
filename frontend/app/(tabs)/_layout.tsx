import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0b0e14',
        },
        headerTintColor: '#ffffff',
        contentStyle: {
          backgroundColor: '#0b0e14',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="events/index" options={{ title: 'Events' }} />
      <Stack.Screen name="clubs/index" options={{ title: 'Clubs' }} />
      <Stack.Screen name="bookings/index" options={{ title: 'My Bookings' }} />
      <Stack.Screen name="profile/index" options={{ title: 'Profile' }} />
    </Stack>
  );
}