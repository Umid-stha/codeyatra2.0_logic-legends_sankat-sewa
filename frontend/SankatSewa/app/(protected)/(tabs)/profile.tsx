import Header from '@/components/Header';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import { SafeAreaView } from 'react-native-safe-area-context';
const PlaceholderImage = require('@/assets/images/favicon.png');

export default function Profile(){
  return(
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.container}>
      
        <Image source={PlaceholderImage}></Image>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.address}>Chyasal</Text>

                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statSub}>12</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statLabel}>Incidents</Text>
                    </View>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statCard}>
                    <Text style={styles.statSub}>45h</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statLabel}>Volunteer</Text>
                    </View>
                  </View>
                   <View style={styles.statDivider} />
                  <View style={styles.statCard}>
                    <Text style={styles.statSub}>5</Text>
                    <View style={styles.statValueRow}>
                      <Text style={styles.statLabel}>Badges</Text>
                    </View>
                  </View>
                  </View>
    </ScrollView>
    </SafeAreaView>
  )
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    padding:20,
    backgroundColor:'#f5f5f5'
  },
  name:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:15,
  },
  address:{
    marginTop:5,
    marginBottom:5,
    fontSize:17,
    textAlign:'center',
  },
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
    color: '#a51212',
    marginBottom: 4,
    fontWeight:'bold',
  },
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

})

