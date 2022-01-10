import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Image as AutoHeightImage } from 'react-native-element-image';
const win = Dimensions.get('window');


const WhatIsBirdIDScreen = props => {

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} style={styles.view}>
            <Text allowFontScaling={false} style={styles.title}>Wie funktioniert BirdID?</Text>
            <View>
                <AutoHeightImage width={win.width - 40} source={require("../data/large_nn.png")} />
            </View>
            <Text allowFontScaling={false} style={styles.description}>Die Fotografie wird zur Bestimmung an einen Server übertragen, auf dem ein neuronales Netz bereitgestellt wird. Das neuronale Netzwerk (Convolutional neural network) wurde zuvor mit fast 200.000 Bildern zu 307 verschiedenen Arten trainiert.</Text>
            <Text allowFontScaling={false} style={{...styles.description,...{marginTop: 10}}}>Es ist möglich, dass eine Vogelart nicht erkannt wird. Damit die Klassifikation so gut wie möglich funktioniert, lohnt sich ein Blick in den Artikel "Tipps für BirdID".</Text>
        </ScrollView>)
}

WhatIsBirdIDScreen.navigationOptions = navData => {
    return {
        headerTitle: "Wie funktioniert BirdID?"
    }

}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontFamily: "Manrope_800ExtraBold",
        marginTop: 20,
        marginBottom: 30,
    },
    description: {
        fontSize: 20,
        marginTop: 20,
        lineHeight: 40,
        fontFamily: "Manrope_400Regular",
        textAlign: "justify",
    },
});


export default WhatIsBirdIDScreen;