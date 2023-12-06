// main.js (Electron Main Process)
const electron = require('electron');
const { app, BrowserWindow } = electron;
const ipcMain = electron.ipcMain;
const fs = require('fs').promises; // Use fs promises for async operations
const path = require('path');
const XLSX = require('xlsx');

function saveToExcel(data, filePath) {
  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();

  // Convertir los datos a una hoja de trabajo
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Añadir la hoja de trabajo al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

  // Escribir el libro de trabajo en un archivo
  XLSX.writeFile(workbook, filePath);
}

// Handler for 'save-data' IPC event
ipcMain.handle('save-data', async (event, data) => {
  try {
    // Convert the data to a JSON string
    const dataString = JSON.stringify(data);

    // Get the path to the file where data will be saved
    const filePath = getFilePath();

    // Check if the file exists, if not, create it
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
    }

    // Save the data asynchronously
    await saveData(filePath, dataString);

    // Optionally, send a response back to the renderer process
    // event.sender.send('data-saved', 'Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    // Handle the error appropriately
    // event.sender.send('data-save-error', error.message);
  }
});

// Get the file path for saving data
function getFilePath() {
  return path.join(app.getPath('userData'), 'data.json');
}

// Save data to a file
async function saveData(filePath, dataString) {
  await fs.writeFile(filePath, dataString);
}

// ipcMain handler for 'retrieve-data'
ipcMain.handle('retrieve-data', async (event) => {
  try {
    // Get the path to the file where data is saved
    const filePath = getFilePath();

    // Read the data asynchronously
    const dataString = await readData(filePath);

    // Convert the JSON string to an object
    const data = JSON.parse(dataString);

    // Return the data
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    // Handle the error appropriately
    // You can return a default value or an error message
    // return { error: error.message };
  }
});

// Function to read data from a file
async function readData(filePath) {
  return await fs.readFile(filePath, 'utf8');
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: false,
    }
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('index.html');
}

app.commandLine.appendSwitch('log-level', 'error');
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});