import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Upload: undefined;
  FontUpload: undefined;
  Compose: undefined;
  Preview: undefined;
};

export type TabNavigationProp = BottomTabNavigationProp<RootStackParamList>;
export type StackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 
