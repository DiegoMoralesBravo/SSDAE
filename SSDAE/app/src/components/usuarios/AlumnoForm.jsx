import React from 'react'

export const AlumnoForm = () => {

  const ano = new Date().getFullYear();
  console.log(ano)

  return (
    <div>
      <label>Año ingreso</label>

      {/* <input name="fecha_ingreso" type="date" required /> */}

      <select name="ano_ingreso">
        <option>{ano}</option>
        <option>{ano - 1}</option>
        <option>{ano - 2}</option>
      </select>

      <label>Ciclo escolar</label>
      <select name="ciclo">
        <option value="a">A</option>
        <option value="b">B</option>
      </select>
    </div>

  )
}
