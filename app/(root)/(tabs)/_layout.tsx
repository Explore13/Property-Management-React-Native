import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="@android:drawable/ic_menu_home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Icon
          sf="magnifyingglass"
          drawable="@android:drawable/ic_menu_search"
        />
        <Label>Search</Label>
      </NativeTabs.Trigger>

      {/* Create Property - Admin Panel */}

      <NativeTabs.Trigger name="saved">
        <Label>Saved</Label>
        <Icon sf="heart.fill" drawable="@android:drawable/btn_star_big_on" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          sf="person.fill"
          drawable="@android:drawable/ic_menu_my_calendar"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
