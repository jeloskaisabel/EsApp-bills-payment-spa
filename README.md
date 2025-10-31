# EsApp Bills Payment - Sistema de Pago de Servicios Públicos

## Descripción del Proyecto

Aplicación web SPA (Single Page Application) desarrollada para consultar y pagar facturas de servicios públicos. Implementada como parte de una prueba técnica para la posición de Desarrollador Frontend Intermedio.

La aplicación permite a los usuarios buscar clientes por su ID, visualizar sus facturas organizadas por estado (pendientes, pagadas, vencidas), y procesar pagos de manera interactiva con actualización en tiempo real.

## Stack Tecnológico

### Frontend

- **React 18** - Biblioteca principal para la construcción de interfaces
- **TypeScript 5** - Superset tipado de JavaScript para mayor seguridad y mantenibilidad
- **Vite 7** - Build tool de nueva generación para desarrollo rápido
- **Tailwind CSS v4** - Framework CSS utility-first para diseño responsivo

### Backend Mock

- **JSON Server** - API REST completa desde archivo JSON

### Herramientas de Desarrollo

- **ESLint** - Linter para mantener código limpio y consistente
- **React Icons** - Biblioteca de iconos
- **Lucide React** - Iconos SVG optimizados

## Arquitectura de la Aplicación

### Estructura de Directorios

```
src/
├── api/
│   └── client.ts              # Cliente API con métodos HTTP
├── components/
│   ├── features/              # Componentes de funcionalidad específica
│   │   ├── BillsTable.tsx
│   │   ├── CustomerInfo.tsx
│   │   ├── CustomSearch.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PaymentModal.tsx
│   │   └── SummaryCards.tsx
│   └── ui/                    # Componentes UI reutilizables (Design System)
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── FilterTabs.tsx
│       └── Input.tsx
├── constants/
│   └── app.ts                 # Constantes globales de la aplicación
├── hooks/
│   └── useCustomerBills.ts    # Custom hook para lógica de facturas
├── pages/
│   └── HomePage.tsx           # Página principal de la aplicación
├── styles/
│   └── globals.css            # Estilos globales y fuente Poppins
├── types/
│   └── api.types.ts           # Definiciones de tipos TypeScript
├── main.tsx                   # Punto de entrada de la aplicación
└── App.css                    # Animaciones adicionales
```

### Patrones de Diseño Implementados

#### 1. Component-Based Architecture

Separación clara entre componentes de UI genéricos y componentes de funcionalidad específica.

#### 2. Custom Hooks

- `useCustomerBills`: Encapsula toda la lógica de estado y operaciones relacionadas con facturas
  - Fetch de datos del cliente
  - Procesamiento de pagos
  - Actualización optimista de la UI
  - Manejo de errores

#### 3. Atomic Design

Sistema de componentes organizados en capas:

- **Átomos**: Button, Badge, Input (componentes básicos)
- **Moléculas**: Card, FilterTabs (combinación de átomos)
- **Organismos**: BillsTable, CustomerInfo (funcionalidad completa)
- **Plantillas**: HomePage (página completa)

#### 4. Responsive Design Adaptativo

- Móvil (< 640px): Dropdown select para filtros
- Desktop (>= 640px): Pestañas horizontales
- Grid adaptativo: 1 columna en móvil, 3 columnas en desktop

## Arquitectura de Mock API

### JSON Server

La aplicación utiliza **JSON Server** para simular una API REST completa. Esta herramienta transforma un archivo JSON en un servidor RESTful con cero configuración.

#### Endpoints Disponibles

**Base URL**: `http://localhost:3000/api`

| Endpoint                 | Método | Descripción                              |
| ------------------------ | ------ | ---------------------------------------- |
| `/customers`             | GET    | Obtiene lista de clientes                |
| `/customers/:id`         | GET    | Obtiene un cliente específico            |
| `/customers/:id/summary` | GET    | Obtiene resumen del cliente con facturas |
| `/bills`                 | GET    | Obtiene lista de facturas                |
| `/bills?customerId=:id`  | GET    | Obtiene facturas de un cliente           |
| `/bills/:id`             | GET    | Obtiene una factura específica           |
| `/bills/:id`             | PATCH  | Actualiza una factura (usado para pagos) |
| `/payments`              | GET    | Obtiene lista de pagos                   |

#### Configuración del Servidor

Archivo: `vite.config.ts`

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

El proxy de Vite redirige todas las peticiones que comiencen con `/api` al servidor JSON Server en el puerto 3000.

#### Cliente API

Archivo: `src/api/client.ts`

```typescript
class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T>;

  async getCustomer(customerId: string): Promise<Customer>;
  async getCustomerSummary(customerId: string): Promise<CustomerSummary>;
  async getCustomerBills(customerId: string): Promise<Bill[]>;
  async getPendingBills(customerId: string): Promise<PendingBillsResponse>;
  async payBill(billId: string, paymentData: PaymentData): Promise<Bill>;
  async healthCheck(): Promise<HealthCheckResponse>;
}
```

