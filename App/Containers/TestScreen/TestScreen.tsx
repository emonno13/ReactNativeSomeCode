import {Text, View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {getPhotos} from '../../Redux/photoSlice';
import {RootState} from '../../Redux/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
interface TestScreenProps {}

const TestScreen = (props: TestScreenProps) => {
  const dispatch = useDispatch();
  //   const test = useSelector(photoSelector);
  const {photos, loading, errors} = useSelector(
    (state: RootState) => state.photos,
  );
  console.log('photo', photos, loading, errors);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Obee</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});
