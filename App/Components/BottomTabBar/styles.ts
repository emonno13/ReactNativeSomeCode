import { hScale, wScale } from './../../Themes/Responsive';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import DefaultTheme from '../../Themes/DefaultTheme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },

    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hScale(55),
        width: width / 4,
    },

    icon: {
        width: wScale(30),
        height: wScale(30),
    },

    activeIcon: {
        backgroundColor: DefaultTheme.colors.primary,
        width: wScale(70),
        height: wScale(70),
        borderRadius: wScale(35),
        justifyContent: 'center',
        alignItems: 'center',
    },

    activeView: {
        position: 'absolute',
        bottom: hScale(17),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
