import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native"

const BirdTitle = props => {
    function sizeAdapter(title) {
        var gradient = 1;
        if (title !== undefined) {
            if (title.length > 20) {
                gradient = 0.5;
            } 
            if (title.length > 25) {
                gradient = 0.75;
            }
        }
        let width = Dimensions.get('window').width;
        if (width > 400) {
            return 30 * gradient;
        } else if (width > 250) {
            return 26 * gradient;
        } else {
            return 22 * gradient;
        }
    }
    return (<TouchableOpacity onPress={props.onPress}>
        <View style={styles.title}>
            <Text allowFontScaling={false} style={{ ...styles.titleText, ...{ fontSize: sizeAdapter(props.title) } }}>{props.title}</Text>
            {props.display_arrow ?
                <Image style={styles.titleIcon} source={require("../icons/prediction-screen/icons8-expand-arrow-100.png")} /> :
                <></>}
        </View>
    </TouchableOpacity>);
};



const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleIcon: {
        transform: [{ rotate: '-90deg' }],
        width: 35,
        height: 35
    },
    titleText: {
        color: "black",
        fontFamily: "Manrope_800ExtraBold",
        marginHorizontal: "5%",
        marginRight: -2,
    },
});

export default BirdTitle;