import React, { useRef } from 'react'

export const SubirAvance = ({setFile}) => {
    const saveFile = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">
                Subir archivo
            </label>

            <input onChange={saveFile} name='file' id="file-upload" type="file" />

            <p style={{ display: 'none' }} ></p>
        </div>
    )
}
