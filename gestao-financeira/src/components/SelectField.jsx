import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

export default function SelectField({ onChange, options, placeholder, value }) {
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((current) => !current)}
        style={[styles.trigger, open && styles.triggerOpen]}
      >
        <Text
          numberOfLines={1}
          style={[styles.triggerText, !selectedOption && styles.placeholder]}
        >
          {selectedOption?.label ?? placeholder}
        </Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <ScrollView nestedScrollEnabled style={styles.options}>
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <TouchableOpacity
                  activeOpacity={0.75}
                  key={option.value}
                  onPress={() => handleSelect(option.value)}
                  style={[styles.option, selected && styles.selectedOption]}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.optionText,
                      selected && styles.selectedOptionText
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6
  },
  trigger: {
    alignItems: "center",
    backgroundColor: colors.primaryContrast,
    borderColor: "#D6D0DA",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    height: 44,
    justifyContent: "space-between",
    paddingHorizontal: 14
  },
  triggerOpen: {
    borderColor: colors.primary
  },
  triggerText: {
    color: colors.primaryText,
    flex: 1,
    fontSize: 15
  },
  placeholder: {
    color: colors.secondaryText
  },
  arrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 10
  },
  dropdown: {
    backgroundColor: colors.primaryContrast,
    borderColor: "#D6D0DA",
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden"
  },
  options: {
    maxHeight: 180
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  selectedOption: {
    backgroundColor: "#F5E8FA"
  },
  optionText: {
    color: colors.primaryText,
    fontSize: 15
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: "800"
  }
});
