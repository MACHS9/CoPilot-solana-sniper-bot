// frontend/src/api/jito.js

import backend from "./backend";

export async function sendBundle(signedTxsBase64) {
  const { data } = await backend.post("/jito/send", {
    signedTxs: signedTxsBase64
  });
  return data;
}

export async function simulateBundle(signedTxsBase64) {
  const { data } = await backend.post("/jito/simulate", {
    signedTxs: signedTxsBase64
  });
  return data;
}
