import React from "react";
import { Platform, Image } from 'react-native';
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createAppContainer
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import LexikonScreen from '../screens/LexikonScreen';
import MeineVoegelScreen from '../screens/MeineVoegelScreen';
import MehrScreen from '../screens/MehrScreen';
import NoBirdFoundScreen from "../screens/NoBirdFoundScreen";
import PredictionsScreen from "../screens/PredictionsScreen";
import BirdDetailScreen from "../screens/BirdDetailScreen";
import PhotographySingleView from "../screens/PhotographySingleView";
import MoreImagesScreen from "../screens/MoreImagesScreen"
import TippsScreen from "../screens/TippsScreen";
import DatenspendeScreen from "../screens/DatenspendeScreen";
import FehlerMeldenScreen from "../screens/FehlerMeldenScreen"
import ImpressumScreen from "../screens/ImpressumScreen";
import WhatIsBirdIDScreen from "../screens/WhatIsBirdIDScreen";

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    NoBirdFoundScreen: {
      screen: NoBirdFoundScreen
    },
    PredictionsScreen: {
      screen: PredictionsScreen
    },
    BirdDetailScreen: {
      screen: BirdDetailScreen
    },
    PhotographySingleView: {
      screen: PhotographySingleView
    },
    MoreImagesScreen: {
      screen: MoreImagesScreen
    },
    TippsScreen: {
      screen: TippsScreen
    },
    WhatIsBirdIDScreen: {
      screen: WhatIsBirdIDScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleStyle: {
        fontFamily: "Manrope_500Medium",
        fontSize: 22,
      },
      headerTintColor: "black",
      headerTitle: "Home"
    }
  }
);

const LexikonNavigator = createStackNavigator(
  {
    LexikonScreen: {
      screen: LexikonScreen
    },
    BirdDetailScreen: {
      screen: BirdDetailScreen
    },
    MoreImagesScreen: {
      screen: MoreImagesScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTitleStyle: {
        fontFamily: "Manrope_500Medium",
        fontSize: 22,
      },
      headerTintColor: "black",
      headerTitle: "Lexikon"
    }
  }
);

const MeineVögelNavigator = createStackNavigator(
  {
    MeineVoegelScreen: {
      screen: MeineVoegelScreen
    },
    BirdDetailScreen: {
      screen: BirdDetailScreen
    },
    PredictionsScreen: {
      screen: PredictionsScreen
    },
    PhotographySingleView: {
      screen: PhotographySingleView
    },
    MoreImagesScreen: {
      screen: MoreImagesScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTitleStyle: {
        fontFamily: "Manrope_500Medium",
        fontSize: 22,
      },
      headerTintColor: "black",
      headerTitle: "Meine Vögel"
    }
  }
);

const MehrNavigator = createStackNavigator(
  {
    MehrScreen: {
      screen: MehrScreen
    },
    DatenspendeScreen: {
      screen: DatenspendeScreen
    },
    FehlerMeldenScreen: {
      screen: FehlerMeldenScreen
    },
    ImpressumScreen: {
      screen: ImpressumScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTitleStyle: {
        fontFamily: "Manrope_500Medium",
        fontSize: 22,
      },
      headerTintColor: "black",
      headerTitle: "Mehr"
    }
  }
);

const tabScreenConfig = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarColor: "white",
      tabBarLabel: "Home",
      // Quelle: https://icons8.com/icon/set/home/ios
      tabBarIcon: ({ tintColor, focused }) => {
        const image = focused
          ? require("../icons/tab-bar/icons8-home-100.png")
          : require("../icons/tab-bar/icons8-home-100-selected.png")
        return (
          <Image
            source={image}
            style={{ width: 26, height: 26, tintColor: tintColor }}
          />
        )
      }
    }
  },
  LexikonScreen: {
    screen: LexikonNavigator,
    navigationOptions: {
      tabBarColor: "white",
      tabBarLabel: "Lexikon",
      // Quelle: https://icons8.com/icon/set/book/ios
      tabBarIcon: ({ tintColor, focused }) => {
        const image = focused
          ? require("../icons/tab-bar/icons8-bookmark-100.png")
          : require("../icons/tab-bar/icons8-bookmark-100-selected.png")
        return (
          <Image
            source={image}
            style={{ width: 26, height: 26, tintColor: tintColor }}
          />
        )
      }
    }
  },
  MeineVögelScreen: {
    screen: MeineVögelNavigator,
    navigationOptions: {
      tabBarColor: "white",
      tabBarLabel: "Meine Vögel",
      // Quelle: https://icons8.com/icon/set/bird/ios
      tabBarIcon: ({ tintColor, focused }) => {
        const image = focused
          ? require("../icons/tab-bar/icons8-sparrowhawk-100.png")
          : require("../icons/tab-bar/icons8-sparrowhawk-100-selected.png")
        return (
          <Image
            source={image}
            style={{ width: 26, height: 26, tintColor: tintColor }}
          />
        )
      }
    }
  },
  MehrScreen: {
    screen: MehrNavigator,
    navigationOptions: {
      tabBarColor: "white",
      tabBarLabel: "Mehr",
      // Quelle: https://icons8.com/icon/set/more/ios
      tabBarIcon: ({ tintColor, focused }) => {
        const image = focused
          ? require("../icons/tab-bar/icons8-more-100.png")
          : require("../icons/tab-bar/icons8-more-100-selected.png")
        return (
          <Image
            source={image}
            style={{ width: 26, height: 26, tintColor: tintColor }}
          />
        )
      }
    }
  }
};

const MainNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    shifting: false,
    labeled: true,
    barStyle: { backgroundColor: "white", paddingBottom: 5, paddingTop: 5 },
    activeColor: "#F72585",
    inactiveColor: "gray",
    inactiveTintColor: "gray",
  })
  : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      activeTintColor: "#F72585",
      labelStyle: {
        fontFamily: "Manrope_800ExtraBold"
      },
      inactiveTintColor: "gray",
    }
  });

export default createAppContainer(MainNavigator);