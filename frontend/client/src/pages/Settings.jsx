import React from "react";

export function Settings() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Configuración</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="w-full bg-blue-600 text-white p-5 rounded-2xl shadow-md hover:bg-blue-700 active:scale-95 transition cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => alert("Funcionalidad para cambiar nombre de tienda")}
        >
          Cambiar Nombre de Tienda
        </button>

        <button
          className="w-full bg-red-600 text-white p-5 rounded-2xl shadow-md hover:bg-red-700 active:scale-95 transition cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-300"
          onClick={() => alert("Funcionalidad para definir stock mínimo")}
        >
          Definir Stock Mínimo
        </button>

        <button
          className="w-full bg-green-600 text-white p-5 rounded-2xl shadow-md hover:bg-green-700 active:scale-95 transition cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-300"
          onClick={() => alert("Descargando respaldo de base de datos...")}
        >
          Descargar Respaldo de Base de Datos
        </button>

        <button
          className="w-full bg-gray-800 text-white p-5 rounded-2xl shadow-md hover:bg-gray-900 active:scale-95 transition cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-400"
          onClick={() => alert("Tema cambiado (funcionalidad pendiente)")}
        >
          Cambiar Tema (Oscuro/Claro)
        </button>
      </div>
    </div>
  );
}
