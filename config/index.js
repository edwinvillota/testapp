const config = {
    REQUIRE_PHOTOS: [
        { name: 'Acta', code: 1, require: true, capture: true },
        { name: 'Medidor', code: 2, require: true, capture: true},
        { name: 'Fachada', code: 3, require: true, capture: true },
        { name: 'Puesta a tierra', code: 4, require: false, capture: true },
        { name: 'Acometida', code: 5, require: false, capture: true },
        { name: 'Lectura Activa', code: 6, require: true, capture: false },
        { name: 'Lectura Reactiva', code: 7, require: true, capture: false },
        { name: 'Sello Tapa Principal 1', code: 8, require: true, capture: true },
        { name: 'Sello Tapa Principal 2', code: 9, require: true, capture: true },
        { name: 'Sello Tapa Bornera 1', code: 10, require: true, capture: true },
        { name: 'Sello Tapa Bornera 2', code: 11, require: false, capture: true },
        { name: 'Sello Caja', code: 12, require: true, capture: true },
        { name: 'Sticker Cedenar', code: 13, require: true, capture: true },
        { name: 'Medidor Calibrado', code: 14, require: true, capture: true },
        { name: 'Medidor en Caja', code: 15, require: true, capture: true },
        { name: 'Altura de Medidor', code: 16, require: true, capture: true },
        { name: 'Medidor Instalado', code: 17, require: true, capture: true },
        { name: 'Cedula 1', code: 18, require: false, capture: true },
        { name: 'Cedula 2', code: 19, require: false, capture: true },
        { name: 'Fachada Despues', code: 20, require: true, capture: true },
        { name: 'Prueba de fuga', code: 21, require: true, capture: true }
    ],
    MAIN_FOLDER: 'FotosMEC'
}


 export default config



