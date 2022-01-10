import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = props => {
    return (<View style={styles.cardShadow}>
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onSelect}>
            <LinearGradient style={styles.card} colors={[props.color_start, props.color_end]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                <Image source={props.path} style={{ width: 45, height: 45 }} />
                <Text allowFontScaling={false} style={styles.title}>{props.text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>);
};

function sizeAdapter() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 24;
    } else if (width > 350) {
        return 20;
    } else if (width > 270) {
        return 16;
    } else {
        return 14;
    }
}

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 15,
    },
    card: {
        flexDirection: "row",
        borderRadius: 13,
        height: 75,
        width: "100%",
        justifyContent: "flex-start",
        paddingLeft: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    title: {
        fontFamily: "Manrope_700Bold",
        fontSize: sizeAdapter(),
        color: "white",
        marginLeft: 25
    },
});

export default GradientButton;