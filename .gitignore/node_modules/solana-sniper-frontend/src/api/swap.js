// frontend/src/api/swap.js

import axios from "axios";

const JUP_SWAP = "https://quote-api.jup.ag/v6/swap";

export async function buildSwapTx({
  inputMint,
  outputMint,
  amount,
  slippageBps,
  userPublicKey
}) {
  const { data } = await axios.post(JUP_SWAP, {
    inputMint,
    outputMint,
    amount,
    slippageBps,
    userPublicKey,
    wrapAndUnwrapSol: true,
    dynamicComputeUnitLimit: true,
    prioritizationFeeLamports: "auto"
  });

  return data;
}
