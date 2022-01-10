import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Switch, Image } from "react-native";
import * as SecureStore from 'expo-secure-store';

// Quellen: https://icons8.com/icon/set/error/ios / https://icons8.com/icon/set/workspace/ios

const DatenspendeScreen = () => {

    const [isEnabled, setIsEnabled] = useState("false");
    const [isEnabledBoolean, setIsEnabledBoolean] = useState(false);

    useEffect(() => {
        async function setDatenspende() {
            let result = await SecureStore.getItemAsync("datenspende");
            if (result != null) {
                setIsEnabled(result);
                if (result == "false") {
                    setIsEnabledBoolean(false);
                } else {
                    setIsEnabledBoolean(true);
                }
            } else {
               setIsEnabled("false");
               setIsEnabledBoolean(false);
            }
        }
        setDatenspende()
    }, []);

    const toggleSwitch = async () => {
        if (isEnabled == "false") {
            setIsEnabled("true");
            setIsEnabledBoolean(true);
            await SecureStore.setItemAsync("datenspende", "true");
        } else {
            setIsEnabled("false");
            setIsEnabledBoolean(false);
            await SecureStore.setItemAsync("datenspende", "false");
        }
    }

    return (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <Image style={styles.img} source={require("../icons/more/datenspende.png")} />
            <Text allowFontScaling={false} style={styles.title}>Datenspende</Text>
            <Text allowFontScaling={false} style={styles.description}>Damit die Bestimmung einer Vogelart noch besser funktioniert, kannst Du gerne Deine Bestimmungen teilen.</Text>
            <Text allowFontScaling={false} style={styles.warningText}>Achtung! Durch das Aktivieren dieser Funktion werden Deine Schnappschüsse auf einem Server gespeichert. Die Bilddaten gelangen nicht an Dritte.</Text>
            <View style={styles.toggleView}>
                <Switch
                    trackColor={{ false: "#cccccc", true: "#4361EE" }}
                    thumbColor={isEnabled ? "white" : "#white"}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isEnabledBoolean}
                />
                <Text allowFontScaling={false} style={styles.toggleText}>Datenspende erlauben</Text>
            </View>

        </ScrollView>
    )
}

DatenspendeScreen.navigationOptions = navData => {
    return {
        headerTitle: "Datenspende"
    }

}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    title: {
        fontSize: 42,
        fontFamily: "Manrope_800ExtraBold",
        marginTop: 40
    },
    description: {
        fontSize: 20,
        marginTop: 40,
        fontFamily: "Manrope_400Regular",
        textAlign: "justify",
    },
    warningText: {
        marginTop: 20,
        fontSize: 20,
        color: "#4361EE",
        fontFamily: "Manrope_400Regular",
        textAlign: "justify",
    },
    toggleView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40
    },
    toggleText: {
        marginLeft: 20,
        fontFamily: "Manrope_400Regular",
        fontSize: 22
    },
    img: {
        width: 100,
        height: 100,
        marginTop: 40
    }
});

export default DatenspendeScreen;