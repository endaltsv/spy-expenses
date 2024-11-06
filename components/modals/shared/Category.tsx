import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category as ModelCategory } from '@/models/Category';
import SvgClose from '@/assets/images/close.svg';

interface CategoryProps {
  category: ModelCategory;
  closeVisible?: boolean;
  active: boolean;
  onPress?: () => void;
}

const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const Category: React.FC<CategoryProps> = ({
  category,
  active,
  onPress,
  closeVisible,
}) => {
  console.log('Category render.');

  return (
    <TouchableOpacity
      style={[styles.categoryButton, active && styles.selectedCategoryButton]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={category.icon}
        size={16}
        style={[styles.categoryIcon, active && styles.selectedCategoryIcon]}
      />
      <Text
        style={[styles.categoryText, active && styles.categoryTextSelected]}
      >
        {capitalizeFirstLetter(category.name)}
      </Text>
      {closeVisible && (
        <TouchableOpacity
          onPress={() => console.log('close')}
          style={styles.closeButton}
        >
          <SvgClose />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default memo(Category);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#979797',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  selectedCategoryButton: {
    backgroundColor: '#d3fd51',
  },
  categoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: 'white',
  },
  selectedCategoryIcon: {
    color: 'black',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  categoryTextSelected: {
    color: 'black',
  },
  closeButton: {
    marginLeft: 8,
    marginTop: 1,
  },
});
