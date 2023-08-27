import React, { useState } from 'react';
import './index.css';

interface CheckboxProps {
    id: string;
    label: string;
    name: string;
    checked: boolean;
    index: number;
    onChange: (id: string, checked: boolean, index: number) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, name, checked, onChange, index }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.currentTarget.checked;
        setIsChecked(newChecked);
        onChange(id, newChecked, parseInt(event.currentTarget.dataset.index!));
    };

    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={isChecked}
                onChange={handleCheckboxChange}
                data-index={index} // Use data-index to pass the index
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Checkbox;
