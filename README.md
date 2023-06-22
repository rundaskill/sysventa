### Example
https://sysventa-e6f05.web.app/
### Installation
```sh
git clone https://github.com/rundaskill/sysventa.git
cd sysventa
npm i
npm run start
```
### Notes
Como se esta utilizando una cuenta de prueba de powerbi toca generar un token y tiene un vencimiento de 1 hora el sistema valida si el token esta vencido o no donde muestra un mensaje que token vencido contactar el administrador. para actualizar el token hay que dirigirnos al directorio  cd src/environments/  y modificamos el archivo environment.ts el campo accessToken 

