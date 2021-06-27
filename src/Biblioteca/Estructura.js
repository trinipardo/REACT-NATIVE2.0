import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataBorrar=async (key)=>{ //esto me recupera el get
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch(e) {
      }
      }
  
 export const storeDataBorrado=async (value,key) => { //guardo lo que recupere
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
        }
      }


