import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native"
import { Image as AutoHeightImage } from 'react-native-element-image';

const ScientificClassificationElement = props => {
    return (<View style={styles.scientificClassificationElement}>
        <Text allowFontScaling={false} style={styles.scientificClassificationElementKey}>{props.key_text}: </Text>
        <Text allowFontScaling={false} style={styles.scientificClassificationElementValue}>{props.value_text}</Text>
    </View>);
};

const styles = StyleSheet.create({
    scientificClassificationElement: {
        flexDirection: "row",
        marginTop: 12
    },
    scientificClassificationElementKey: {
        fontFamily: "Manrope_700Bold",
        fontSize: 24
    },
    scientificClassificationElementValue: {
        fontFamily: "Manrope_300Light",
        fontSize: 24,
        color: "gray",
        marginLeft: 5
    },
});

export default ScientificClassificationElement;