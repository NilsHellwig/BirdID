import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Image as AutoHeightImage } from 'react-native-element-image';

const win = Dimensions.get('window');

const PhotographySingleView = props => {
    return (
        <ScrollView style={styles.view}>
            <AutoHeightImage style={styles.image} width={win.width-20} source={{ uri: props.navigation.getParam("uri") }}/>
        </ScrollView>
    )
}

PhotographySingleView.navigationOptions = navData => {
    return {
        headerTitle: "Deine Fotografie"
    }

}


const styles = StyleSheet.create({
    view: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    image: {
        
    },
});

export default PhotographySingleView;