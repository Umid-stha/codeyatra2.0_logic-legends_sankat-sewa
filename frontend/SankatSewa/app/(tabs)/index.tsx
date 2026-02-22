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
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatusCardProps {
  icon: string;
  title: string;
  time: string;
  badge?: string;
  description: string;
}

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

// ─── Mock Map Placeholder ─────────────────────────────────────────────────────
const MapPlaceholder: React.FC = () => (
  <View style={styles.mapContainer}>
    {[...Array(6)].map((_, i) => (
      <View key={`h${i}`} style={[styles.mapGridH, { top: i * 22 }]} />
    ))}
    {[...Array(8)].map((_, i) => (
      <View key={`v${i}`} style={[styles.mapGridV, { left: i * 48 }]} />
    ))}
    <View style={[styles.mapPin, { top: 30, left: 120, backgroundColor: '#E53935' }]}>
      <Text style={styles.mapPinText}>📍</Text>
    </View>
    <View style={[styles.mapPin, { top: 55, left: 60 }]}>
      <Text style={styles.mapPinText}>📍</Text>
    </View>
    <View style={[styles.mapPin, { top: 20, left: 220 }]}>
      <Text style={styles.mapPinText}>📍</Text>
    </View>
    <View style={styles.mapAlertRing} />
    <View style={styles.mapAlertDot} />
  </View>
);

// ─── Report Button ────────────────────────────────────────────────────────────
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

// ─── Status Update Card ───────────────────────────────────────────────────────
const StatusCard: React.FC<StatusCardProps> = ({ icon, title, time, badge, description }) => (
  <View style={styles.statusCard}>
    <View style={styles.statusIconBox}>
      <Text style={styles.statusIcon}>{icon}</Text>
    </View>
    <View style={styles.statusContent}>
      <View style={styles.statusRow}>
        <Text style={styles.statusTitle}>{title}</Text>
        <Text style={styles.statusTime}>{time}</Text>
      </View>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✓ {badge}</Text>
        </View>
      )}
      <Text style={styles.statusDesc}>{description}</Text>
    </View>
  </View>
);

// ─── Alert Card ───────────────────────────────────────────────────────────────
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
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
              <Text style={styles.volunteerEmoji}>🤝</Text>
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

        {/* ── Emergency Section ── */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyHeading}>Emergency?</Text>
          <ReportButton onPress={handleReportPress} />
          <Text style={styles.tapHint}>Tap to report an incident</Text>
        </View>

        {/* ── Live Status Updates ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>LIVE STATUS UPDATES</Text>
            <Animated.View style={[styles.liveDot, { opacity: dotAnim }]} />
          </View>
          <StatusCard
            icon="🏥"
            title="Medical Emergency #492"
            time="2m ago"
            badge="OFFICIAL DISPATCH"
            description="Ambulance dispatched to sector 14."
          />
          <View style={styles.divider} />
          <StatusCard
            icon="🔥"
            title="Fire Alert Resolved"
            time="8h ago"
            description="Fire controlled at Connaught Place commercial block."
          />
        </View>

        {/* ── Active Alerts Near You ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>ACTIVE ALERTS NEAR YOU</Text>
          <MapPlaceholder />
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

        {/* ── Quick Actions ── */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickIcon}>📞</Text>
            <Text style={styles.quickLabel}>Police & Fire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickIcon}>📖</Text>
            <Text style={styles.quickLabel}>First Aid Guide</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
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
  volunteerEmoji: { fontSize: 22 },
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

  // Status Card
  statusCard: { flexDirection: 'row', gap: 12 },
  statusIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statusIcon: { fontSize: 20 },
  statusContent: { flex: 1 },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', flex: 1 },
  statusTime: { fontSize: 11, color: '#aaa', marginLeft: 8 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 5,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#388E3C' },
  statusDesc: { fontSize: 12, color: '#888', marginTop: 5, lineHeight: 17 },

  // Map
  mapContainer: {
    height: 120,
    backgroundColor: '#E8EAED',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  mapGridH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#D0D3D8',
  },
  mapGridV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#D0D3D8',
  },
  mapPin: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#9E9E9E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinText: { fontSize: 12 },
  mapAlertRing: {
    position: 'absolute',
    top: 18,
    left: 108,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#E5393560',
  },
  mapAlertDot: {
    position: 'absolute',
    top: 31,
    left: 121,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E53935',
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