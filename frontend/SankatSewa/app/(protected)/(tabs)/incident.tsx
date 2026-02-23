import Header from '@/components/Header';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────
type StatusType = 'enroute' | 'onsite' | 'resolved';

interface NearbyIncident {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  location: string;
  distance: string;
  reportedAgo: string;
}

// ─── Mock Map ─────────────────────────────────────────────────────────────────
const MiniMap: React.FC = () => (
  <View style={styles.miniMap}>
    {[...Array(5)].map((_, i) => (
      <View key={`h${i}`} style={[styles.mapGridH, { top: i * 24 }]} />
    ))}
    {[...Array(7)].map((_, i) => (
      <View key={`v${i}`} style={[styles.mapGridV, { left: i * 44 }]} />
    ))}
    {/* Road lines */}
    <View style={styles.mapRoadH} />
    <View style={styles.mapRoadV} />
    {/* Incident pin */}
    <View style={styles.mapPinWrapper}>
      <View style={styles.mapPinRing} />
      <View style={styles.mapPinDot} />
    </View>
    {/* Location label overlay */}
    <View style={styles.mapLabel}>
      <Text style={styles.mapLabelSub}>Sector 4, MG Road</Text>
      <Text style={styles.mapLabelTitle}>Medical Emergency</Text>
    </View>
  </View>
);

// ─── Status Stepper ───────────────────────────────────────────────────────────
interface StatusStepperProps {
  status: StatusType;
  onStatusChange: (s: StatusType) => void;
}

