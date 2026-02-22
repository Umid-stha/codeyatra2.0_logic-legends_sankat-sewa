import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import OtherIncidentModal from '@/components/OtherIncidentsModal';

//  Types of incidents user is able to report
type IncidentId = 'accident' | 'fire' | 'flood' | 'landslide' | 'medical' | 'other';

interface IncidentType {
  id: IncidentId;
  label: string;
  icon: string;
}

interface TabItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
}

interface EmergencyReportScreenProps {
  navigation?: {
    goBack: () => void;
  };
}

//Constants 

const RED = '#D32F2F';
const LIGHT_RED_BG = '#FFF5F5';
const BORDER = '#E8E8E8';

const INCIDENT_TYPES: IncidentType[] = [
  { id: 'accident',  label: 'Accident',         icon: 'car-crash'    },
  { id: 'fire',      label: 'Fire',              icon: 'fire'         },
  { id: 'flood',     label: 'Flood',             icon: 'home-flood'   },
  { id: 'landslide', label: 'Landslide',         icon: 'landslide'    },
  { id: 'medical',   label: 'Medical Emergency', icon: 'hospital-box' },
  {id: 'other', label:'Other', icon: 'alert-circle-outline' }  ,
];

// Rows layout of incidents: [Accident, Fire], [Flood, Landslide], [Medical Emergency, Others]
const INCIDENT_ROWS: IncidentType[][] = [
  INCIDENT_TYPES.slice(0, 2),
  INCIDENT_TYPES.slice(2, 4),
  INCIDENT_TYPES.slice(4, 6),
];

//Sub-components 

interface SectionLabelProps {
  text: string;
  inline?: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ text, inline = false }) => (
  <View style={inline ? undefined : styles.sectionLabelWrapper}>
    <View style={styles.sectionLabelRow}>
      <View style={styles.sectionDot} />
      <Text style={styles.sectionLabelText}>{text}</Text>
    </View>
  </View>
);

//  Map Placeholder 

const MapPlaceholder: React.FC = () => (
  <View style={styles.mapContainer}>
    {/* Horizontal grid lines */}
    {[0, 1, 2, 3].map(i => (
      <View
        key={`h${i}`}
        style={[styles.mapGridLine, { top: `${25 * i}%` as any, width: '100%', height: 1 }]}
      />
    ))}
    {/* Vertical grid lines */}
    {[0, 1, 2, 3].map(i => (
      <View
        key={`v${i}`}
        style={[styles.mapGridLine, { left: `${25 * i}%` as any, height: '100%', width: 1 }]}
      />
    ))}
    {/* Location Pin */}
    <View style={styles.mapPinWrapper}>
      <View style={styles.mapPinCircle}>
        <Ionicons name="location" size={20} color={RED} />
      </View>
      <View style={styles.mapPinShadow} />
    </View>
  </View>
);

//  Main Screen 

