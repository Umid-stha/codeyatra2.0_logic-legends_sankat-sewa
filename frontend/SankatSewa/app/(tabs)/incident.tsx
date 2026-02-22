import Header from '@/components/Header';
import {StyleSheet, Text, View} from 'react-native';

export default function Incident(){
    return(
        <View style={s.view}>
            <Header />
            <View style={s.topBar}>
                <Text style={s.text}>Sankat Sewa</Text>
                <Text>Volunteer Portal</Text>
            </View>
            <View style={s.container}>
            <Text style={s.text}>Task done</Text>
            </View>
        </View>
    );
}

const s=StyleSheet.create({
    topBar: {
        backgroundColor: 'white',
        height: 70,
        paddingTop: 10,
        paddingLeft: 45,
    },
    container:{
        position:'absolute',
        top: 75,
        left: 20,
        backgroundColor: '#F1F5F9',
        borderWidth:1,
        borderColor:'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        width:190,
        height:90,
        alignItems:'center',
        padding: 20,
    },
    text:{
        fontSize:20,
    },
    view:{
        backgroundColor:'black',
    }
})