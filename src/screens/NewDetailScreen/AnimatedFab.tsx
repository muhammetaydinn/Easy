import { Animated, StyleSheet } from "react-native";
import { height, navbarHeight } from "../../utils/hw";
import { FAB } from "react-native-paper";

export const AnimatedFab = (translateYe: any) => {
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'rgba(52, 52, 52, 0)',
        width: '100%',

        //for animation
        height: 50,
        transform: [{translateY: translateYe}],
        position: 'absolute',
        top: height - navbarHeight,
        right: 0,
        left: 0,
        zIndex: 1,
        elevation: 4,
      }}>
      <FAB
        label="312"
        icon="hand-clap"
        color="white"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="comment-multiple-outline"
        color="white"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="bookmark-plus-outline"
        color="white"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({

  fab: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 50,
  },
});