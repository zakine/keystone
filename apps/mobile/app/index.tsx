import { Link } from "expo-router";
import { Text, View } from "react-native";

const platformAreas = ["Auth", "Realtime", "AI", "Billing", "Workflows"];

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-background px-5 py-8">
      <View className="flex-1 justify-center gap-8">
        <View>
          <Text className="text-sm font-semibold text-accent">AI SaaS factory starter</Text>
          <Text className="mt-3 text-4xl font-semibold text-foreground">
            Mobile-first platform shell.
          </Text>
          <Text className="mt-4 text-base leading-6 text-foreground/70">
            Shared auth, database, realtime, UI, and workflow packages are ready for product
            features.
          </Text>
        </View>

        <View className="gap-3">
          {platformAreas.map((area) => (
            <View className="rounded-md border border-border p-4" key={area}>
              <Text className="font-medium text-foreground">{area}</Text>
            </View>
          ))}
        </View>

        <Link className="text-sm font-semibold text-accent" href="/(auth)/login">
          Sign in scaffold
        </Link>
      </View>
    </View>
  );
}
