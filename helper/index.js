import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, value)
    } catch (error) {
        // Error saving data
    }
}

const retrieveData = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name)
        if (value !== null) {
            // We have data!!
            console.log(value)
        }
    } catch (error) {
        // Error retrieving data
    }
}
const clearStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        // Error retrieving data
    }
}

export { storeData, retrieveData, clearStorage }
