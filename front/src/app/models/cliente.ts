export interface ClienteI {
    id: number;
    nombreCliente: string;
    direccionCliente: string;
    telefonoCliente: string;
    correoCliente: string;
    passwordCliente: string;
    activo: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

