import { ComponentType } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useAppTheme } from "../utils/useAppTheme";

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (
    WrapperProps?.onPress ? TouchableOpacity : View
  ) as ComponentType<TouchableOpacityProps | ViewProps>;

  const { theme } = useAppTheme();

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </Wrapper>
  );
}

export const iconRegistry = {
  back: require("../assets/icons/back.png"),
  bell: require("../assets/icons/bell.png"),
  caretLeft: require("../assets/icons/caretLeft.png"),
  caretRight: require("../assets/icons/caretRight.png"),
  check: require("../assets/icons/check.png"),
  debug: require("../assets/icons/debug.png"),
  github: require("../assets/icons/github.png"),
  heart: require("../assets/icons/heart.png"),
  hidden: require("../assets/icons/hidden.png"),
  ladybug: require("../assets/icons/ladybug.png"),
  lock: require("../assets/icons/lock.png"),
  menu: require("../assets/icons/menu.png"),
  more: require("../assets/icons/more.png"),
  pin: require("../assets/icons/pin.png"),
  podcast: require("../assets/icons/podcast.png"),
  settings: require("../assets/icons/settings.png"),
  slack: require("../assets/icons/slack.png"),
  view: require("../assets/icons/view.png"),
  x: require("../assets/icons/x.png"),
  truck: require("../assets/icons/truck.png"),
  home: require("../assets/icons/home.png"),
  homeOutline: require("../assets/icons/homeOutline.png"),
  piggyBank: require("../assets/icons/piggyBank.png"),
  chatBubble: require("../assets/icons/chatBubble.png"),
  chatBubbleOutline: require("../assets/icons/chatBubbleOutline.png"),
  calendar: require("../assets/icons/calendar.png"),
  hamburger: require("../assets/icons/hamburgerMenu.png"),
  hamburgerReal: require("../assets/icons/hamburgerReal.png"),
  saveMoney: require("../assets/icons/save-money.png"),
  dollar: require("../assets/icons/dollar.png"),
  magnifyer: require("../assets/icons/magnifier.png"),
  user1: require("../assets/icons/user1.png"),
  bellOutline: require("../assets/icons/bellOutline.png"),
  rightArrow: require("../assets/icons/right-arrow.png"),
  phone: require("../assets/icons/phone-call.png"),
  service: require("../assets/icons/public-service.png"),
  question: require("../assets/icons/question.png"),
  handShake: require("../assets/icons/handshake.png"),
  email: require("../assets/icons/mail.png"),
};

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
};
