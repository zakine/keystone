import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { nativeTokens } from "../tokens/native";

const colors = nativeTokens.colors;

export function MobileScreen({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: dark ? colors.graphite[0] : colors.paper.DEFAULT,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 54,
      }}
    >
      {children}
    </View>
  );
}

export function MobileScreenHeader({
  eyebrow,
  subtitle,
  title,
}: {
  eyebrow?: string;
  subtitle?: string;
  title: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      {eyebrow ? (
        <Text
          style={{
            color: colors.ink[4],
            fontFamily: "JetBrains Mono",
            fontSize: 11,
            fontWeight: "600",
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </Text>
      ) : null}
      <Text
        style={{
          color: colors.ink[0],
          fontFamily: "Inter Tight",
          fontSize: 32,
          fontWeight: "500",
          letterSpacing: 0,
          lineHeight: 34,
        }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={{
            color: colors.ink[3],
            fontSize: 13,
            lineHeight: 20,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export function MobileAIComposer({ placeholder = "Ask anything..." }: { placeholder?: string }) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderColor: colors["graphite-line"],
        borderRadius: 28,
        borderWidth: 1,
        flexDirection: "row",
        gap: 12,
        padding: 8,
        paddingLeft: 16,
      }}
    >
      <Text style={{ color: colors.graphite["ink-3"], flex: 1, fontSize: 14 }}>{placeholder}</Text>
      <View
        style={{
          alignItems: "center",
          backgroundColor: colors.semantic.accent,
          borderRadius: 18,
          height: 36,
          justifyContent: "center",
          width: 36,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>AI</Text>
      </View>
    </View>
  );
}

export function MobileLeadTemplate() {
  return (
    <MobileScreen>
      <MobileScreenHeader
        eyebrow="AI inbox"
        subtitle="Conversations surface with suggested next actions."
        title="Today"
      />
      <View style={{ gap: 12, marginTop: 24 }}>
        {["Sophia Marchetti", "Theo Beaumont", "Amelie Laurent"].map((name) => (
          <View
            key={name}
            style={{
              backgroundColor: "#fff",
              borderColor: colors.line,
              borderRadius: 18,
              borderWidth: 1,
              gap: 10,
              padding: 16,
            }}
          >
            <Text style={{ color: colors.ink[1], fontSize: 15, fontWeight: "500" }}>{name}</Text>
            <Text style={{ color: colors.ink[3], fontSize: 13, lineHeight: 19 }}>
              Keystone drafted a concise follow-up and attached the relevant property context.
            </Text>
          </View>
        ))}
      </View>
    </MobileScreen>
  );
}

export function MobileAssistantTemplate() {
  return (
    <MobileScreen dark>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: colors.semantic.accent,
            borderRadius: 40,
            height: 80,
            marginBottom: 28,
            width: 80,
          }}
        />
        <Text
          style={{
            color: colors.graphite.ink,
            fontFamily: "Inter Tight",
            fontSize: 28,
            fontWeight: "500",
            letterSpacing: 0,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          What should Keystone do?
        </Text>
        <Text
          style={{
            color: colors.graphite["ink-3"],
            fontSize: 14,
            lineHeight: 21,
            maxWidth: 280,
            textAlign: "center",
          }}
        >
          Use voice or text to draft follow-ups, find matches, and summarize conversations.
        </Text>
      </View>
      <MobileAIComposer />
    </MobileScreen>
  );
}
