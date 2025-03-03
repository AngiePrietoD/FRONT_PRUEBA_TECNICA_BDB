
export interface IdentificationType {
  Code: string;
  name: string;
}

export interface LoginInterface {
  tipoIdent: string;
  documento: string;
}

export interface LoginResponse {
  codeResponse: string;
  idUsuario: string;
  message: string;
  persona:{
    firstName: string,
    secondName: string,
    surname: string,
    secondSurname: string,
    phone: number,
    address: string,
    residence: string
  };
}


