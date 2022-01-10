import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native"

const SpeciesNameTitle = props => {
    return (<View style={styles.speciesName}>
        <Text allowFontScaling={false} style={styles.speciesNameText}>{props.title}</Text>
    </View>);
};

const styles = StyleSheet.create({
    speciesName: {
        marginTop: 5,
        marginHorizontal: "5%",
    },
    speciesNameText: {
        fontSize: 22,
        fontFamily: "Manrope_300Light",
        color: "gray"
    },
});

export default SpeciesNameTitle;