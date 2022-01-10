import React, { useState } from "react";
import { View, TextInput, StyleSheet} from "react-native"

const SearchBar = props => {
    // https://icons8.com/icon/set/search/ios
    return (<View style={props.margin}>
        <View style={styles.outerElement}>
            <TextInput returnKeyType="search" clearButtonMode="always" placeholder="Suche nach Vogelart..." style={styles.textInput} color="black" onChangeText={text => props.queryInputHandler(text)} value={props.query} />
        </View>
    </View>);
};

const styles = StyleSheet.create({
    outerElement: {
        padding: 15,
        flexDirection: "row",
        borderRadius: 100,
        height: "auto",
        backgroundColor: "white",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    textInput: {
        fontFamily: "Manrope_500Medium",
        fontSize: 22,
        color: "black",
        width: "100%",
        marginHorizontal: 10,
    },
});

export default SearchBar;