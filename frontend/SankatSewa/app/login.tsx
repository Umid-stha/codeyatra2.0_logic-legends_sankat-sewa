import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

export default function Login(){
    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput style={styles.input}/>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} secureTextEntry/>
                <Button title="Login" onPress={() => {}} />
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:20,
        backgroundColor:'#f5f5f5',
    },
    form:{
        backgroundColor: 'white',
        padding:20,
        borderRadius:10,
        shadowColor:'black',
    },
    label:{
        fontSize:16,
        marginBottom:5,
        fontWeight:'bold',
    },
    input:{
        height:40,
        borderColor:'#ddd',
        borderWidth:1,
        padding:10,
        marginBottom:15,
        borderRadius:5,
    }
})