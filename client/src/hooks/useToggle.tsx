import { useState } from "react"


const useToggle = (defaultValue: any) => {
    const [value, setValue] = useState(defaultValue);

    const toggleValue = (value: any) => {
        setValue((currValue: any) => typeof value === "boolean" ? value : !currValue)
    }
    return [value, toggleValue];
}

export default useToggle


// Example:
// const [value, toggleValue] = useToggle(false);
// <button onClick={() => toggleValue(false)}>Open Modal</button>