module.exports = function apiConfig(api) {
  api.cache(true);

  return {
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
    presets: ["babel-preset-expo"],
  };
};
