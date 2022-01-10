import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

// Quellen: https://icons8.com/icon/set/error/ios / https://icons8.com/icon/set/workspace/ios

const MehrScreen = props => {
    return (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("DatenspendeScreen")
            }} >
                <View style={styles.card}>
                    <Image style={styles.microIcon} source={require("../icons/more/datenspende.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Datenspende</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("ImpressumScreen");
            }} >
                <View style={styles.card}>
                    <Image style={styles.microIcon} source={require("../icons/more/icons8-workspace-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Impressum</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate("FehlerMeldenScreen");
            }} >
                <View style={styles.card}>
                    <Image style={styles.microIcon} source={require("../icons/more/icons8-error-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Fehler melden</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

MehrScreen.navigationOptions = navData => {
    return {
        headerTitle: "Mehr"
    }

}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    card: {
        backgroundColor: "white",
        width: "100%",
        padding: 15,
        borderRadius: 100,
        marginTop: 15,
        flexDirection: "row"
    },
    text: {
        fontSize: 20,
        fontFamily: "Manrope_300Light",
        marginLeft: 20
    },
    microIcon: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
});

export default MehrScreen;