import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import config from './config/config';
import authRoutes from './routes/authRoutes';
import authMiddleware from './middlewares/authMiddleware';
import turmaRoutes from './routes/turmaRoutes';
import materialRoutes from './routes/materialRoutes';
import disciplinaRoutes from './routes/disciplinaRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// rotas sem autenticação
app.use('/auth', authRoutes);

// rotas autenticadas
app.use(authMiddleware);
app.use('/user', userRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/material', materialRoutes);
app.use('/turma', turmaRoutes);

app.use(errorMiddleware);

app.listen(config.serverPort);
