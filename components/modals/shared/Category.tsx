import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category as ModelCategory } from '@/models/Category';
import SvgClose from '@/assets/images/close.svg';
interface CategoryProps {
  category: ModelCategory;
  closeVisible?: boolean;
  active: boolean;
  onPress?: () => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  active,
  onPress,
  closeVisible,
}) => {
  console.log('Category render.');
  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <View>
      <TouchableOpacity
        style={active ? styles.selectedCategoryButton : styles.categoryButton}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name={category.icon}
          size={16}
          style={active ? styles.selectedCategoryIcon : styles.categoryIcon}
        />
        <Text
          style={active ? styles.categoryTextSelected : styles.categoryText}
        >
          {capitalizeFirstLetter(category.name)}
        </Text>
        {closeVisible && (
          <TouchableOpacity
            onPress={() => console.log('close')}
            style={{ marginLeft: 8, marginTop: 1 }}
          >
            <SvgClose />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Category;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 40, // Adjust the width to ensure it wraps within the screen, with some padding if needed
  },
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
  },
  selectedCategoryButton: {
    backgroundColor: '#d3fd51',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: 'white',
  },
  selectedCategoryIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: 'black',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  categoryTextSelected: {
    color: 'black',
    fontSize: 14,
  },
});
