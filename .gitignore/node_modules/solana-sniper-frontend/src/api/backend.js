// frontend/src/api/backend.js

import axios from "axios";

// إذا كنت تعمل محلياً:
const API = "http://localhost:4000";

const backend = axios.create({
  baseURL: API,
  timeout: 15000
});

export default backend;
