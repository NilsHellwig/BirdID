import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native"

const SelectorElement = props => {
    return (<TouchableOpacity onPress={props.onSelect}>
        <View style={{...styles.selectorElement,...{borderWidth: props.selected ? 2 : 0}}}>
            <Text allowFontScaling={false} style={styles.selectorElementText}>{props.title}</Text>
        </View>
    </TouchableOpacity>);
};

function getSelectorMargin() {
    let width = Dimensions.get('window').width;
    if (width > 700) {
        return 30
    } else if (width > 400) {
        return 7;
    } else if (width > 250) {
        return 5;
    } else {
        return 3;
    }
}

function getFontSize() {
    let width = Dimensions.get('window').width;
    if (width > 700) {
        return 22
    } else if (width > 400) {
        return 20;
    } else if (width > 250) {
        return 15;
    } else {
        return 12;
    }
}

function getPaddingHorizontal() {
    let width = Dimensions.get('window').width;
    if (width > 700) {
        return 22
    } else if (width > 400) {
        return 20;
    } else if (width > 250) {
        return 15;
    } else {
        return 12;
    }
}

const styles = StyleSheet.create({
    selectorElement: {
        backgroundColor: "white",
        borderRadius: 100,
        marginHorizontal: getSelectorMargin(),
        paddingVertical: 14,
        paddingHorizontal: getPaddingHorizontal(),
    },
    selectorElementText: {
        fontSize: getFontSize(),
        color: "black",
        fontFamily: "Manrope_800ExtraBold",
        textAlign: "center"
    },
});

export default SelectorElement;