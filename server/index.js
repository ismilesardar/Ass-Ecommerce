/**
 * Date: 12/06/2023
 * Subject: E-cummers Project server running index.js
 * Auth: Ismile Sardar
 */
const app = require("./app");
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server runnig at http://localhost:${PORT}`);
});