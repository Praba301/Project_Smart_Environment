/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Report, TpsPoint, Reward, QuizQuestion, TrashBin } from './types';

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'RPT-103',
    location: 'Jl. Malioboro No. 10, Sosromenduran',
    district: 'Danurejan',
    wasteType: 'Anorganik',
    description: 'Tumpukan kardus bekas belanja menumpuk di sisi trotoar menghalangi jalan.',
    photoUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=60',
    status: 'Menunggu Verifikasi',
    priority: 'Sedang',
    date: '2026-06-09 10:15',
    reporterName: 'Budi Santoso'
  },
  {
    id: 'RPT-102',
    location: 'Alun-alun Kidul sisi timur (dekat pohon beringin)',
    district: 'Kraton',
    wasteType: 'B3',
    description: 'Seseorang membuang bekas aki motor dan tumpukan botol oli bekas di area rerumputan taman.',
    photoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60',
    status: 'Proses',
    priority: 'Tinggi',
    date: '2026-06-08 14:30',
    reporterName: 'Siti Rahma'
  },
  {
    id: 'RPT-101',
    location: 'Pasar Kranggan (sisi selatan)',
    district: 'Jetis',
    wasteType: 'Organik',
    description: 'Sisa dagangan sayur dan buah yang membusuk memenuhi tempat penampungan sementara.',
    photoUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60',
    status: 'Selesai',
    priority: 'Tinggi',
    date: '2026-06-07 09:00',
    reporterName: 'Joko Widodo'
  }
];

export const INITIAL_TPS_POINTS: TpsPoint[] = [
  {
    id: 'TPS-01',
    name: 'TPS3R Nitikan',
    distance: '450 meter',
    capacity: 60,
    hours: '08:00 - 17:00',
    status: 'Buka',
    district: 'Mergangsan',
    lat: 40,
    lng: 45
  },
  {
    id: 'TPS-02',
    name: 'TPS Mantrijeron',
    distance: '1.2 km',
    capacity: 85,
    hours: '07:00 - 16:30',
    status: 'Buka',
    district: 'Mantrijeron',
    lat: 30,
    lng: 25
  },
  {
    id: 'TPS-03',
    name: 'TPS Alun-alun Kidul',
    distance: '1.8 km',
    capacity: 35,
    hours: '06:00 - 18:00',
    status: 'Buka',
    district: 'Kraton',
    lat: 55,
    lng: 50
  },
  {
    id: 'TPS-04',
    name: 'TPS Purwanggan',
    distance: '2.5 km',
    capacity: 95,
    hours: '08:00 - 15:00',
    status: 'Buka',
    district: 'Danurejan',
    lat: 70,
    lng: 75
  },
  {
    id: 'TPS-05',
    name: 'TPS Pingit',
    distance: '3.1 km',
    capacity: 40,
    hours: '08:00 - 17:00',
    status: 'Tutup',
    district: 'Jetis',
    lat: 20,
    lng: 80
  }
];

