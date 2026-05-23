import { Link } from "expo-router";
import { Text, View } from "react-native";
import { crmPipelineTemplate, sampleCrmLeads } from "@keystone/crm";

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-paper px-5 py-8">
      <View className="flex-1 justify-center gap-5">
        <View>
          <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.6px] text-ink-4">
            CRM template
          </Text>
          <Text className="mt-3 font-display text-[32px] font-medium leading-[34px] text-ink-0">
            Leads that start from conversations.
          </Text>
          <Text className="mt-3 text-[13px] leading-5 text-ink-3">
            AI follow-ups, reminders, pipeline, and property matches reuse the Keystone platform
            packages.
          </Text>
        </View>

        <View className="flex-row gap-2">
          {crmPipelineTemplate.slice(0, 4).map((stage) => (
            <View
              className="min-w-[74px] rounded-3 border border-line bg-white p-3"
              key={stage.name}
            >
              <Text className="font-mono text-[9px] uppercase text-ink-4">{stage.kind}</Text>
              <Text className="mt-1 text-[12px] font-medium text-ink-1">{stage.name}</Text>
            </View>
          ))}
        </View>

        <View className="gap-3">
          {sampleCrmLeads.map((lead) => (
            <View className="rounded-4 border border-line bg-white p-4" key={lead.name}>
              <View className="flex-row items-center justify-between">
                <Text className="text-[15px] font-medium text-ink-1">{lead.name}</Text>
                <Text className="font-mono text-[11px] text-ink-3">{lead.score}</Text>
              </View>
              <Text className="mt-1 text-[12px] text-ink-4">{lead.budget}</Text>
              <Text className="mt-1 text-[13px] leading-5 text-ink-3">{lead.aiAction}</Text>
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
