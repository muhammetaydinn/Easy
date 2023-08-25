import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
const data = [
  {id: 1, text: '+'},
  {id: 2, text: 'For You'},
  {id: 3, text: 'Following'},
  {id: 4, text: 'TypeScript'},
  {id: 5, text: 'Software'},
  {id: 6, text: 'Web Development'},
  {id: 7, text: 'Metin 7'},
  // Diğer metinler...
];

const ScrollableTexts: React.FC = () => {
  const renderItem = ({item}: {item: {id: number; text: string}}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
export default ScrollableTexts;
