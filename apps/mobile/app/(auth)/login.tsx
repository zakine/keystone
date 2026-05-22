import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center bg-background px-5">
      <Text className="text-2xl font-semibold text-foreground">Sign in</Text>
      <Text className="mt-2 text-sm leading-6 text-foreground/70">
        Supabase auth flows and native secure session handling will attach here when product
        requirements are defined.
      </Text>
    </View>
  );
}
