import React from 'react'
import { useState } from 'react';

export const MaestroForm = () => {

    const [selected, setSelected] = useState('');

    const handleChange = event => {
        setSelected(event.target.value);
    };

    return (
        <select name="interno_externo" value={selected} onChange={handleChange}>
            <option disabled={true} value="">
                Interno o externo...
            </option>
            <option value="interno">Interno</option>
            <option value="externo">Externo</option>
        </select>
    )
}
