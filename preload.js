window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    const { ipcRenderer } = require('electron');

    document.getElementById('save').addEventListener('click', function () {
        // Obtener los valores de los campos de entrada de texto
        const waterMeter401 = document.getElementById('water-meter401').value;
        const waterMeter402 = document.getElementById('water-meter402').value;
        const waterMeter201 = document.getElementById('water-meter201').value;
        const waterMeter301 = document.getElementById('water-meter301').value;
        const waterMeter302 = document.getElementById('water-meter302').value;
        const waterMeter2 = document.getElementById('water-meter2').value;
        const electricityMeter201 = document.getElementById('electricity-meter201').value;
        const electricityMeter2 = document.getElementById('electricity-meter2').value;
        const electricityMeter3 = document.getElementById('electricity-meter3').value;
        const electricityMeter4 = document.getElementById('electricity-meter4').value;
        const electricityMeter401 = document.getElementById('electricity-meter401').value;
        const electricityMeter402 = document.getElementById('electricity-meter402').value;
        const gasMeter2 = document.getElementById('gas-meter2').value;
        const gasMeter34 = document.getElementById('gas-meter34').value;
        const gasMeter401 = document.getElementById('gas-meter401').value;
        const gasMeter402 = document.getElementById('gas-meter402').value;

        // Datos a guardar
        const data = {
            waterMeter401: waterMeter401,
            waterMeter402: waterMeter402,
            waterMeter201: waterMeter201,
            waterMeter301: waterMeter301,
            waterMeter302: waterMeter302,
            waterMeter2: waterMeter2,
            electricityMeter201: electricityMeter201,
            electricityMeter2: electricityMeter2,
            electricityMeter3: electricityMeter3,
            electricityMeter4: electricityMeter4,
            electricityMeter401: electricityMeter401,
            electricityMeter402: electricityMeter402,
            gasMeter2: gasMeter2,
            gasMeter34: gasMeter34,
            gasMeter401: gasMeter401,
            gasMeter402: gasMeter402
        };

        // Enviar los datos al proceso principal para guardarlos
        ipcRenderer.invoke('save-data', data);
    });

    document.getElementById('calculate').addEventListener('click', async function () {
        // Obtener los valores de los campos de entrada de texto
        let data = await ipcRenderer.invoke('retrieve-data');
        let waterMeter401 = document.getElementById('water-meter401').value;
        let waterMeter402 = document.getElementById('water-meter402').value;
        let waterMeter201 = document.getElementById('water-meter201').value;
        let waterMeter301 = document.getElementById('water-meter301').value;
        let waterMeter302 = document.getElementById('water-meter302').value;
        let waterMeter2 = document.getElementById('water-meter2').value;
        let electricityMeter201 = document.getElementById('electricity-meter201').value;
        let electricityMeter2 = document.getElementById('electricity-meter2').value;
        let electricityMeter3 = document.getElementById('electricity-meter3').value;
        let electricityMeter4 = document.getElementById('electricity-meter4').value;
        let electricityMeter401 = document.getElementById('electricity-meter401').value;
        let electricityMeter402 = document.getElementById('electricity-meter402').value;
        let gasMeter2 = document.getElementById('gas-meter2').value;
        let gasMeter34 = document.getElementById('gas-meter34').value;
        let gasMeter401 = document.getElementById('gas-meter401').value;
        let gasMeter402 = document.getElementById('gas-meter402').value;
        let costWaterMeter = document.getElementById('cost-water-meter').value;
        let costElectricityMeter = document.getElementById('cost-electricity-meter').value;
        let costGasMeter = document.getElementById('cost-gas-meter').value;
        let costWaterMeterFijo = document.getElementById('cost-water-meter-fijo').value;
        let costGasMeterFijo = document.getElementById('cost-gas-meter-fijo').value;
        electricityMeter2 = Number(electricityMeter2);
        electricityMeter201 = Number(electricityMeter201);
        electricityMeter3 = Number(electricityMeter3);
        electricityMeter4 = Number(electricityMeter4);
        electricityMeter401 = Number(electricityMeter401);
        electricityMeter402 = Number(electricityMeter402);
        waterMeter2 = Number(waterMeter2);
        waterMeter201 = Number(waterMeter201);
        waterMeter301 = Number(waterMeter301);
        waterMeter302 = Number(waterMeter302);
        waterMeter401 = Number(waterMeter401);
        waterMeter402 = Number(waterMeter402);
        gasMeter2 = Number(gasMeter2);
        gasMeter34 = Number(gasMeter34);
        gasMeter401 = Number(gasMeter401);
        gasMeter402 = Number(gasMeter402);

        costWaterMeter = Number(costWaterMeter);
        costWaterMeterFijo = Number(costWaterMeterFijo);
        costElectricityMeter = Number(costElectricityMeter);
        costGasMeter = Number(costGasMeter);
        costGasMeterFijo = Number(costGasMeterFijo);


        // ----- Apto 401------

        // Agua 401
        let consumoWater401 = waterMeter401 - Number(data.waterMeter401);
        let costWater401 = costWaterMeter * consumoWater401 + costWaterMeterFijo;
        let formattedWater401Cost = costWater401.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        // Energía 401
        let consumoElectricity401 = electricityMeter401 - Number(data.electricityMeter401);
        let costElectricity401 = costElectricityMeter * consumoElectricity401;
        let formattedElectricity401Cost = costElectricity401.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        // Gas 401
        let consumoGas401 = gasMeter401 - Number(data.gasMeter401);
        let costGas401 = costGasMeter * consumoGas401 + costGasMeterFijo;
        let formattedGas401Cost = costGas401.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        document.getElementById('cost-water401').textContent = "Agua " + consumoWater401 + "mts " + formattedWater401Cost;
        document.getElementById('cost-electricity401').textContent = "Energía " + consumoElectricity401 + "kwh " + formattedElectricity401Cost;
        document.getElementById('cost-gas401').textContent = "Gas " + consumoGas401 + "mts " + formattedGas401Cost;

        // ----- Apto 402------

        // Agua 402
        let consumoWater402 = waterMeter402 - Number(data.waterMeter402);
        let costWater402 = costWaterMeter * consumoWater402 + costWaterMeterFijo;
        let formattedWater402Cost = costWater402.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        // Energía 402
        let consumoElectricity402 = electricityMeter402 - Number(data.electricityMeter402);
        let costElectricity402 = costElectricityMeter * consumoElectricity402;
        let formattedElectricity402Cost = costElectricity402.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        // Gas 402
        let consumoGas402 = gasMeter402 - Number(data.gasMeter402);
        let costGas402 = costGasMeter * consumoGas402 + costGasMeterFijo;
        let formattedGas402Cost = costGas402.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        document.getElementById('cost-water402').textContent = "Agua " + consumoWater402 + " mts " + formattedWater402Cost;
        document.getElementById('cost-electricity402').textContent = "Energía " + consumoElectricity402 + " kwh " + formattedElectricity402Cost;
        document.getElementById('cost-gas402').textContent = "Gas " + consumoGas402 + " mts " + formattedGas402Cost;

        // ----- Apto 302------

        // Agua 302
        let consumoWater302 = waterMeter302 - Number(data.waterMeter302);
        let costWater302 = costWaterMeter * consumoWater302 + costWaterMeterFijo;
        let formattedWater302Cost = costWater302.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });


        document.getElementById('cost-water302').textContent = "Agua " + consumoWater302 + " mts " + formattedWater302Cost;

        // ----- Apto 201------

        // Agua 201
        let consumoWater201 = waterMeter201 - Number(data.waterMeter201);
        let costWater201 = costWaterMeter * consumoWater201 + costWaterMeterFijo;
        let formattedWater201Cost = costWater201.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });


        // Energía 201
        let consumoElectricity201 = electricityMeter201 - Number(data.electricityMeter201);
        let costElectricity201 = costElectricityMeter * consumoElectricity201;
        let formattedElectricity201Cost = costElectricity201.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        document.getElementById('cost-water201').textContent = "Agua " + consumoWater201 + " mts " + formattedWater201Cost;
        document.getElementById('cost-electricity201').textContent = "Energía " + consumoElectricity201 + "kwh " + formattedElectricity201Cost;

        // ----- Apto 202------

        // Agua 202
        let consumoWater202 = (waterMeter2 - Number(data.waterMeter2)) - consumoWater201;
        let costWater202 = costWaterMeter * consumoWater202 + costWaterMeterFijo;
        let formattedWater202Cost = costWater202.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        if (consumoWater202 > 5) {
            document.getElementById('cost-water202').textContent = "Agua " + consumoWater202 + " mts " + formattedWater202Cost;
        } else {
            document.getElementById('cost-water202').textContent = "Agua " + consumoWater202 + " mts (" + formattedWater202Cost + ") pero no se cobra por ser menos de 5 mts";
        }
    });

    document.getElementById('retrieve').addEventListener('click', async function () {

        const data = await ipcRenderer.invoke('retrieve-data');
        document.getElementById('water-meter401-last').textContent = "Agua Apto 401, última lectura: " + data.waterMeter401;
        document.getElementById('water-meter402-last').textContent = "Agua Apto 402, última lectura: " + data.waterMeter402;
        document.getElementById('electricity-meter402-last').textContent = "Electricidad Apto 402, última lectura: " + data.electricityMeter402;
        document.getElementById('electricity-meter401-last').textContent = "Electricidad Apto 401, última lectura: " + data.electricityMeter401;
        document.getElementById('gas-meter401-last').textContent = "Gas Apto 401, última lectura: " + data.gasMeter401;
        document.getElementById('gas-meter402-last').textContent = "Gas Apto 402, última lectura: " + data.gasMeter402;
        document.getElementById('water-meter302-last').textContent = "Agua Apto 302, última lectura: " + data.waterMeter302;
        document.getElementById('water-meter201-last').textContent = "Agua Apto 201, última lectura: " + data.waterMeter201;
        document.getElementById('gas-meter2-last').textContent = "Gas Piso 2, última lectura: " + data.gasMeter2;
        document.getElementById('gas-meter34-last').textContent = "Gas Pisos 3 y 4, última lectura: " + data.gasMeter34;
        document.getElementById('water-meter2-last').textContent = "Agua Piso 2, última lectura: " + data.waterMeter2;
        document.getElementById('electricity-meter201-last').textContent = "Electricidad Apto 201, última lectura: " + data.electricityMeter201;
        document.getElementById('electricity-meter4-last').textContent = "Electricidad Piso 4, última lectura: " + data.electricityMeter4;
        document.getElementById('electricity-meter3-last').textContent = "Electricidad Piso 3, última lectura: " + data.electricityMeter3;
        document.getElementById('electricity-meter2-last').textContent = "Electricidad Piso 2, última lectura: " + data.electricityMeter2;
        document.getElementById('water-meter301-last').textContent = "Agua Apto 301, última lectura: " + data.waterMeter301;
        console.log(data);
    });

})
