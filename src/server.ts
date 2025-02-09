import { server } from './index'

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});