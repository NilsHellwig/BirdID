import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native"

const RankingTitle = props => {
    return (<View style={styles.rankingElement}>
        <Text allowFontScaling={false} style={styles.rankingElementText}>RANKING</Text>
    </View>);
};

const styles = StyleSheet.create({
    rankingElement: {
        marginBottom: 5,
        marginTop: -20,
    },
    rankingElementText: {
        fontSize: 16,
        fontFamily: "Manrope_800ExtraBold",
        color: "black",
        letterSpacing: 4,
        textAlign: "center"
    },
});

export default RankingTitle;