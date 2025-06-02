// export const SERVER_URL = import.meta.env.VITE_SERVER_URL

const MODE = import.meta.env.MODE;

export const DEV_SERVER_URL = `http://localhost:4000`;
const PROD_SERVER_URL = ``;
console.log(MODE);
export const SERVER_URL =
    MODE === "development" ? `${DEV_SERVER_URL}` : `${PROD_SERVER_URL}`;