const StatusStepper: React.FC<StatusStepperProps> = ({ status, onStatusChange }) => {
  const steps: { key: StatusType; label: string; icon: string }[] = [
    { key: 'enroute', label: 'En Route', icon: '🚶' },
    { key: 'onsite', label: 'On-Site', icon: '📍' },
    { key: 'resolved', label: 'Resolved', icon: '✓' },
  ];

  return (
    <View style={styles.stepper}>
      {steps.map((step) => {
        const isActive = status === step.key;
        return (
          <TouchableOpacity
            key={step.key}
            onPress={() => onStatusChange(step.key)}
            style={[styles.stepBtn, isActive && styles.stepBtnActive]}
            activeOpacity={0.75}
          >
            <Text style={[styles.stepIcon, isActive && styles.stepIconActive]}>
              {step.icon}
            </Text>
            <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>
              {step.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── Nearby Incident Card ─────────────────────────────────────────────────────
interface NearbyCardProps {
  incident: NearbyIncident;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

const NearbyCard: React.FC<NearbyCardProps> = ({ incident, onAccept, onDecline }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAccept = (): void => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start(() => onAccept(incident.id));
  };

  return (
    <Animated.View style={[styles.nearbyCard, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.nearbyCardTop}>
        <View style={[styles.nearbyIcon, { backgroundColor: incident.iconBg }]}>
          <Text style={styles.nearbyIconText}>{incident.icon}</Text>
        </View>
        <View style={styles.nearbyInfo}>
          <Text style={styles.nearbyTitle}>{incident.title}</Text>
          <Text style={styles.nearbyLocation}>{incident.location}</Text>
        </View>
        <View style={styles.nearbyMeta}>
          <Text style={styles.nearbyDistance}>{incident.distance}</Text>
          <Text style={styles.nearbyDistanceLabel}>away</Text>
          <Text style={styles.nearbyTime}>{incident.reportedAgo}</Text>
        </View>
      </View>
      <View style={styles.nearbyActions}>
        <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept} activeOpacity={0.8}>
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineBtn}
          onPress={() => onDecline(incident.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const NEARBY_INCIDENTS: NearbyIncident[] = [
  {
    id: '1',
    icon: '🔥',
    iconBg: '#FFF0E6',
    title: 'Fire Reported',
    location: 'Commercial Complex, Block B',
    distance: '1.2 km',
    reportedAgo: 'Reported 4m ago',
  },
  {
    id: '2',
    icon: '💧',
    iconBg: '#E6F0FF',
    title: 'Water Leakage',
    location: 'Residential Area, Lane 7',
    distance: '2.8 km',
    reportedAgo: 'Reported 15m ago',
  },
  {
    id: '3',
    icon: '🚧',
    iconBg: '#F5F0FF',
    title: 'Road Blockage',
    location: 'Old Highway Crossing',
    distance: '4.5 km',
    reportedAgo: 'Reported 22m ago',
  },
];

export default function VolunteerDashboard(): React.JSX.Element {
  const [currentStatus, setCurrentStatus] = useState<StatusType>('enroute');
  const [incidents, setIncidents] = useState<NearbyIncident[]>(NEARBY_INCIDENTS);
  const urgentPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(urgentPulse, { toValue: 0.6, duration: 700, useNativeDriver: true }),
        Animated.timing(urgentPulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [urgentPulse]);

  const handleAccept = (id: string): void => {
    // Handle accept logic
    console.log('Accepted incident:', id);
  };

  const handleDecline = (id: string): void => {
    setIncidents((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <View style={styles.root}>
<Header />

      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TASKS DONE</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statBadge}>+2 this week</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>ACTIVE HOURS</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statNumber}>120h</Text>
              <Text style={styles.statSub}>Total</Text>
            </View>
          </View>
        </View>

        {/* ── Active Incident ── */}
        <View style={styles.activeSection}>
          <View style={styles.activeSectionHeader}>
            <Text style={styles.activeSectionTitle}>ACTIVE INCIDENT</Text>
            <Animated.View style={[styles.urgentBadge, { opacity: urgentPulse }]}>
              <Text style={styles.urgentBadgeText}>URGENT</Text>
            </Animated.View>
          </View>

          <View style={styles.activeCard}>
            {/* Map */}
            <MiniMap />

            {/* Meta row */}
            <View style={styles.activeMetaRow}>
              <View style={styles.activeMetaItem}>
                <Text style={styles.activeMetaIcon}>🕐</Text>
                <Text style={styles.activeMetaText}>Assigned 12m ago</Text>
              </View>
              <View style={styles.activeMetaItem}>
                <Text style={styles.activeMetaIcon}>📡</Text>
                <Text style={styles.activeMetaText}>0.5 km away</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Status label */}
            <Text style={styles.currentStatusLabel}>CURRENT STATUS</Text>

            {/* Stepper */}
            <StatusStepper status={currentStatus} onStatusChange={setCurrentStatus} />

            {/* Update button */}
            <TouchableOpacity style={styles.updateBtn} activeOpacity={0.85}>
              <Text style={styles.updateBtnText}>Update Status →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Nearby Incidents ── */}
        <View style={styles.nearbySection}>
          <Text style={styles.nearbySectionTitle}>
            NEARBY INCIDENTS ({incidents.length})
          </Text>

          {incidents.map((incident) => (
            <NearbyCard
              key={incident.id}
              incident={incident}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          ))}

          {incidents.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>✅</Text>
              <Text style={styles.emptyStateText}>No nearby incidents right now</Text>
            </View>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F7F8FA' },
  scroll: { paddingHorizontal: 16, paddingTop: 14 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statCard: { flex: 1 },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1,
    marginBottom: 6,
  },
  statValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  statNumber: { fontSize: 28, fontWeight: '800', color: '#1A1A2E' },
  statBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E53935',
    marginBottom: 4,
  },
  statSub: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },

  // Active Incident Section
  activeSection: { marginBottom: 24 },
  activeSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activeSectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1.2,
  },
  urgentBadge: {
    backgroundColor: '#E53935',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  urgentBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },

  // Active Card
  activeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#E53935',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#FFE0E0',
  },

  // Mini Map
  miniMap: {
    height: 110,
    backgroundColor: '#E8EAED',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGridH: {
    position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#D4D6DB',
  },
  mapGridV: {
    position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#D4D6DB',
  },
  mapRoadH: {
    position: 'absolute', top: 55, left: 0, right: 0, height: 6,
    backgroundColor: '#C8CAD0',
  },
  mapRoadV: {
    position: 'absolute', left: 130, top: 0, bottom: 0, width: 6,
    backgroundColor: '#C8CAD0',
  },
  mapPinWrapper: {
    position: 'absolute', top: 30, left: 110,
    alignItems: 'center', justifyContent: 'center',
  },
  mapPinRing: {
    position: 'absolute', width: 36, height: 36, borderRadius: 18,
    borderWidth: 2, borderColor: '#E5393570', backgroundColor: '#E5393515',
  },
  mapPinDot: {
    width: 16, height: 16, borderRadius: 8, backgroundColor: '#E53935',
    borderWidth: 2, borderColor: '#fff',
  },
  mapLabel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#00000055',
    paddingHorizontal: 14, paddingVertical: 8,
  },
  mapLabelSub: { fontSize: 10, color: '#ffffffaa', fontWeight: '500' },
  mapLabelTitle: { fontSize: 14, color: '#fff', fontWeight: '800' },

  // Active Meta
  activeMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  activeMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  activeMetaIcon: { fontSize: 14 },
  activeMetaText: { fontSize: 12, color: '#666', fontWeight: '500' },

  divider: { height: 1, backgroundColor: '#F2F2F2', marginVertical: 12, marginHorizontal: 14 },

  // Status Stepper
  currentStatusLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#aaa',
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  stepper: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  stepBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  stepBtnActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#E53935',
  },
  stepIcon: { fontSize: 14 },
  stepIconActive: {},
  stepLabel: { fontSize: 12, fontWeight: '600', color: '#999' },
  stepLabelActive: { color: '#E53935', fontWeight: '700' },

  // Update Button
  updateBtn: {
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#E53935',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  updateBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },

  // Nearby Section
  nearbySection: {},
  nearbySectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  // Nearby Card
  nearbyCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nearbyCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  nearbyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  nearbyIconText: { fontSize: 22 },
  nearbyInfo: { flex: 1 },
  nearbyTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 3 },
  nearbyLocation: { fontSize: 12, color: '#999', lineHeight: 16 },
  nearbyMeta: { alignItems: 'flex-end' },
  nearbyDistance: { fontSize: 14, fontWeight: '800', color: '#E53935' },
  nearbyDistanceLabel: { fontSize: 11, color: '#E53935', fontWeight: '600' },
  nearbyTime: { fontSize: 10, color: '#bbb', marginTop: 4 },

  // Accept / Decline
  nearbyActions: { flexDirection: 'row', gap: 10 },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#E53935',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  acceptBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  declineBtn: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  declineBtnText: { fontSize: 14, fontWeight: '700', color: '#888' },

  // Empty state
  emptyState: { alignItems: 'center', paddingVertical: 32 },
  emptyStateIcon: { fontSize: 36, marginBottom: 10 },
  emptyStateText: { fontSize: 14, color: '#aaa', fontWeight: '500' },
});