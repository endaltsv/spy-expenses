import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import Modal from 'react-native-modal';
import Handle from './shared/Handle';
import Header from '../ui/Header';
import MonthCategoryCard from '../cards/MonthCategoryCard';
import NewCategoryCard from '../cards/NewCategoryCard';
import { useCategoryStatistics } from '@/context/CategoryStatisticsContext';

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
}

const AllCategoriesModal = ({ visible, onClose }: ExpenseModalProps) => {
  console.log('AllCategoriesModal render.');
  const theme = useTheme();

  const { getCategoryData } = useCategoryStatistics();
  const categoryData = getCategoryData('all');

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 64) / 2;

  return (
    <Modal
      isVisible={visible}
      style={styles.modalContainer}
      swipeDirection="down"
      onSwipeComplete={onClose}
      swipeThreshold={150}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Handle />
          <View>
            <Header title="Категории" size={3} />
          </View>
          <View>
            <FlatList
              data={categoryData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={[{ width: cardWidth }]}>
                    <MonthCategoryCard
                      categoryName={item.name}
                      categoryTotalExpense={item.totalAmount}
                      categoryTotalPurchase={item.totalPurchases}
                    />
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              ListFooterComponent={
                <TouchableOpacity>
                  <NewCategoryCard />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AllCategoriesModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '95%',
    paddingTop: 54,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
