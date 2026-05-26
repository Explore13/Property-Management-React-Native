import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const properties = [
  {
    id: 1,
    title: "Luxury Apartment",
    city: "Kolkata",
    price: "45 Lakh",
  },
  {
    id: 2,
    title: "Modern Villa",
    city: "Bangalore",
    price: "1.25 Crore",
  },
  {
    id: 3,
    title: "2BHK Flat",
    city: "Mumbai",
    price: "78 Lakh",
  },
  {
    id: 4,
    title: "Beach House",
    city: "Chennai",
    price: "1.5 Crore",
  },
  {
    id: 5,
    title: "Studio Apartment",
    city: "Delhi",
    price: "32 Lakh",
  },
];

export default function RootLayout() {
  return (
    <SafeAreaView className="p-4 flex-1 bg-slate-200">
      <View>
        <Text>Edit app/index.tsx to edit this screen</Text>
        <TextInput
          placeholder="Serach City..."
          placeholderTextColor="gray"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 10,
            marginTop: 12,
          }}
        />

        <TouchableOpacity
          onPress={() => alert("Searching...")}
          style={{
            backgroundColor: "#2563EB",
            padding: 12,
            borderRadius: 8,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text style={{ color: "#666" }}>{item.city}</Text>
            <Text style={{ color: "#2563EB" }}>{item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
