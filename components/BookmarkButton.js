import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { insertBookmark } from "../database/database";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/BookmarkActions"

const BookmarkButton = props => {
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.BookmarkReducer.bookmarks);

    return (<TouchableOpacity onPress={async () => {
        const species_name = props.artenName;
        if (bookmarks.filter(item => item.species_name === species_name).length == 0) {
            const dbResult = await insertBookmark(species_name);
            dispatch(actions.getAllBookmarks());
        }
    }}>
        <View style={styles.saveView}>
            <Image style={styles.microIcon} source={require("../icons/prediction-screen/icons8-download-100.png")} />
            <Text allowFontScaling={false} style={styles.saveViewText}>Lesezeichen</Text>
        </View>
    </TouchableOpacity>);
};

const styles = StyleSheet.create({
    saveView: {
        flexDirection: "row",
        maxWidth: 250
    },
    saveViewText: {
        fontSize: 20,
        fontFamily: "Manrope_500Medium",
        marginLeft: 8
    },
    microIcon: {
        width: 25,
        height: 25
    },
});

export default BookmarkButton;