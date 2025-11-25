import { useEffect } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export default function RootErrorBoundary({ error, reset }) {
  // opzionale: puoi loggare errori su Sentry qui
  useEffect(() => {
    // console.error(error);
  }, [error]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#c1121f" }}>
        Qualcosa è andato storto
      </Text>
      <Text style={{ color: "#444", marginBottom: 24 }}>{error.message}</Text>
      <Button
        title="Riprova"
        onPress={() => reset?.()}
        color="#2196f3"
      />
      <Button
        title="Torna all'home"
        onPress={() => router.replace("/")}
        color="#ccc"
      />
    </View>
  );
}
