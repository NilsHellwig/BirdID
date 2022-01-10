import React from "react";
import { View, StyleSheet} from "react-native"

const BlackLine = props => {
    return (<View style={styles.line}></View>);
};

const styles = StyleSheet.create({
    certainty: {
        marginTop: 10,
        marginHorizontal: "5%",
    },
    certaintyText: {
        fontSize: 28,
        fontFamily: "Manrope_700Bold",
        color: "#4361EE"
    },
    line: {
        backgroundColor: "#555555",
        height: 1.5,
        width: "112%",
        marginTop: 25,
        marginHorizontal: "-6%"
    },
});

export default BlackLine;