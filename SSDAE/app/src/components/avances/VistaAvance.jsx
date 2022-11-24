import React, { useLayoutEffect } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { EditarAvance } from './EditarAvance';
import { SubirAvance } from './SubirAvance';
import { useApi } from '../../hooks/useApi'

export const VistaAvance = ({ tesis, avances, setBandera, bandera }) => {

    const [editar, setEditar] = useState(false);
    const [changeFile, setChangeFile] = useState();
    const [oldName, setOldName] = useState()
    const [dowloadPath, setDowloadPath] = useState('Diego');
    const [file, setFile] = useState();
    const api = useApi();

    useEffect(() => {
        avances.forEach(avance => {
            if (avance.revisado == 'sin revisar') {
                setDowloadPath('/public/avances/' + avance.doc)
                setEditar(true)
                setOldName(avance.doc)
            }
        });
    }, [, changeFile])

    useEffect(() => {
        if (file != null) {
            sendFile()
        }
    }, [file])

    useEffect(() => {
        if (changeFile != null) {
            console.log('Cambio de archivo')
            changeFileFunction()
        }
    }, [changeFile])

    const changeFileFunction = async (e) => {
        var formData = new FormData();
        formData.append("file", changeFile);
        formData.append("oldName", oldName);
        let url = "http:///localhost:3000/avances/changeFile";
        let res = await api.request(url, "POST", formData, true);

        if (res.mensaje == 'Archivo guardado') {
            console.log('Archivo guardado')
            console.log(res)
            setDowloadPath('/public/avances/' + res.docName)
            setOldName(res.docName)


            alert('Se ha guardado el nuevo archivo')
        } else {
            alert('Solo archivos del tipo zip o rar')
        }
    }

    const sendFile = async (e) => {
        var formData = new FormData();

        formData.append("file", file);
        formData.append("numeroAvance", avances.length + 1);
        formData.append("idTesis", tesis[0].id_tesis);

        let url = "http:///localhost:3000/avances/saveFile";

        let res = await api.request(url, "POST", formData, true);

        if (res.mensaje == 'Archivo guardado') {
            console.log('Archivo guardado')
            console.log(res)

            setDowloadPath('/public/avances/' + res.avances.doc)
            setOldName(res.avances.doc)
            setEditar(true)
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
                {editar ? <EditarAvance dowloadPath={dowloadPath} setChangeFile={setChangeFile} setBandera={setBandera} bandera={bandera} /> : <SubirAvance setFile={setFile} />}
            </div>
        </div>
    )
}
