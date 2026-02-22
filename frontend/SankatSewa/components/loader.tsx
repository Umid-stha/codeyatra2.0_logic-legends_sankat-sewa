import {StyleSheet, ActivityIndicator, View} from 'react-native';

export default function Loader(){
    return(
        <View>
            <ActivityIndicator size="large" color="white"/>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})
