del smurf_firefox.xpi
del smurf_chrome.zip
"C:\Program Files\7-Zip\7z.exe" a -r smurf_chrome.zip -w .\chrome\manifest.json script.js smurf.png
"C:\Program Files\7-Zip\7z.exe" a -r smurf_firefox.zip -w .\firefox\manifest.json script.js smurf.png
rename smurf_firefox.zip smurf_firefox.xpi