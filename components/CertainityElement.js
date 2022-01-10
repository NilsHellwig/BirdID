import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native"

const CertainityElement = props => {
    return (<View style={styles.certainty}>
        <Text allowFontScaling={false} style={styles.certaintyText}>Sicherheit: {props.certainty}</Text>
    </View>);
};

function sizeAdapter() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 26;
    } else if (width > 250) {
        return 22;
    } else {
        return 18;
    }
}

const styles = StyleSheet.create({
    certainty: {
        marginTop: 10,
        marginHorizontal: "5%",
    },
    certaintyText: {
        fontSize: sizeAdapter(),
        fontFamily: "Manrope_700Bold",
        color: "#4361EE"
    },
});

export default CertainityElement;