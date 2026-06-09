/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'warga' | 'petugas' | 'admin';

export type Screen = 'splash' | 'login' | 'warga_home' | 'warga_lapor' | 'warga_peta' | 'warga_reward' | 'warga_guide' | 'warga_profil' | 'petugas_dashboard' | 'admin_dashboard';

export interface Report {
  id: string;
  location: string;
  district: string;
  wasteType: 'Organik' | 'Anorganik' | 'B3';
  description: string;
  photoUrl: string;
  status: 'Menunggu Verifikasi' | 'Proses' | 'Selesai';
  priority: 'Rendah' | 'Sedang' | 'Tinggi';
  date: string;
  reporterName: string;
}

export interface TpsPoint {
  id: string;
  name: string;
  distance: string;
  capacity: number; // 0-100 percentage full
  hours: string;
  status: 'Buka' | 'Tutup';
  district: string;
  lat: number; // 0 to 100 on mock CSS canvas grids
  lng: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'Voucher' | 'Listrik' | 'E-Wallet' | 'Semua';
  image: string;
  limited?: boolean;
  badge?: string;
}

export interface QuizQuestion {
  id: string;
  itemName: string;
  correctCategory: 'Organik' | 'Anorganik' | 'B3';
  hint: string;
  fact: string;
}

export interface TrashBin {
  id: string;
  locationName: string;
  district: string;
  capacityLevel: number; // 0-100 full
  lastPickup: string;
  type: 'Organik' | 'Anorganik' | 'B3';
}
