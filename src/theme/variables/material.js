import color from "color";

import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = "material";
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

export default {
  platformStyle,
  platform,

  // Android
  androidRipple: true,
  androidRippleColor: "rgba(256, 256, 256, 0.3)",
  androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
  btnUppercaseAndroidText: true,

  // Badge
  badgeBg: "#ED1727",
  badgeColor: "#fff",
  badgePadding: 0,

  // Button
  btnFontFamily: "Roboto",
  btnDisabledBg: "#b5b5b5",
  buttonPadding: 6,
  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: "#fff",
  cardBorderColor: "#ccc",

  // CheckBox
  CheckboxRadius: 0,
  CheckboxBorderWidth: 2,
  CheckboxPaddingLeft: 2,
  CheckboxPaddingBottom: 2,
  CheckboxIconSize: 20,
  CheckboxIconMarginTop: 1,
  CheckboxFontSize: 20,
  DefaultFontSize: 20,
  checkboxBgColor: "#00B984",
  checkboxSize: 20,
  checkboxTickColor: "#fff",

  // Color
  brandPrimary: "#C20013",
  brandInfo: "#62B1F6",
  brandSuccess: "#5cb85c",
  brandDanger: "#D10020",
  brandWarning: "#f0ad4e",
  brandDark: "#000",
  brandLight: "#f4f4f4",

  // Font
  fontFamily: "Roboto",
  fontSizeBase: 18,
  get fontSizeH1() {
    return this.fontSizeBase * 3.0;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 2.8;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 2.6;
  },

  // Footer
  footerHeight: isIphoneX ? 89 : 64,
  footerDefaultBg: "#D10020",
  footerPaddingBottom: isIphoneX ? 34 : 0,

  // FooterTab
  tabBarTextColor: "#bfc6ea",
  tabBarTextSize: 11,
  activeTab: "#fff",
  sTabBarActiveTextColor: "#C20013",
  tabBarActiveTextColor: "#fff",
  tabActiveBgColor: "#D10020",

  // Header
  toolbarBtnColor: "#fff",
  toolbarDefaultBg: "#D10020",
  toolbarHeight: 70,
  toolbarSearchIconSize: 24,
  toolbarInputColor: "#fff",
  searchBarHeight: platform === "ios" ? 50 : 40,
  searchBarInputHeight: platform === "ios" ? 40 : 30,
  toolbarBtnTextColor: "#fff",
  toolbarDefaultBorder: "#D10020",
  iosStatusbar: "light-content",
  get statusBarColor() {
    return (
      { statusBarColor: '#C20013' }
    )
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex();
  },

  // Icon
  iconFamily: "Ionicons",
  iconFontSize: 20,
  iconHeaderSize: 20,

  // InputGroup
  inputFontSize: 20,
  inputBorderColor: "#b0b0b0",
  inputSuccessBorderColor: "#2b8339",
  inputErrorBorderColor: "#ed2f2f",
  inputHeightBase: 70,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return "#969696";
  },

  // Line Height
  btnLineHeight: 70,
  lineHeightH1: 56,
  lineHeightH2: 52,
  lineHeightH3: 48,
  lineHeight: 24,

  // List
  listBg: "transparent",
  listBorderColor: "#c9c9c9",
  listDividerBg: "#f4f4f4",
  listBtnUnderlayColor: "#DDD",
  listItemPadding: 12,
  listNoteColor: "#808080",
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: "#E4202D",
  inverseProgressColor: "#1A191B",

  // Radio Button
  radioBtnSize: 23,
  radioSelectedColorAndroid: "#D10020",
  radioBtnLineHeight: 24,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  segmentBackgroundColor: "#D10020",
  segmentActiveBackgroundColor: "#fff",
  segmentTextColor: "#fff",
  segmentActiveTextColor: "#D10020",
  segmentBorderColor: "#fff",
  segmentBorderColorMain: "#D10020",

  // Spinner
  defaultSpinnerColor: "#45D56E",
  inverseSpinnerColor: "#1A191B",

  // Tab
  tabDefaultBg: "#D10020",
  topTabBarTextColor: "#b3c7f9",
  topTabBarActiveTextColor: "#fff",
  topTabBarBorderColor: "#fff",
  topTabBarActiveBorderColor: "#fff",

  // Tabs
  tabBgColor: "#F8F8F8",
  tabFontSize: 15,

  // Text
  textColor: "#000",
  inverseTextColor: "#fff",
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: "Roboto",
  titleFontSize: 19,
  subTitleFontSize: 14,
  subtitleColor: "#FFF",
  titleFontColor: "#FFF",

  // Other
  borderRadiusBase: 5,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: "#414142",
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30
};
