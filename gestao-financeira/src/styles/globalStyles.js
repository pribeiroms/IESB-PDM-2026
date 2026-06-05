import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 20
  },
  content: {
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: colors.primaryContrast,
    borderColor: colors.secondaryText,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.primaryText,
    flexGrow: 1,
    fontSize: 16,
    height: 40,
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        outlineStyle: "none"
      }
    })
  },
  inputLabel: {
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: 4
  },
  line: {
    backgroundColor: colors.secondaryText,
    height: 1,
    opacity: 0.5,
    marginBottom: 4
  },
  primaryText: {
    fontSize: 16,
    color: colors.primaryText
  },
  secondaryText: {
    fontSize: 12,
    color: colors.secondaryText
  },
  positiveText: {
    fontSize: 16,
    color: colors.positiveText
  },
  negativeText: {
    fontSize: 16,
    color: colors.negativeText
  },
  linkText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "800"
  }
});
