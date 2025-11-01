const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('get-version'),

  onCopyDisplay: callback => {
    ipcRenderer.on('copy-display', callback);
  },

  onPasteToDisplay: callback => {
    ipcRenderer.on('paste-to-display', callback);
  },

  onClearCalculator: callback => {
    ipcRenderer.on('clear-calculator', callback);
  },

  removeAllListeners: channel => {
    ipcRenderer.removeAllListeners(channel);
  },
});
