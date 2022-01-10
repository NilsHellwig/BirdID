import React from "react";
import { Text, StyleSheet, ScrollView} from "react-native";

const ImpressumScreen = props => {
    return (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <Text allowFontScaling={false} style={styles.title}>Kontakt</Text>
            <Text allowFontScaling={false} style={{...styles.description, ...{marginTop: 20}}}>Nils Hellwig</Text>
            <Text allowFontScaling={false} style={styles.description}>E-Mail: birdidcontact@gmail.com</Text>
        </ScrollView>
    )
}

ImpressumScreen.navigationOptions = navData => {
    return {
        headerTitle: "Impressum"
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontFamily: "Manrope_800ExtraBold",
        marginTop: 20
    },
    description: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: "Manrope_400Regular",
        textAlign: "justify",
    },
});

export default ImpressumScreen;
