import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native"

const WhiteCard = props => {
    return (<View style={props.margin}>
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onSelect}>
            <View style={styles.card}>
                <View style={styles.textElement}>
                    <Text allowFontScaling={false} style={styles.title}>{props.title}</Text>
                    <Text allowFontScaling={false} style={styles.description}>{props.description}</Text>
                    {props.timestamp !== undefined &&
                        <View>
                            <Text allowFontScaling={false} style={styles.timestampTitle}>Zuletzt aktualisiert: </Text>
                            <Text allowFontScaling={false} style={styles.timestamp}>{props.timestamp}</Text>
                        </View>
                    }
                </View>
                <View style={styles.imageWrapper}>
                    <Image source={props.path} style={{ ...styles.image, ...props.imageStyle }} />
                </View>
            </View>
        </TouchableOpacity>
    </View>);
};

function fontSizeAdapterTitle() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 20;
    } else if (width > 250) {
        return 18;
    } else {
        return 16;
    }
}

function fontSizeAdapterDescription() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 18;
    } else if (width > 250) {
        return 16;
    } else {
        return 14;
    }
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 15,
        flexDirection: "row",
        borderRadius: 13,
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
    timestamp: {
        color: "gray",
        marginLeft: 10,
        fontFamily: "Manrope_400Regular",
    },
    timestampTitle: {
        color: "gray",
        marginLeft: 10,
        marginTop: 5,
        fontFamily: "Manrope_400Regular",
    },
    description: {
        fontFamily: "Manrope_400Regular",
        fontSize: fontSizeAdapterDescription(),
        color: "gray",
        marginLeft: 10
    },
    textElement: {
        width: "60%"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    imageWrapper: {
        marginLeft: "auto",
        marginRight: 12
    }
});

export default WhiteCard;