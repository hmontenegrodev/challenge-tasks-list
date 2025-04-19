"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./interfaces/routes/auth.routes"));
const task_routes_1 = __importDefault(require("./interfaces/routes/task.routes"));
// Importar el archivo de configuración de Firebase
dotenv_1.default.config();
// Inicializar la aplicación Express
exports.app = (0, express_1.default)();
// Configurar Cors y body-parser
// Permitir solicitudes desde el frontend
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.json());
// Configurar las rutas
exports.app.use('/api/auth', auth_routes_1.default);
exports.app.use('/api/tasks', task_routes_1.default);
// Ruta de prueba para verificar que la API está funcionando
exports.app.get('/', (_req, res) => {
    res.send('API lista para usar!!!');
});
