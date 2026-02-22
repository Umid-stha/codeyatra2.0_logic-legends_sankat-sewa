import {View, Text, StyleSheet, Platform} from 'react-native'

export default function Header() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>🛡</Text>
          </View>
          <View>
            <Text style={styles.appName}>SANKAT SEWA</Text>
            <Text style={styles.location}>📍 Downtown, New Delhi</Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 16 : 52,
    paddingBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 20 },
  appName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: 1,
  },
  location: { fontSize: 11, color: '#888', marginTop: 1 },
  bellBtn: { padding: 6 },
  bellIcon: { fontSize: 20 },

})