const EmergencyReportScreen: React.FC<EmergencyReportScreenProps> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<IncidentId>('fire');
  const [otherModalVisible, setOtherModalVisible] = useState<boolean>(false);
  const [incidentType, setIncidentType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);

  useEffect(() => {
    if (selectedType === 'other') {
        // If 'Other' is selected, we generate a modal for user to input the type of incident
        setOtherModalVisible(true);
    } else {
        setIncidentType(selectedType);
    }
    alert(`Selected incident type: ${incidentType}`);
    }, [selectedType]);


  const detectedLocation =
    'Detected: Ward 4, Baluwatar, Kathmandu\nMetropolitan City';

  const handleSubmit = (): void => {
    if (!selectedType) {
      Alert.alert('Select Incident Type', 'Please select what is happening.');
      return;
    }
    Alert.alert(
      '🚨 Report Submitted',
      'Authorities and nearby volunteers have been alerted. Stay safe!',
      [{ text: 'OK' }],
    );
  };

  return (
    <>
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/*  Top Bar  */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>EMERGENCY REPORT</Text>
      </View>

      {/* GPS Badge  */}
      <View style={styles.gpsBadgeRow}>
        <View style={styles.gpsBadge}>
          <View style={styles.gpsDot} />
          <Text style={styles.gpsLabel}>GPS ACTIVE</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/*  Users need to select option of issue to categorize it */}
        <SectionLabel text="What is happening?" />

        {INCIDENT_ROWS.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.incidentRow}>
            {row.map(item => {
              const isSelected = selectedType === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.incidentCard,
                    isSelected && styles.incidentCardSelected,
                    row.length === 1 && styles.incidentCardSingle,
                  ]}
                  onPress={() => setSelectedType(item.id)}
                  activeOpacity={0.75}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={34}
                    color={RED}
                  />
                  <Text style={[styles.incidentLabel, isSelected && styles.incidentLabelSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        {/*Incident reported is displayed in MAP*/}
        <View style={styles.sectionHeaderRow}>
          <SectionLabel text="Where is it?" inline />
          <TouchableOpacity>
            <Text style={styles.refineText}>⦿ Refine</Text>
          </TouchableOpacity>
        </View>

        <MapPlaceholder />

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#888" />
          <Text style={styles.locationText}>{detectedLocation}</Text>
        </View>

        {/*Users will provide Imagge of incident so others can know about status */}
        <SectionLabel text="Provide Details" />

        <View style={styles.mediaRow}>
          {/* Add Photo */}
          <TouchableOpacity
            style={[
              styles.mediaCard,
              styles.mediaCardDashed,
              hasPhoto && styles.mediaCardActive,
            ]}
            onPress={() => setHasPhoto(prev => !prev)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={hasPhoto ? 'checkmark-circle' : 'camera-outline'}
              size={28}
              color={hasPhoto ? '#2E7D32' : RED}
            />
            <Text style={[styles.mediaLabel, hasPhoto && styles.mediaLabelActive]}>
              {hasPhoto ? 'PHOTO ADDED' : 'ADD PHOTO'}
            </Text>
          </TouchableOpacity>

        </View>

        {/* Description */}
        <TextInput
          style={styles.textArea}
          placeholder="Describe the situation... (optional)" /*users will add description about condition of incident  */
          placeholderTextColor="#AAAAAA"
          multiline
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />

        {/* Submit Button  */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitBtnTitle}>SUBMIT REPORT</Text>
          <Text style={styles.submitBtnSub}>ALERT AUTHORITIES IMMEDIATELY</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
    <OtherIncidentModal
  visible={otherModalVisible}
  onConfirm={(text) => {
    setIncidentType(text);
    setOtherModalVisible(false);
  }}
  onCancel={() => {
    setSelectedType('fire');       // reset selection if cancelled
    setOtherModalVisible(false);
  }}
/>
</>
  );
};

export default EmergencyReportScreen;

// Styles of the page 

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  topBarTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#1A1A1A',
  },

  // GPS Badge
  gpsBadgeRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  gpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  gpsDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2E7D32',
  },
  gpsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
    letterSpacing: 0.6,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4 },

  // Section Labels
  sectionLabelWrapper: { marginTop: 14, marginBottom: 10 },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 10,
  },
  sectionLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RED,
  },
  sectionLabelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  refineText: {
    fontSize: 12,
    color: RED,
    fontWeight: '600',
  },

  // Incident cards
  incidentRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  incidentCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  incidentCardSelected: {
    borderColor: RED,
    backgroundColor: LIGHT_RED_BG,
  },
  incidentCardSingle: {
    maxWidth: '48%',
    alignSelf: 'flex-start',
  },
  incidentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
  incidentLabelSelected: {
    color: RED,
  },

  // Map
  mapContainer: {
    height: 140,
    backgroundColor: '#E9EEF5',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapGridLine: {
    position: 'absolute',
    backgroundColor: '#D0D8E4',
  },
  mapPinWrapper: {
    alignItems: 'center',
    zIndex: 10,
  },
  mapPinCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  mapPinShadow: {
    width: 12,
    height: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginTop: 2,
  },

  // Location text
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginTop: 6,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
    flex: 1,
  },

  // Media cards
  mediaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  mediaCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FAFAFA',
  },
  mediaCardDashed: {
    borderStyle: 'dashed',
    borderColor: RED,
    backgroundColor: LIGHT_RED_BG,
  },
  mediaCardActive: {
    borderColor: '#2E7D32',
    backgroundColor: '#F1F8F1',
  },
  mediaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 0.5,
  },
  mediaLabelActive: {
    color: '#2E7D32',
  },

  // Text area
  textArea: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#333',
    minHeight: 72,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },

  // Submit button
  submitBtn: {
    backgroundColor: RED,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: RED,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  submitBtnSub: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.8,
    marginTop: 2,
  },
});