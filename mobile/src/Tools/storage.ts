import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    getItem: async (item: string)=>{
        let value = null;
        try {
            value = await AsyncStorage.getItem(item);
        } catch (error) {
            value = ""
            // Error saving data
        }
        return value;
    },
    setItem: async (item: string, value: string)=>{
        try {
            await AsyncStorage.setItem(item, value);
            await AsyncStorage.clear()
        } catch (error) {
            // Error saving data
        }
    },
    clear: async ()=>{
        try {
            await AsyncStorage.clear()
        } catch (error) {
            // Error saving data
        }
    },
}