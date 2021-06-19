import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface NewsFeedScreenProps {}

const NewsFeedScreen = (props: NewsFeedScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>NewsFeedScreen</Text>
    </View>
  );
};

export default NewsFeedScreen;

const styles = StyleSheet.create({
  container: {},
});