#### Endpoints Personalizados

JSON Server permite endpoints personalizados a través de `routes.json`:

```json
{
  "/api/*": "/$1",
  "/customers/:id/summary": "/customers/:id?_embed=bills",
  "/customers/:id/bills/pending": "/bills?customerId=:id&status=pending"
}
```

### Estructura de Datos (db.json)

#### Entidades

##### Customer (Cliente)

```typescript
interface Customer {
  id: string; // CLI-2024-001
  fullName: string;
  email: string;
  documentType: "CI" | "NIT";
  documentNumber: string;
  address: string;
  city: string;
  department: string;
  phone: string;
  registeredAt: string; // ISO 8601
}
```

##### Bill (Factura)

```typescript
interface Bill {
  id: string; // FACT-2024-10-001
  customerId: string;
  serviceType: "electricity" | "water" | "gas" | "internet" | "mobile";
  serviceName: string;
  provider: string;
  period: string; // 2024-10
  billingMonth: string; // Octubre 2024
  issueDate: string; // ISO 8601
  dueDate: string; // ISO 8601
  amount: number;
  currency: "BOB";
  status: "pending" | "paid" | "overdue";
  consumption: string;
  accountNumber: string;
  referenceCode: string;
  barcode: string;
  paidAt?: string; // ISO 8601 (si está pagado)
  paymentMethod?: string;
  transactionId?: string;
  lateFee?: number; // Monto de mora
  daysOverdue?: number; // Días de retraso
}
```

##### Payment (Pago)

```typescript
interface Payment {
  id: string;
  billId: string;
  customerId: string;
  amount: number;
  currency: "BOB";
  paymentMethod: "qr_transfer" | "bank_transfer" | "credit_card" | "debit_card";
  bankName?: string;
  transactionId: string;
  authorizationCode?: string;
  paidAt: string; // ISO 8601
  status: "completed" | "pending" | "failed";
  receiptNumber: string;
}
```

#### Casos de Prueba en db.json

El archivo `db.json` incluye 6 clientes con diferentes escenarios:

1. **CLI-2024-001**: María Fernanda Mamani Quispe

   - 2 facturas pagadas (Octubre)
   - 2 facturas pendientes (Noviembre)
   - Caso: Usuario cumplidor con facturas recientes pendientes

2. **CLI-2024-002**: Carlos Eduardo Vargas Mendoza

   - 2 facturas vencidas con mora (Octubre)
   - 1 factura pendiente (Noviembre)
   - 1 factura pagada histórica (Septiembre)
   - Caso: Usuario moroso con moras acumuladas

3. **CLI-2024-003**: Ana Sofía Morales de Pérez

   - 2 facturas pagadas (Octubre)
   - 1 factura pendiente (Noviembre)
   - Caso: Usuario regular con pagos al día

4. **CLI-2024-004**: Jorge Luis Gutierrez Flores (Empresa)

   - 1 factura vencida con mora alta (Octubre)
   - 1 factura pendiente de alto monto (Octubre)
   - Caso: Cliente comercial con facturas de alto valor

5. **CLI-2024-005**: Patricia Rojas Mamani

   - Sin facturas
   - Caso: Cliente nuevo sin historial

6. **CLI-2024-006**: Roberto Pérez Sánchez
   - 3 facturas pagadas (Noviembre)
   - Caso: Usuario al día con todos los servicios pagados

## Instalación y Configuración

### Requisitos Previos

- **Node.js**: >= 18.x
- **npm**: >= 9.x

### Pasos de Instalación

1. Clonar el repositorio

```bash
git clone <repository-url>
cd EsApp-bills-payment-spa
```

2. Instalar dependencias

```bash
npm install
```

3. Verificar configuración de JSON Server

El proyecto ya incluye la configuración necesaria en `package.json`:

```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3000 --routes routes.json"
  }
}
```

## Ejecución de la Aplicación

### Modo Desarrollo

Se requieren dos terminales simultáneas:

**Terminal 1 - Mock API (JSON Server)**

```bash
npm run server
```

Servidor disponible en: `http://localhost:3000`

**Terminal 2 - Aplicación React**

```bash
npm run dev
```

Aplicación disponible en: `http://localhost:5173`

### Modo Producción

1. Construir la aplicación

```bash
npm run build
```

Los archivos optimizados se generan en `dist/`

2. Vista previa de producción

```bash
npm run preview
```

### Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo (Vite)
npm run build        # Construye para producción
npm run preview      # Vista previa de build de producción
npm run server       # Inicia JSON Server en puerto 3000
npm run lint         # Ejecuta ESLint para análisis de código
```

## Datos de Prueba

### IDs de Clientes Disponibles

| ID Cliente   | Nombre                        | Escenario       | Facturas                          |
| ------------ | ----------------------------- | --------------- | --------------------------------- |
| CLI-2024-001 | María Fernanda Mamani Quispe  | Facturas mixtas | 2 pagadas, 2 pendientes           |
| CLI-2024-002 | Carlos Eduardo Vargas Mendoza | Moroso          | 2 vencidas, 1 pendiente, 1 pagada |
| CLI-2024-003 | Ana Sofía Morales de Pérez    | Al día          | 2 pagadas, 1 pendiente            |
| CLI-2024-004 | Jorge Luis Gutierrez Flores   | Comercial       | 1 vencida, 1 pendiente (alta)     |
| CLI-2024-005 | Patricia Rojas Mamani         | Sin historial   | 0 facturas                        |
| CLI-2024-006 | Roberto Pérez Sánchez         | Todo pagado     | 3 facturas pagadas                |

### Tipos de Servicio

- `electricity`: Energía Eléctrica
- `water`: Agua Potable y Alcantarillado
- `gas`: Gas Natural
- `internet`: Internet + TV Cable
- `mobile`: Telefonía Móvil

### Métodos de Pago

- `qr_transfer`: Transferencia QR
- `bank_transfer`: Transferencia Bancaria
- `credit_card`: Tarjeta de Crédito
- `debit_card`: Tarjeta de Débito

## Funcionalidades Implementadas

### 1. Búsqueda de Cliente

- Formulario con validación de campo requerido
- Estados de carga (loading)
- Manejo de errores con mensajes claros
- Ejemplos de IDs válidos mostrados al usuario

### 2. Visualización de Facturas

- Tabla de facturas con filtros por estado:
  - Móvil: Dropdown select
  - Desktop: Pestañas horizontales
- Estados: Todas, Pendientes, Pagadas, Vencidas
- Contador de facturas por categoría
- Información detallada de cada factura:
  - Tipo de servicio
  - Proveedor
  - Período de facturación
  - Fecha de vencimiento
  - Monto
  - Mora (si aplica)
  - Estado visual con badges

### 3. Resumen del Cliente

- Card con información del cliente
- Resumen de saldo pendiente
- Estadísticas de facturas:
  - Total de facturas
  - Facturas pendientes
  - Facturas vencidas
  - Facturas pagadas
  - Montos totales
- Alerta visual para facturas vencidas

### 4. Proceso de Pago

- Modal interactivo con información de la factura
- Selección de método de pago
- Confirmación con loader durante el procesamiento
- Actualización optimista de la UI
- Persistencia en JSON Server

### 5. Diseño Responsivo

- Layout adaptativo según dispositivo:
  - Móvil: Stack vertical, dropdown para filtros
  - Tablet: Layout intermedio
  - Desktop: Grid de 3 columnas
- Sin scroll horizontal en ningún dispositivo
- Componentes optimizados para touch y mouse

## Decisiones Técnicas

### Estado de la Aplicación

**Opción elegida**: React Hooks (useState)

### Manejo de API

**Custom Hook** (`useCustomerBills`):

```typescript
{
  data: CustomerSummary | null;
  isLoading: boolean;
  error: string | null;
  fetchCustomerData: (customerId: string) => Promise<void>;
  payBill: (billId: string, paymentMethod: string) => Promise<Bill>;
  reset: () => void;
}
```

### Estilos

**Opción elegida**: Tailwind CSS v4

### TypeScript

**Nivel de tipado**: Estricto

### Componentes UI

**Patrón**: Design System propio

## Testing y Calidad

### Linting

```bash
npm run lint
```

- Configuración ESLint para React y TypeScript

### Build

```bash
npm run build
```

- TypeScript compilation exitosa
- Bundle optimizado:
  - CSS: 34.23 KB (gzip: 6.67 KB)
  - JS: 224.79 KB (gzip: 69.16 KB)
- Code splitting automático por Vite

## Mejoras Futuras

### Funcionalidades

- Autenticación de usuarios
- Historial completo de pagos
- Descarga de comprobantes en PDF
- Notificaciones push para vencimientos
- Pago por lotes (múltiples facturas)
- Dashboard con gráficos y estadísticas

### Técnicas

- Testing: Jest + React Testing Library
- E2E: Cypress o Playwright
- State Management: Zustand si crece la complejidad
- API real: Migración a backend real
- PWA: Soporte offline
- Internacionalización: i18n para múltiples idiomas

## Documentación Adicional

### Vite Configuration

El proyecto utiliza Vite con configuración de proxy para el desarrollo:

- Proxy `/api` → `http://localhost:3000`
- Hot Module Replacement (HMR)
- Build optimization
- Path aliases (`@/` → `src/`)

### Tailwind CSS v4

Configurado con:

- JIT (Just-In-Time) mode
- Custom color palette
- Typography plugin
- Responsive breakpoints personalizados
