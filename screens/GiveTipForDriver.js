import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, images } from '../constants';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '../theme/ThemeProvider';
import Button from '../components/Button';

const GiveTipForDriver = ({ navigation }) => {
  const { dark, colors } = useTheme();
  const [selectedAmount, setSelectedAmount] = useState(null);

  const tipAmounts = [5, 10, 15, 20, 25, 30, 35, 40];

  const renderTipItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tipContainer, selectedAmount === item && styles.selectedTip]}
      onPress={() => setSelectedAmount(item)}
    >
      <Text style={[styles.tipText, selectedAmount === item && styles.selectedTipText]}>${item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Image
              source={images.user3}
              resizeMode='contain'
              style={styles.avatar}
            />
            <Text style={[styles.rateName, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Wow 5 Star!🤩</Text>
            <Text style={[styles.rateText, {
              color: dark ? COLORS.grayscale200 : COLORS.grayscale700,
            }]}>
              Do you want to add additional tip to make your driver's day?
            </Text>
            <View style={[styles.separateLine, {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200
            }]} />
            <FlatList
              data={tipAmounts}
              renderItem={renderTipItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              contentContainerStyle={styles.flatListContainer}
              style={{ marginVertical: 12 }}
            />
            <TouchableOpacity>
              <Text style={styles.driverName}>
                Enter custom amout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={[styles.bottomContainer, {
        backgroundColor: dark ? COLORS.dark1 : COLORS.white,
      }]}>
        <Button
          title="No, Thanks!"
          style={styles.cancelBtn}
          onPress={() => navigation.navigate("RateTheRestaurant")}
        />
        <Button
          title="Pay Trip"
          filled
          style={styles.submitBtn}
          onPress={() => navigation.navigate("RateTheRestaurant")}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  contentContainer: {
    alignItems: "center",
  },
  avatar: {
    height: 132,
    width: 132,
    borderRadius: 999,
    marginVertical: 12
  },
  rateName: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12
  },
  rateText: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    textAlign: "center",
    marginVertical: 12
  },
  separateLine: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.grayscale200
  },
  viewSubtitle: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    textAlign: "center",
    marginVertical: 12
  },
  driverName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 112,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36
  },
  cancelBtn: {
    width: (SIZES.width - 48) / 2,
    backgroundColor: COLORS.tansparentPrimary,
    borderColor: COLORS.tansparentPrimary
  },
  submitBtn: {
    width: (SIZES.width - 48) / 2,
  },
  flatListContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  tipContainer: {
    padding: 10,
    margin: 6,
    borderWidth: 1.4,
    borderRadius: 22,
    borderColor: COLORS.primary,
    width: (SIZES.width - 112) / 4,
    height: (SIZES.width - 112) / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: "bold",
  },
  selectedTipText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "bold",
  },
  selectedTip: {
    backgroundColor: COLORS.primary
  },
})

export default GiveTipForDriver