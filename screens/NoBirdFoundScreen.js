import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as historyActions from "../store/HistoryActions"
import * as FileSystem from "expo-file-system"
import { useDispatch } from "react-redux";
import { insertHistory } from "../database/database";

const NoBirdFoundScreen = props => {
    const dispatch = useDispatch();

    const saveImageToDatabase = async (image_uri, data) => {
        const fileName = image_uri.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;
        await FileSystem.moveAsync({
            from: image_uri,
            to: newPath
        });
        const date = new Date().toLocaleDateString("de-DE") + " " + new Date().toLocaleTimeString("de-DE", {
            hour12: false,
            hour: "numeric",
            minute: "numeric"
        });
        const res = await insertHistory(data["top1"], data["top2"], data["top3"], data["top4"], data["top5"], data["prob1"], data["prob2"], data["prob3"], data["prob4"], data["prob5"], newPath, date);
        dispatch(historyActions.getHistory());
        return newPath
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.view}>
                <Text allowFontScaling={false} style={{ ...styles.text1, ...{ marginTop: "25%" } }}>Es wurde kein</Text>
                <Text allowFontScaling={false} style={styles.text1}>Vogel gefunden.</Text>
                <Text allowFontScaling={false} style={styles.text2}>Versuche den Vogel aus einer besseren Perspektive zu fotografieren.</Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("TippsScreen");
                }} >
                    <View style={{ ...styles.button, ... { backgroundColor: 'rgba(247, 37, 133, 0.6)' } }} >
                        <Text allowFontScaling={false} style={styles.buttonText}>Tipps für BirdId</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                    newPath = await saveImageToDatabase(props.navigation.getParam("uri"), props.navigation.getParam("data"));
                    props.navigation.replace("PredictionsScreen", {
                        data: props.navigation.getParam("data"),
                        uri: newPath,
                    });
                }} >
                    <View style={{ ...styles.button, ... { backgroundColor: "rgba(58, 12, 163, 0.6)" } }}>
                        <Text allowFontScaling={false} style={styles.buttonText}>Trotzdem Vogelart identifizieren</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

NoBirdFoundScreen.navigationOptions = navData => {
    return {
        headerTitle: "Hinweis"
    }

}

function fontSizeAdapterButton() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 18;
    } else if (width > 250) {
        return 16;
    } else {
        return 12;
    }
}

function fontSizeAdapterTitle1() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 36;
    } else if (width > 250) {
        return 32;
    } else {
        return 26;
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
    button: {
        padding: 10,
        width: 300,
        borderRadius: 100,
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        marginTop: 20,
        elevation: 5,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: fontSizeAdapterButton(),
        fontFamily: "Manrope_600SemiBold"
    },
    text1: {
        fontFamily: "Manrope_700Bold",
        fontSize: fontSizeAdapterTitle1(),
        textAlign: "center",

    },
    text2: {
        fontFamily: "Manrope_400Regular",
        fontSize: 18,
        textAlign: "center",
        width: 300,
        color: "gray",
        marginTop: 10,
        marginBottom: 20
    }
});

export default NoBirdFoundScreen;