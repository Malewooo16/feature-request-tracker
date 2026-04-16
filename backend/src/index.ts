
import express from 'express';
import cors from 'cors';
import featureRoutes from './features/routes';


const app = express();
const PORT = process.env.PORT || 3300;


app.use(express.json()); 

app.use(cors()); 

app.use('/api/features', featureRoutes);

// --- Health Check ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📂 Features API: http://localhost:${PORT}/api/features`);
});