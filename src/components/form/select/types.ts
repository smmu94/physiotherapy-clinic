import { ReactNode } from "react";

export type Option = {
    icon?: ReactNode;
    value: string | number;
    label: string;
}

export type SelectProps = {
    options: Option[];
    value?: Option | null;
    onChange?: (option: Option | null) => void;
    placeholder?: string;
    isSearchable?: boolean;
    isClearable?: boolean;
    isDisabled?: boolean;
    name?: string;
}