export const REWARDS: Reward[] = [
  {
    id: 'RWD-01',
    title: 'Voucher Belanja Alfamart/Indomaret Rp 50k',
    description: 'Potongan belanja langsung senilai Rp 50.000 berlaku di seluruh outlet Yogyakarta.',
    points: 500,
    category: 'Voucher',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format&fit=crop&q=60',
    limited: true,
    badge: 'Best Seller'
  },
  {
    id: 'RWD-02',
    title: 'Token Listrik PLN Prabayar Rp 100k',
    description: 'Bonus token listrik prabayar PLN senilai Rp 100.000 untuk tagihan rumah tangga.',
    points: 1000,
    category: 'Listrik',
    image: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=400&auto=format&fit=crop&q=60',
    badge: 'Terbatas'
  },
  {
    id: 'RWD-03',
    title: 'Saldo E-Wallet GoPay/OVO Rp 20k',
    description: 'Top-up saldo digital GoPay, OVO, atau Dana instan ke nomor telepon terdaftar.',
    points: 250,
    category: 'E-Wallet',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 'RWD-04',
    title: 'Voucher Belanja Sayur @PasarKronggan Rp 25k',
    description: 'Dukung petani lokal dengan voucher belanja bahan organik segar di Pasar Kranggan.',
    points: 200,
    category: 'Voucher',
    image: 'https://images.unsplash.com/photo-1488459718432-012521e160e2?w=400&auto=format&fit=crop&q=60',
    badge: 'Eco Friendly'
  },
  {
    id: 'RWD-05',
    title: 'Paket Data Internet Hemat 5GB (All Ops)',
    description: 'Paket isi ulang kuota data 5GB masa aktif 30 hari untuk semua operator seluler.',
    points: 400,
    category: 'Listrik',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&auto=format&fit=crop&q=60'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'Q-01',
    itemName: 'Kulit Pisang',
    correctCategory: 'Organik',
    hint: 'Berasal langsung dari buah alami.',
    fact: 'Kulit pisang sangat kaya akan kalium murni dan mudah sekali membusuk menjadi kompos penyubur tanaman!'
  },
  {
    id: 'Q-02',
    itemName: 'Botol Plastik Bekas Air Mineral',
    correctCategory: 'Anorganik',
    hint: 'Terbuat dari bahan buatan manusia yang kaku bermerek PET.',
    fact: 'Meskipun tahan lama, botol plastik PET bisa 100% didaur ulang menjadi serat pakaian atau wadah plastik baru!'
  },
  {
    id: 'Q-03',
    itemName: 'Baterai Remote Bekas',
    correctCategory: 'B3',
    hint: 'Mengandung logam berat beracun berupa timbal dan merkuri di dalamnya.',
    fact: 'Baterai adalah limbah B3 karena kebocoran bahan kimianya dapat mencemari air tanah dan berbahaya bagi kesehatan manusia!'
  },
  {
    id: 'Q-04',
    itemName: 'Kardus Pembungkus Paket',
    correctCategory: 'Anorganik',
    hint: 'Terbuat dari pulp serat kayu kering yang dipres.',
    fact: 'Kardus sisa belanja online dapat dijual kembali ke bank sampah terdekat untuk didaur ulang kembali menjadi kertas cokelat berkualitas.'
  },
  {
    id: 'Q-05',
    itemName: 'Sisa Sayur Kangkung',
    correctCategory: 'Organik',
    hint: 'Sayuran dapur sisa potongan bahan masak.',
    fact: 'Sampah kangkung dan sayur hijau sangat disukai ulat maggot BSF yang bisa mereduksi sampah kangkung dalam hitungan jam!'
  }
];

export const TRASH_BINS: TrashBin[] = [
  {
    id: 'BIN-1',
    locationName: 'TPS3R Nitikan - Sektor Timur',
    district: 'Mergangsan',
    capacityLevel: 88,
    lastPickup: 'Kemarin, 14:00 WIB',
    type: 'Anorganik'
  },
  {
    id: 'BIN-2',
    locationName: 'Kotak Pilah Alun-alun Kidul',
    district: 'Kraton',
    capacityLevel: 42,
    lastPickup: 'Hari Ini, 07:30 WIB',
    type: 'Organik'
  },
  {
    id: 'BIN-3',
    locationName: 'Drop-point Danurejan No. 4',
    district: 'Danurejan',
    capacityLevel: 92,
    lastPickup: '2 hari lalu',
    type: 'B3'
  },
  {
    id: 'BIN-4',
    locationName: 'Pasar Kranggan Barat',
    district: 'Jetis',
    capacityLevel: 74,
    lastPickup: 'Hari Ini, 06:15 WIB',
    type: 'Organik'
  },
  {
    id: 'BIN-5',
    locationName: 'TPS Mantrijeron - Drop-box',
    district: 'Mantrijeron',
    capacityLevel: 61,
    lastPickup: 'Hari Ini, 10:45 WIB',
    type: 'Anorganik'
  }
];
