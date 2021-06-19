import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { Fragment, useMemo } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Animated, SafeAreaView, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
import { TabActions } from '@react-navigation/native';

import styles from './styles';
import images from '../../Themes/Images';
import { DefaultTheme } from '../../Themes';
import { hScale } from '../../Themes/Responsive';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/rootReducer';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const activeIcons = [images.icon_white_home, images.icon_white_gift, images.icon_white_store, images.icon_white_user];
const inactiveIcons = [images.icon_black_home, images.icon_black_gift, images.icon_black_store, images.icon_black_user];
const { width } = Dimensions.get('window');
const tabHeight = hScale(55);

const BottomTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = (props) => {
    const { state, navigation } = props;
    const { routes } = state;
    const bottomVisible = useSelector((state: RootState) => state.bottomVisible.visible);

    const tabWidth = width / routes.length;
    const values = routes.map((route, index) => new Animated.Value(index === 0 ? 1 : 0));
    const value = new Animated.Value(0);
    const translateX = value.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
    });

    const getPath = (): string => {
        const left = shape
            .line()
            .x((d) => d[0])
            .y((d) => d[1])([
            [0, 0],
            [width, 0],
        ]);
        const tab = shape
            .line()
            .x((d) => d[0])
            .y((d) => d[1])
            .curve(shape.curveBasis)([
            [width, 0],
            [width + 10, 0],
            [width + 10, 10],
            [width + 15, tabHeight - 15],
            [width + tabWidth / 2, tabHeight],
            [width + tabWidth - 15, tabHeight - 15],
            [width + tabWidth - 10, 10],
            [width + tabWidth - 10, 0],
            [width + tabWidth, 0],
        ]);
        const right = shape
            .line()
            .x((d) => d[0])
            .y((d) => d[1])([
            [width + tabWidth, 0],
            [width * 2 + tabWidth, 0],
            [width * 2 + tabWidth, tabHeight],
            [0, tabHeight],
            [0, 0],
        ]);
        return `${left} ${tab} ${right}`;
    };

    const d = getPath();

    const BottomTab = useMemo(() => {
        if (bottomVisible) {
            return (
                <SafeAreaView style={[styles.container, { height: tabHeight, width: width }]}>
                    <AnimatedSvg
                        width={width * 2 + tabWidth}
                        style={{
                            transform: [{ translateX }],
                            height: tabHeight,
                            shadowColor: DefaultTheme.colors.primary,
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowOpacity: 1,
                        }}
                    >
                        <Path fill={DefaultTheme.colors.card} {...{ d }} />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill}>
                        <View style={{ flexDirection: 'row' }}>
                            {routes.map((route, index) => {
                                const translateY = values[index].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [64, 0],
                                    extrapolate: 'clamp',
                                });
                                const opacity1 = values[index].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                    extrapolate: 'clamp',
                                });

                                const onPress = (index: number) => {
                                    const event = navigation.emit({
                                        type: 'tabPress',
                                        target: route.key,
                                        canPreventDefault: true,
                                    });

                                    if (!event.defaultPrevented) {
                                        navigation.dispatch({
                                            ...TabActions.jumpTo(route.name),
                                            target: state.key,
                                        });
                                    }
                                    Animated.sequence([
                                        Animated.parallel(
                                            values.map((v) =>
                                                Animated.timing(v, {
                                                    toValue: 0,
                                                    duration: 100,
                                                    useNativeDriver: true,
                                                }),
                                            ),
                                        ),
                                        Animated.parallel([
                                            Animated.spring(value, {
                                                toValue: tabWidth * index,
                                                useNativeDriver: true,
                                            }),
                                            Animated.spring(values[index], {
                                                toValue: 1,
                                                useNativeDriver: true,
                                            }),
                                        ]),
                                    ]).start();
                                };

                                return (
                                    <Fragment key={route.key}>
                                        <TouchableOpacity onPress={() => onPress(index)}>
                                            <Animated.View style={[styles.tab]}>
                                                <Image
                                                    source={inactiveIcons[index]}
                                                    resizeMode='contain'
                                                    style={styles.icon}
                                                />
                                            </Animated.View>
                                        </TouchableOpacity>
                                        <Animated.View
                                            style={[
                                                styles.activeView,
                                                {
                                                    left: tabWidth * index,
                                                    width: tabWidth,
                                                    height: tabHeight,
                                                    opacity: opacity1,
                                                    transform: [{ translateY }],
                                                },
                                            ]}
                                        >
                                            <View style={styles.activeIcon}>
                                                <Image
                                                    source={activeIcons[index]}
                                                    resizeMode='contain'
                                                    style={styles.icon}
                                                />
                                            </View>
                                        </Animated.View>
                                    </Fragment>
                                );
                            })}
                        </View>
                    </View>
                </SafeAreaView>
            );
        } else {
            return <SafeAreaView />;
        }
    }, [bottomVisible]);

    return <>{BottomTab}</>;
};

export default BottomTabBar;
