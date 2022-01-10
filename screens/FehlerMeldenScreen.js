import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as EmailValidator from "email-validator";
import { fetchServerIp } from "../functions/fetchServerIp";

const FehlerMeldenScreen = props => {

    const [problemText, setProblemText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [warning, setWarning] = useState(false);

    const changeProblemText = (problemText) => {
        setProblemText(problemText)
    };

    const changeEmailText = (emailText) => {
        setEmailText(emailText);
    };

    const sendErrorReport = async () => {
        // Der Error-Report wird nur verschickt, sollte die angegebene E-Mail valide sein und eine Beschreibung des Problems angegeben sein.
        if (EmailValidator.validate(emailText) && problemText.length > 0) {
            setWarning(false);
            const ip = await fetchServerIp()
            fetch(ip + "send_error_report", {
                method: "POST",
                body: JSON.stringify({ "problemText": problemText, "emailText": emailText })
            }).catch(() => {
                Alert.alert(
                    "Warnung",
                    "Es gab ein Problem bei dem Verschicken einer Nachricht. Bitte schreib eine E-Mail an die oben genannte E-Mail Adresse!",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        { text: "OK" }
                    ]
                );
            }).then(() => {
                setProblemText("");
                setEmailText("");
                Alert.alert(
                    "Hinweis",
                    "Deine Nachricht wurde erfolgreich übermittelt! Du wirst zeitnah eine Antwort erhalten."
                );
            });
        } else {
            setWarning(true);
        };
    };

    useEffect(() => {

    }, []);

    return (
        <KeyboardAwareScrollView style={styles.view} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} >
            <Text allowFontScaling={false} style={styles.title}>Fehler melden</Text>
            <Text allowFontScaling={false} style={styles.description}>Gibt es Probleme bei der Verwendung der Anwendung? Bitte beschreib das Problem möglichst genau. Es kann sein, dass es eine Störung am Server gibt, sodass sowohl eine Bestimmung als auch das Versenden des Fehlerberichts nicht funktioniert. Bitte schreibe dann eine Mail an: </Text>
            <Text allowFontScaling={false} style={{ ...styles.description, ...{ textAlign: "left" } }}>birdidcontact@gmail.com</Text>
            <View style={styles.outerElement}>
                <TextInput returnKeyType="done" clearButtonMode="always" placeholder="Beschreib das Problem..." style={styles.textInput} color="black" onChangeText={text => changeProblemText(text)} value={problemText} />
            </View>
            <View style={styles.outerElement}>
                <TextInput returnKeyType="done" clearButtonMode="always" autoCompleteType="email" keyboardType="email-address" textContentType="emailAddress" placeholder="E-Mail..." style={styles.textInput} color="black" onChangeText={text => changeEmailText(text)} value={emailText} />
            </View>
            <TouchableOpacity style={{ flex: 1 }} onPress={sendErrorReport} style={styles.meldenButtonView}>
                <Text allowFontScaling={false} style={styles.buttonText}>Melden</Text>
                <Image style={styles.enterImage} source={require("../icons/more/go.png")} />
            </TouchableOpacity>
            {
                warning && <Text allowFontScaling={false} style={styles.warning}>Gib einen Text ein und achte darauf, dass Deine E-Mail Adresse korrekt ist!</Text>
            }
        </KeyboardAwareScrollView>
    )
}

FehlerMeldenScreen.navigationOptions = navData => {
    return {
        headerTitle: "Fehler melden"
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontFamily: "Manrope_800ExtraBold",
        marginTop: 10
    },
    description: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: "Manrope_400Regular",
        textAlign: "justify",
    },
    enterImage: {
        width: 30,
        height: 33.5,
        marginTop: 10,
    },
    outerElement: {
        padding: 15,
        flexDirection: "row",
        borderRadius: 15,
        height: "auto",
        backgroundColor: "white",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: 'center',
        marginTop: 20
    },
    textInput: {
        fontFamily: "Manrope_500Medium",
        fontSize: 22,
        color: "black",
        width: "100%",
        marginHorizontal: 10,
    },
    meldenButtonView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "white",
        marginTop: 20,
        width: 170,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 26,
        fontFamily: "Manrope_500Medium",
        marginRight: 10,
        alignItems: "center",
        marginTop: 10
    },
    warning: {
        marginTop: 20,
        color: "red",
        fontSize: 18,
        fontFamily: "Manrope_500Medium",
    }
});

export default FehlerMeldenScreen;