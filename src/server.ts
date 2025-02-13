import { server } from './index'
import os from 'os';

const PORT = process.env.PORT || 8080;
const LOCAL_IP = process.env.LOCAL_IP

// Get local network IP (needed for React Native)
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface || []) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  return 'localhost'; // Fallback
};

server.listen(PORT, () => {
  console.log(`Server running at:`);
  console.log(`➡ Local:   http://localhost:${PORT}`);
  console.log(`➡ Network: http://${LOCAL_IP}:${PORT}`);});