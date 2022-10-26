import React from 'react'
import { Children } from 'react'

export const Ventana = ({setVisible, componente}) => {

    const exit = () => {
        
        setVisible(false)

    }
    return (
        <div className="window-notice" id="window-notice">
            <div className="content">
                <button className='exit' onClick={exit}>X</button>

                    {componente}

             
            </div>
        </div>
    )
}
