import React from "react";
import { View, StyleSheet, Text, Image } from "react-native"

const TippTitleElement = props => {

    // Quelle: https://icons8.com/icon/set/camera/ios / https://icons8.com/icon/set/resize/ios / https://icons8.com/icon/set/shoot-image/ios 
    return (
        <View style={styles.view}>
            <Image style={styles.microIcon} source={props.image} />
            <Text allowFontScaling={false} style={styles.titleText}>{props.title}</Text>
        </View>);
};

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30
    },
    microIcon: {
        width: 32,
        height: 32,
        marginRight: 10
    },
    titleText: {
        fontSize: 18,
        fontFamily: "Manrope_600SemiBold",
        letterSpacing: 1,
    }
});

export default TippTitleElement;