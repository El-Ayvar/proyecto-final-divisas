window.onload = () => {
    const divisaLista = document.querySelector('#divisa_lista');
    const listaDivisa = document.querySelector('#lista_divisa');
    const monedas_convertir = document.querySelector('#convertir');
    const listaConvertir = document.querySelector('#divisa_convertir');
    const divisaInput = document.querySelector('#divisa_input');
    const resultado = document.querySelector('#resultado');
    const searchBtn = document.querySelector('#search_btn');
    const url = 'https://api.unirateapi.com/api/rates?api_key=r9xFpPH5rQen5sRprXRrc0tcXtG92cIl5rqHHVn6uVsZXsxSb1lEpQ52qxPFFVT8&';

document.getElementById("divisa_input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("search_btn").click();
    }
})

    let tasas = {};
    let monedasArray = [];

    fetch(url)
        .then(response => response.json())
        .then(data => {
            tasas = data.rates;
            monedasArray = Object.keys(tasas).sort();
            cargarMonedas(monedasArray);
        });

    function cargarMonedas(listaMonedas) {
        listaMonedas.forEach(moneda => {
            let optionBase = document.createElement('option');
            let optionConvertir = document.createElement('option');

            optionBase.value = moneda;
            optionConvertir.value = moneda;

            listaDivisa.appendChild(optionBase);
            listaConvertir.appendChild(optionConvertir);
        });
    }

    searchBtn.addEventListener('click', mostrarResultado);

    function mostrarResultado() {
        const base = divisaLista.value.toUpperCase();
        const destino = monedas_convertir.value.toUpperCase();
        const monto = parseFloat(divisaInput.value);

        if (monedasArray.includes(base) && monedasArray.includes(destino) && monto > 0 && tasas[base] && tasas[destino]) {
            const tasaBase = tasas[base];
            const tasaDestino = tasas[destino];
            const conversion = tasaDestino / tasaBase;
            const totalConvertido = monto * conversion;

            resultado.innerHTML = `
                <p>${monto} ${base} equivale a ${totalConvertido.toFixed(4)} ${destino}</p>
            `;
        } else {
            resultado.innerHTML = '<p id="msg_error">Por favor, ingresa una cantidad válida y selecciona monedas correctas.</p>';
        }
    }
};
//function showDivisa(divisa) {
//
//    setTimeout(() => {
//        loader.classList.add('hidden');
//
//        const divisaInfo = document.querySelector("#divisa-info");
//        divisaInfo.innerHTML = "";
//
//                gifs.forEach(gif => {
//                divisaInfo.innerHTML += `
//                    <div id="box-divisa">
//                        <h2>${divisa.rates}</h2>
//                    </div>
//                `;
//                });
//    },1500);
//}
//btnSearch.addEventListener("click", searchDivisa);