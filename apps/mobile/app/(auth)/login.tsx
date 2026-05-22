import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center bg-paper px-5">
      <Text className="font-display text-[28px] font-medium text-ink-0">Sign in</Text>
      <Text className="mt-2 text-[13px] leading-5 text-ink-3">
        Supabase auth flows and native secure session handling will attach here when product
        requirements are defined.
      </Text>
    </View>
  );
}
