type ModuleT =
  | "Registrasi"
  | "Pasien"
  | "Rekam-Medis"
  | "Integrasi-Tools"
  | "Management-Client"
  | "Apotek"
  | "Laboratorium";

interface PermissionT {
  module: ModuleT;
  can_view: boolean;
  can_edit: boolean;
  can_create: boolean;
  can_delete: boolean;
}

interface UserT {
  id: number;
  name: string;
  username: string;
  role_id: number;
  email: string;
  notelp: string;
  nik: string;
  nip: string | null;
  sip: string | null;
  kode_bpjs: string | null;
  ihs_id: string | null;
  is_active: boolean;
  cdfix: number;
  created_at: string;
  updated_at: string;
}

interface LoginT {
  username: string;
  password: string;
}
