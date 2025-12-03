"use client";

import ReactSelect, { StylesConfig, components, OptionProps, SingleValueProps } from "react-select";
import type { Option, SelectProps } from "./types";

const customStyles: StylesConfig<Option, false> = {
  control: (base) => ({
    ...base,
    borderColor: "#e5e7eb",
    borderRadius: "0.5rem",
    minHeight: "2.75rem",
    backgroundColor: "#ffffff",
    border: "2px solid #e5e7eb",
    boxShadow: "none",
    cursor: "pointer",
    fontFamily: "var(--font-poppins)",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#429993",
    },
    "&:focus": {
      borderColor: "#429993",
      boxShadow: "0 0 0 2px rgba(66, 153, 147, 0.1)",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#429993" : state.isFocused ? "#f3f4f6" : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#171e1f",
    cursor: "pointer",
    padding: "0.75rem 1rem",
    fontFamily: "var(--font-poppins)",
    fontSize: "1rem",
    transition: "background-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    "&:hover": {
      backgroundColor: state.isSelected ? "#429993" : "#f3f4f6",
    },
  }),
  input: (base) => ({
    ...base,
    fontFamily: "var(--font-poppins)",
    fontSize: "1rem",
    color: "#171e1f",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    fontFamily: "var(--font-poppins)",
    fontSize: "1rem",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#171e1f",
    fontFamily: "var(--font-poppins)",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    borderRadius: "0.5rem",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 50,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#429993",
    padding: "0.5rem",
    "&:hover": {
      color: "#26484A",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "#429993",
    padding: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      color: "#26484A",
    },
  }),
};

const OptionComponent = (props: OptionProps<Option, false>) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {props.data.icon && <span>{props.data.icon}</span>}
      <span>{props.data.label}</span>
    </div>
  </components.Option>
);

const SingleValueComponent = (props: SingleValueProps<Option, false>) => (
  <components.SingleValue {...props}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {props.data.icon && <span>{props.data.icon}</span>}
      <div>{props.data.label}</div>
    </div>
  </components.SingleValue>
);

export default function Select({
  options,
  value = null,
  onChange,
  placeholder = "Select...",
  isSearchable = false,
  isClearable = false,
  isDisabled = false,
  name,
}: SelectProps) {
  return (
    <ReactSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      name={name}
      styles={customStyles}
      classNamePrefix="select"
      components={{ Option: OptionComponent, SingleValue: SingleValueComponent }}
    />
  );
}
