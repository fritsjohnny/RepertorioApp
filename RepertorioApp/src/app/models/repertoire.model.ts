export interface Repertoire {
  id?: number;
  name: string;
  date?: string;
  type: string; // Ex: 'CELEBRAÇÃO' | 'ADORAÇÃO'
  songs?: number[]; // ou Song[] se necessário
}
