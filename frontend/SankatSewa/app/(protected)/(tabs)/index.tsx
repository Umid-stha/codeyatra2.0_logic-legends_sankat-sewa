import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  StatusBar,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

const TrustHandImage = require('@/assets/images/Trust-Icon.png');

interface AlertCardProps {
  icon: string;
  color: string;
  title: string;
  distance: string;
  location: string;
  urgent?: boolean;
}

interface ReportButtonProps {
  onPress: () => void;
}

//  Report Button
const ReportButton: React.FC<ReportButtonProps> = ({ onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.reportButtonWrapper}>
      <Animated.View style={[styles.pulseRing, styles.pulseRing1, { transform: [{ scale: pulseAnim }] }]} />
      <Animated.View style={[styles.pulseRing, styles.pulseRing2]} />
      <View style={styles.progressBorder}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.reportButton}>
          <Text style={styles.reportButtonIcon}>✱</Text>
          <Text style={styles.reportButtonLabel}>REPORT</Text>
          <Text style={styles.reportButtonSub}>INCIDENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Redirect to caller app
const handleCall = async (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("Error", "Calling is not supported on this device");
  }
};

// Alert Card 
const AlertCard: React.FC<AlertCardProps> = ({
  icon,
  color,
  title,
  distance,
  location,
  urgent = false,
}) => (
  <View style={styles.alertCard}>
    <View style={[styles.alertIconBox, { backgroundColor: `${color}18` }]}>
      <Text style={styles.alertIconText}>{icon}</Text>
    </View>
    <View style={styles.alertContent}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertLocation}>{distance} · {location}</Text>
    </View>
    <TouchableOpacity style={[styles.viewBtn, urgent && styles.viewBtnUrgent]}>
      <Text style={[styles.viewBtnText, urgent && styles.viewBtnTextUrgent]}>VIEW</Text>
    </TouchableOpacity>
  </View>
);

// Main Screen
export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const [volunteerMode, setVolunteerMode] = useState<boolean>(true);
  const dotAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, { toValue: 0.2, duration: 600, useNativeDriver: true }),
        Animated.timing(dotAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, [dotAnim]);

  const handleReportPress = (): void => {
    router.push('/report');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Volunteer Mode Banner ── */}
        <View style={styles.volunteerBanner}>
          <View style={styles.volunteerLeft}>
            <View style={styles.volunteerAvatarBox}>
              <Image source={TrustHandImage} style={{width: 20, height: 20}} />
            </View>
            <View>
              <Text style={styles.volunteerTitle}>Volunteer Mode</Text>
              <Text style={styles.volunteerSub}>Available for nearby response</Text>
            </View>
          </View>
          <Switch
            value={volunteerMode}
            onValueChange={(value: boolean) => setVolunteerMode(value)}
            trackColor={{ false: '#ddd', true: '#E53935' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyHeading}>Emergency?</Text>
          <ReportButton onPress={handleReportPress} />
          <Text style={styles.tapHint}>Tap to report an incident</Text>
        </View>


        {/* Active Alerts Near You */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>ACTIVE ALERTS NEAR YOU</Text>
          <AlertCard
            icon="⚠️"
            color="#E53935"
            title="Road Accident"
            distance="450m"
            location="Ring Road North"
            urgent
          />
          <View style={styles.divider} />
          <AlertCard
            icon="🌊"
            color="#F57C00"
            title="Flood Warning"
            distance="1.2km"
            location="Low-lying Area"
          />
        </View>

        {/*Quick Actions*/}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => handleCall('100')}>
            <Text style={styles.quickIcon}>📞</Text>
            <Text style={styles.quickLabel}>Police & Fire</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  // Volunteer Banner
  volunteerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  volunteerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  volunteerAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  volunteerSub: { fontSize: 11, color: '#999', marginTop: 2 },

  // Emergency Section
  emergencySection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  emergencyHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 24,
    letterSpacing: 0.5,
  },

  // Report Button
  reportButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#E5393530',
  },
  pulseRing1: {
    width: 190,
    height: 190,
    borderRadius: 95,
  },
  pulseRing2: {
    width: 215,
    height: 215,
    borderRadius: 107,
    borderColor: '#E5393518',
  },
  progressBorder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  reportButton: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: '#C62828',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E53935',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  reportButtonIcon: { fontSize: 32, color: '#fff', marginBottom: 4 },
  reportButtonLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.5,
  },
  reportButtonSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFCDD2',
    letterSpacing: 1,
  },
  tapHint: { fontSize: 12, color: '#aaa', marginTop: 18 },

  // Section
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1.2,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 12,
  },

  // Alert Card
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  alertIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  alertIconText: { fontSize: 20 },
  alertContent: { flex: 1 },
  alertTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  alertLocation: { fontSize: 11, color: '#aaa', marginTop: 2 },
  viewBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#DDD',
  },
  viewBtnUrgent: { backgroundColor: '#E53935', borderColor: '#E53935' },
  viewBtnText: { fontSize: 12, fontWeight: '700', color: '#888' },
  viewBtnTextUrgent: { color: '#fff' },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickIcon: { fontSize: 22 },
  quickLabel: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', flex: 1 },
});