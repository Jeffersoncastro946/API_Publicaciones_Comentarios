import xss from "xss";

export const sanitize = (texto) => xss(texto);
