import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native"

const HistoryListElement = props => {
    return (<View style={props.margin}>
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onSelect} onLongPress={props.onLongPress}>
                <View style={styles.card}>
                    <View style={styles.textElement}>
                        <Text allowFontScaling={false} style={styles.title} numberOfLines={1}>{props.title}</Text>
                        <Text allowFontScaling={false} style={styles.description} numberOfLines={1}>{props.description}</Text>
                        <Text allowFontScaling={false} style={styles.date}>{props.date}</Text>
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image source={props.path} style={styles.image} />
                    </View>
                </View>
        </TouchableOpacity>
    </View>);
};

function fontSizeAdapterTitle() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 24;
    } else if (width > 250) {
        return 22;
    } else {
        return 18;
    }
}

function fontSizeAdapterDescription() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 22;
    } else if (width > 250) {
        return 20;
    } else {
        return 18;
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 20,
        height: "auto",
        width: "100%",
        justifyContent: "flex-start",
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: "white"
    },
    title: {
        fontFamily: "Manrope_300Light",
        fontSize: fontSizeAdapterTitle(),
        color: "black",
        marginLeft: 10
    },
    description: {
        fontFamily: "Manrope_400Regular",
        fontSize: fontSizeAdapterDescription(),
        color: "gray",
        marginLeft: 10
    },
    date: {
        marginLeft: 10,
        marginTop: 5,
        fontFamily: "Manrope_400Regular",
    },
    textElement: {
        width: "60%"
    },
    image: { 
        width: 100, 
        height: 100,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    imageWrapper: {
        marginLeft: "auto",
    }
});

export default HistoryListElement;