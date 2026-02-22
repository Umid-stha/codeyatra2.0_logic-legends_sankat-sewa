import { Pressable, View, Text, StyleSheet} from "react-native";

type Prop = {
    label: string;
}

export default function SecondaryButton({label}: Prop) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('You Pressed a button')}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        backgroundColor:'#ffffff',
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#cc2424',
    },
    buttonLabel: {
        color: '#cc2424',
        fontSize: 16,
    },
})