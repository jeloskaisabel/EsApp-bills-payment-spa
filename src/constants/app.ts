export const APP_NAME = "EsApp-Bills-Payment";
export const APP_DESCRIPTION = "Sistema de Pago de Servicios Públicos";

/** Tipos de servicios públicos disponibles */
export const SERVICE_TYPES = {
  electricity: "Energía Eléctrica",
  water: "Agua Potable",
  gas: "Gas Natural",
  internet: "Internet",
  mobile: "Telefonía Móvil",
} as const;

/** Estados posibles de una factura */
export const BILL_STATUS = {
  pending: "Pendiente",
  paid: "Pagado",
  overdue: "Vencido",
} as const;

/** Métodos de pago aceptados */
export const PAYMENT_METHODS = {
  qr_transfer: "Tranferencia QR",
  bank_transfer: "Tranferencia Bancaria",
  credit_card: "Tarjeta de Crédito",
  debit_card: "Tarjeta de Débito",
} as const;
