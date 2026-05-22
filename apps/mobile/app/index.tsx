import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-paper px-5 py-8">
      <View className="flex-1 justify-center gap-6">
        <View>
          <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.6px] text-ink-4">
            AI SaaS factory
          </Text>
          <Text className="mt-3 font-display text-[32px] font-medium leading-[34px] text-ink-0">
            Mobile-first Keystone shell.
          </Text>
          <Text className="mt-3 text-[13px] leading-5 text-ink-3">
            Paper surfaces, aurora AI actions, and bottom navigation follow the existing design
            foundation.
          </Text>
        </View>

        <View className="gap-3">
          {["Inbox", "Leads", "AI assistant"].map((area) => (
            <View className="rounded-4 border border-line bg-white p-4" key={area}>
              <Text className="text-[15px] font-medium text-ink-1">{area}</Text>
              <Text className="mt-1 text-[13px] leading-5 text-ink-3">
                Reusable template surface ready for product workflows.
              </Text>
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
