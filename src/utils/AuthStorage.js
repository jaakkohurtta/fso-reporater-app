import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  // Get the access token for the storage
  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}`);

    return token ? JSON.parse(token) : null;
  }

  // Add the access token to the storage
  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}`,
      JSON.stringify(accessToken)
    );
  }

  // Remove the access token from the storage
  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}`);
  }
}

export default AuthStorage;
