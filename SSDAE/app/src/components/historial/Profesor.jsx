import React from 'react'

export const Profesor = ({tesisByMaestroState}) => {

  return (
    tesisByMaestroState.map((tesis,key) =>{

        return(

                <div key={tesis.id_tesis} className="historial-container">
                    <article className="articulo-item">
                    <section className="header-card">
                        <div className="datos-alumno">
                        <h2><span>Tema: </span>{tesis.tesis.tema}</h2>
                        {/* <h2><span>Director:  </span>{tesis.profesores.usuarios.nombre} {tesis.profesores.usuarios.ap_p} {tesis.profesores.usuarios.ap_m }</h2> */}
                        <h2><span>Nombre del alumno:  </span>{tesis.tesis.alumnos.usuarios.nombre}</h2>
                        </div>
                    </section>

                    <section className="revisiones">
                        <div className="revision-bar">
                        <div className="links-bar">
                            <h3>1</h3>
                            <ul>
                            <li>
                                <a>Revision</a>
                            </li>
                            <li>
                                <a>Documento</a>
                            </li>
                            <li>
                                <a>calificacion</a>
                            </li>
                            </ul>
                        </div>
                        <button className="mas-info" onClick={() => setVisible(true)}>
                            click
                        </button>
                        </div>
                    </section>
                    </article>
                </div>
            
        )
    })
  )
}
