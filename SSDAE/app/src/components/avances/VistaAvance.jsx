import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { EditarAvance } from './EditarAvance';
import { SubirAvance } from './SubirAvance';
import { useApi } from '../../hooks/useApi'


export const VistaAvance = ({ tesis, avances }) => {

    const [editar, setEditar] = useState(false);
    const [file, setFile] = useState();
    const api = useApi();



    useEffect(() => {
        console.log('Tesis')
        console.log(tesis)
        console.log('Avances')
        console.log(avances)

        avances.forEach(avance => {
            if (avance.revisado == 'sin revisar') {
                setEditar(true)
            }
        });

    }, [])

    useEffect(() => {
        if(file != null){
            sendFile()
        }
    }, [file])

    const sendFile = async(e) => {
        var formData = new FormData();

        formData.append("file", file);
        formData.append("numeroAvance", avances.length + 1);
        formData.append("idTesis", tesis[0].id_tesis);

        let url = "http:///localhost:3000/avances/saveFile";

        let res = await api.request(url, "POST", formData, true);

        if (res.mensaje == 'Archivo guardado') {
            console.log('Archivo guardado')
        } else {
          alert('Solo archivos del tipo zip o rar')
        }
    }


    return (
        <div className="login-page">
            <div className="form">
                <div className='encabezado-avances'>
                    <p className='centrar'>Buzon para subir avances</p>
                    <p>Estatus: ACTIVO</p>
                    <p>Tema: {tesis[0].tema}</p>
                </div>

                {editar ? <EditarAvance />: <SubirAvance setFile={setFile} tesis={tesis} avances={avances} />}

            </div>
        </div>
    )
}
