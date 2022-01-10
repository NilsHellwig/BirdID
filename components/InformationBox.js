import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Image as AutoHeightImage } from 'react-native-element-image';

const InformationBox = props => {

    const upperCaseAllWordsExceptFirstLetter = (string) => {
        return string.replace(/\S*/g, function (word) {
            return word.slice(0).toUpperCase();
        });
    }

    return (<View style={styles.informationBoxesElement}>
        <Text allowFontScaling={false} style={{...styles.informationBoxesElementTitle,...{color: props.color}}}>{upperCaseAllWordsExceptFirstLetter(props.title)}</Text>
        <Text allowFontScaling={false} style={styles.informationBoxesElementText}>{props.text}</Text>
    </View>);
};

function sizeAdapter() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 22;
    } else if (width > 250) {
        return 18;
    } else {
        return 16;
    }
}

const styles = StyleSheet.create({
    informationBoxesElement: {

    },
    informationBoxesElementTitle: {
        fontFamily: "Manrope_800ExtraBold",
        letterSpacing: 4,
        fontSize: sizeAdapter(),
        marginTop: 40
    },
    informationBoxesElementText: {
        fontFamily: "Manrope_400Regular",
        fontSize: 17,
        marginTop: 20,
        textAlign: "justify",
        lineHeight: 30,
    }
});

export default InformationBox;