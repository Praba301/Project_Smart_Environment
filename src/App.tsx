/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Send, 
  Upload, 
  Plus, 
  Check, 
  CheckCircle, 
  Search, 
  Gift, 
  User, 
  Home, 
  AlertTriangle, 
  TrendingUp, 
  LogOut, 
  Filter, 
  Navigation, 
  Compass, 
  Award, 
  Shield, 
  Activity, 
  FileText, 
  BarChart2, 
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { UserRole, Screen, Report, TpsPoint, Reward, QuizQuestion, TrashBin } from './types';
import { 
  INITIAL_REPORTS, 
  INITIAL_TPS_POINTS, 
  REWARDS, 
  QUIZ_QUESTIONS, 
  TRASH_BINS 
} from './mocks';

export default function App() {
  // Current screen state
  const [screen, setScreen] = useState<Screen>('splash');
  
  // Role & login authentication details
  const [role, setRole] = useState<UserRole>('warga');
  const [loginEmail, setLoginEmail] = useState('warga@jogjaspot.id');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Core mutable state representing Yogyakarta Smart Waste Management
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [tpsPoints, setTpsPoints] = useState<TpsPoint[]>(INITIAL_TPS_POINTS);
  const [userPoints, setUserPoints] = useState<number>(2450);
  const [selectedTpsId, setSelectedTpsId] = useState<string | null>('TPS-01');
  const [mapFilter, setMapFilter] = useState<'all' | 'terdekat' | 'buka' | 'penuh'>('all');
  const [mapSearch, setMapSearch] = useState('');

  // Lapor Screen States (Form management)
  const [newLocation, setNewLocation] = useState('Jl. C. Simanjuntak No. 12, Terban');
  const [newDistrict, setNewDistrict] = useState('Gondokusuman');
  const [newWasteType, setNewWasteType] = useState<'Organik' | 'Anorganik' | 'B3'>('Organik');
  const [newDescription, setNewDescription] = useState('');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);

  // Template Photos for Reporting (makes demo extremely interactive)
  const presetPhotos = [
    { name: 'Tumpukan Plastik', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60' },
    { name: 'Sampah Organik Pasar', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60' },
    { name: 'Limbah Baterai/Elektronik', url: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=600&auto=format&fit=crop&q=60' }
  ];

  // Sorting Guide Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<'Organik' | 'Anorganik' | 'B3' | null>(null);
  const [quizIsSubmitted, setQuizIsSubmitted] = useState(false);
  const [quizMessage, setQuizMessage] = useState('');
  const [quizScore, setQuizScore] = useState(0);

  // Reward Screen states
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redemptionSuccess, setRedemptionSuccess] = useState(false);
  const [redeemedCode, setRedeemedCode] = useState('');

  // Admin filter states
  const [adminDistrictFilter, setAdminDistrictFilter] = useState<string>('Semua');
  const [adminDateFilter, setAdminDateFilter] = useState<string>('Semua');
  const [showExportModal, setShowExportModal] = useState(false);

  // Officer route state
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [reviewingReport, setReviewingReport] = useState<Report | null>(null);

  // Dynamic user profiles details
  const userProfile = {
    name: 'Budi Santoso',
    email: 'kresnaprabawistara@gmail.com', // user email provided
    phone: '0812-3456-7890',
    address: 'Mantrijeron, Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  // Jogja Districts list 
  const JOGJA_DISTRICTS = ['Mantrijeron', 'Kraton', 'Mergangsan', 'Jetis', 'Danurejan', 'Gondokusuman', 'Wirobrajan'];

  // Handle auto preset emails for easier login demo experience
  useEffect(() => {
    if (role === 'warga') {
      setLoginEmail('warga@jogjagreen.id');
    } else if (role === 'petugas') {
      setLoginEmail('petugas.pak.eko@jogjagreen.id');
    } else if (role === 'admin') {
      setLoginEmail('pemda.sultan@jogjagreen.gov.id');
    }
  }, [role]);

  // Execute quick simulation login/demo
  const handleDemoLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'warga') {
      setScreen('warga_home');
    } else if (selectedRole === 'petugas') {
      setScreen('petugas_dashboard');
    } else if (selectedRole === 'admin') {
      setScreen('admin_dashboard');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'warga') {
      setScreen('warga_home');
    } else if (role === 'petugas') {
      setScreen('petugas_dashboard');
    } else if (role === 'admin') {
      setScreen('admin_dashboard');
    }
  };

  const handleNewReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedPhotoUrl) {
      alert('Silakan unggah foto bukti terlebih dahulu (klik preset foto demo).');
      return;
    }
    const newReport: Report = {
      id: `RPT-${Math.floor(100 + Math.random() * 900)}`,
      location: newLocation,
      district: newDistrict,
      wasteType: newWasteType,
      description: newDescription || 'Laporan penumpukan sampah liar.',
      photoUrl: uploadedPhotoUrl,
      status: 'Menunggu Verifikasi',
      priority: 'Sedang',
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      reporterName: userProfile.name
    };

    setReports([newReport, ...reports]);
    setUserPoints(userPoints + 150); // reward points for civic action!
    setSubmissionSuccess(true);
    
    // Reset inputs
    setNewDescription('');
    setUploadedPhotoUrl('');
  };

  const handleQuizAnswerSubmit = () => {
    if (!quizSelectedAnswer) return;
    const currentQ = QUIZ_QUESTIONS[quizIndex];
    if (quizSelectedAnswer === currentQ.correctCategory) {
      setQuizMessage('Benar sekali! 🎉 Anda mendapat +50 Poin edukasi karena memahami jenis sampah.');
      setUserPoints(userPoints + 50);
      setQuizScore(quizScore + 1);
    } else {
      setQuizMessage(`Kurang tepat. 💡 ${currentQ.itemName} seharusnya adalah sampah ${currentQ.correctCategory}.`);
    }
    setQuizIsSubmitted(true);
  };

  const handleNextQuiz = () => {
    setQuizSelectedAnswer(null);
    setQuizIsSubmitted(false);
    setQuizMessage('');
    setQuizIndex((quizIndex + 1) % QUIZ_QUESTIONS.length);
  };

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints < reward.points) {
      alert('Poin Anda tidak mencukupi untuk menukar reward ini.');
      return;
    }
    setSelectedReward(reward);
    setRedemptionSuccess(false);
  };

  const confirmRedeem = () => {
    if (!selectedReward) return;
    setUserPoints(userPoints - selectedReward.points);
    // Generate mock serial number
    const code = `JOGREEN-${selectedReward.id}-${Math.floor(10000 + Math.random() * 90000)}`;
    setRedeemedCode(code);
    setRedemptionSuccess(true);
  };

  // Simulating quick action states
  const toggleReportStatus = (rptId: string) => {
    setReports(reports.map(r => {
      if (r.id === rptId) {
        let nextStatus: 'Menunggu Verifikasi' | 'Proses' | 'Selesai' = 'Proses';
        if (r.status === 'Menunggu Verifikasi') nextStatus = 'Proses';
        else if (r.status === 'Proses') nextStatus = 'Selesai';
        else nextStatus = 'Menunggu Verifikasi';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const toggleReportPriority = (rptId: string) => {
    setReports(reports.map(r => {
      if (r.id === rptId) {
        let nextPriority: 'Rendah' | 'Sedang' | 'Tinggi' = 'Tinggi';
        if (r.priority === 'Sedang') nextPriority = 'Tinggi';
        else if (r.priority === 'Tinggi') nextPriority = 'Rendah';
        else nextPriority = 'Sedang';
        return { ...r, priority: nextPriority };
      }
      return r;
    }));
  };

  return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-stretch p-0 md:p-4 font-sans antialiased text-gray-900 selection:bg-emerald-200 overflow-x-hidden">
      <div className="w-full max-w-[720px] bg-[#F9FAF9] min-h-screen md:min-h-[880px] md:max-h-[920px] md:rounded-[36px] md:shadow-2xl overflow-x-hidden overflow-y-auto flex flex-col relative border border-gray-200/50">
        <AnimatePresence mode="wait">
          
          {/* 1. SPLASH SCREEN */}
          {screen === 'splash' && (
            <motion.div 
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-between p-8 bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30 text-center"
            >
              <div className="mt-8 flex flex-col items-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-4">
                  Smart Yogyakarta project
                </span>
                <div className="w-24 h-24 bg-white shadow-lg rounded-[28px] flex items-center justify-center border border-emerald-100 p-2 mb-6">
                  <div className="w-full h-full bg-emerald-600 rounded-[22px] flex items-center justify-center text-white">
                    <Trash2 className="w-12 h-12" />
                  </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 mb-2 font-display">
                  Jogja<span className="text-emerald-600">Green</span>
                </h1>
                <p className="text-gray-600 max-w-sm text-sm">
                  Aplikasi Pengelolaan Sampah Cerdas Bersama Warga untuk Yogyakarta Asri &amp; Berkelanjutan
                </p>
              </div>

              {/* Decorative Mock App Illustration */}
              <div className="my-4 px-4 py-3 bg-white/70 border border-emerald-100 rounded-3xl shadow-sm text-left max-w-sm mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Pilah, Lapor, &amp; Tukar Poin</h4>
                    <p className="text-[11px] text-gray-500">Kumpulkan reward menarik dari GoPay, PLN &amp; Alfamart</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-3">
                <button
                  id="btn-splash-masuk"
                  onClick={() => setScreen('login')}
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-md hover:bg-emerald-700 active:scale-[0.98] transition-all"
                >
                  Masuk Sekarang
                </button>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    id="btn-demo-warga"
                    onClick={() => handleDemoLogin('warga')}
                    className="py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl active:scale-95 transition-all flex flex-col items-center gap-1"
                  >
                    <User className="w-4 h-4" />
                    Demo Warga
                  </button>
                  <button
                    id="btn-demo-petugas"
                    onClick={() => handleDemoLogin('petugas')}
                    className="py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl active:scale-95 transition-all flex flex-col items-center gap-1"
                  >
                    <Shield className="w-4 h-4" />
                    Demo Petugas
                  </button>
                  <button
                    id="btn-demo-admin"
                    onClick={() => handleDemoLogin('admin')}
                    className="py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl active:scale-95 transition-all flex flex-col items-center gap-1"
                  >
                    <BarChart2 className="w-4 h-4" />
                    Demo Admin/Pemda
                  </button>
                </div>
                <p className="text-[11px] text-gray-400">Yogyakarta Smart City Initiative - Indonesia</p>
              </div>
            </motion.div>
          )}

          {/* 2. LOGIN & ROLE SELECTION SCREEN */}
          {screen === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between p-8"
            >
              <div>
                <button
                  id="btn-login-back"
                  onClick={() => setScreen('splash')}
                  className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 mb-6 flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-semibold text-emerald-700">Kembali</span>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Peran &amp; Masuk</h2>
                <p className="text-gray-500 text-sm mb-6">Pilih salah satu peran di bawah ini untuk menguji prototipe aplikasi JogjaGreen.</p>

                {/* Role Toggle Selector Container */}
                <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
                  <button
                    id="role-warga"
                    type="button"
                    onClick={() => setRole('warga')}
                    className={`py-3 text-xs font-bold rounded-xl transition-all ${role === 'warga' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Warga
                  </button>
                  <button
                    id="role-petugas"
                    type="button"
                    onClick={() => setRole('petugas')}
                    className={`py-3 text-xs font-bold rounded-xl transition-all ${role === 'petugas' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Petugas
                  </button>
                  <button
                    id="role-admin"
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-3 text-xs font-bold rounded-xl transition-all ${role === 'admin' ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Admin/Pemda
                  </button>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alamat Email</label>
                    <input
                      id="input-login-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all bg-white"
                      placeholder="Masukkan alamat email Anda"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Kata Sandi</label>
                      <button
                        id="btn-forgot-password"
                        type="button"
                        onClick={() => alert('Sistem telah mengirimkan tautan penyetelan ulang kata sandi ke email Anda!')}
                        className="text-xs text-emerald-600 hover:underline font-semibold"
                      >
                        Lupa Kata Sandi?
                      </button>
                    </div>
                    <input
                      id="input-login-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all bg-white"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      id="checkbox-remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <label htmlFor="checkbox-remember" id="lbl-remember" className="text-xs text-gray-600 font-medium">
                      Simpan info masuk di perangkat ini
                    </label>
                  </div>

                  <button
                    id="btn-login-submit"
                    type="submit"
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-md hover:bg-emerald-700 active:scale-[0.98] transition-all mt-6"
                  >
                    Masuk Sebagai {role === 'warga' ? 'Warga' : role === 'petugas' ? 'Petugas' : 'Admin Pemda'}
                  </button>
                </form>
              </div>

              {/* Quick Preset Selector */}
              <div className="mt-8 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-800 mb-2">Tip Demo Cepat:</h4>
                <p className="text-[11px] text-gray-600">Klik tombol peran di atas untuk menyesuaikan email masuk secara otomatis. Kata sandi sudah terisi otomatis.</p>
              </div>
            </motion.div>
          )}

          {/* 3. HOME DASHBOARD FOR WARGA */}
          {screen === 'warga_home' && (
            <motion.div
              key="warga_home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-24"
            >
              {/* Header */}
              <div className="bg-emerald-800 text-white px-6 pt-8 pb-12 rounded-b-[32px] shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10">
                  <Trash2 className="w-48 h-48" />
                </div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <p className="text-xs font-semibold text-emerald-200">Sapaan Hangat,</p>
                    <h2 className="text-xl font-bold tracking-tight">Halo, {userProfile.name}!</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      id="btn-notif"
                      onClick={() => alert('Belum ada notifikasi baru hari ini.')}
                      className="p-2.5 bg-emerald-700/60 rounded-xl hover:bg-emerald-700 relative active:scale-95 transition-all text-white"
                    >
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <div 
                      onClick={() => setScreen('warga_profil')}
                      className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-300 shadow cursor-pointer active:scale-95 transition-all"
                    >
                      <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Score & Streak Bento Summary Card */}
                <div className="bg-white text-gray-900 p-5 rounded-2xl shadow-md border border-emerald-100 relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">JogjaGreen Poin Saya</span>
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">LEVEL 3</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-1">
                        <Award className="w-6 h-6 text-yellow-500 fill-yellow-400" />
                        <span id="points-display" className="text-3xl font-extrabold tracking-tight text-emerald-900">{userPoints}</span>
                        <span className="text-xs font-bold text-gray-400 ml-1">Poin</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">Anda sudah menyelamatkan sampah bulan ini! 🌱</p>
                    </div>
                    <button
                      id="btn-tukar-poin-shortcut"
                      onClick={() => setScreen('warga_reward')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all active:scale-95"
                    >
                      Tukar Poin
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Contents */}
              <div className="px-6 -mt-6 relative z-20 space-y-4">
                
                {/* Waste Status Summary Card */}
                <div className="bg-emerald-500 text-white p-5 rounded-3xl shadow-md flex items-center justify-between border border-emerald-400">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-100 uppercase tracking-wider mr-2">STATUS SAMPAH SAYA</span>
                    <h3 className="text-lg font-bold">Terkelola Baik</h3>
                    <p className="text-xs text-emerald-100/90 mt-1 max-w-[200px]">Semua sampah terjadwal di wilayah Mantrijeron telah terangkut tepat waktu.</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Quick Actions grid */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Aksi Cepat</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      id="action-lapor"
                      onClick={() => setScreen('warga_lapor')}
                      className="bg-white border border-gray-100 hover:border-emerald-200 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow active:scale-95 transition-all text-gray-700"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold leading-tight">Lapor Sampah</span>
                    </button>

                    <button
                      id="action-peta"
                      onClick={() => setScreen('warga_peta')}
                      className="bg-white border border-gray-100 hover:border-emerald-200 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow active:scale-95 transition-all text-gray-700"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-2">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold leading-tight">Cari TPS</span>
                    </button>

                    <button
                      id="action-guide"
                      onClick={() => setScreen('warga_guide')}
                      className="bg-white border border-gray-100 hover:border-emerald-200 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow active:scale-95 transition-all text-gray-700"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-2">
                        <Compass className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold leading-tight">Panduan Pilah</span>
                    </button>

                    <button
                      id="action-reward"
                      onClick={() => setScreen('warga_reward')}
                      className="bg-white border border-gray-100 hover:border-emerald-200 p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow active:scale-95 transition-all text-gray-700"
                    >
                      <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mb-2">
                        <Gift className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold leading-tight">Klaim Poin</span>
                    </button>
                  </div>
                </div>

                {/* Today's Waste Collection Schedule Card */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-sm font-bold text-gray-800">Jadwal Angkutan Sampah</h4>
                    </div>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">HARI INI</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
                      <span className="font-semibold text-gray-700">Anorganik (Plastik/Kertas)</span>
                      <span className="text-emerald-700 font-bold bg-emerald-100/50 px-2.5 py-1 rounded-lg">08:30 WIB</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs opacity-60">
                      <span className="font-semibold text-gray-700">Organik (Dapur/Taman)</span>
                      <span className="text-gray-500 italic">Selesai (Diangkut pukul 06:15)</span>
                    </div>
                  </div>
                </div>

                {/* Nearby TPS Mini Map preview */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">TPS Terdekat Baru</h4>
                      <p className="text-[11px] text-gray-500">Mergangsan • Berjarak 450 meter</p>
                    </div>
                    <button
                      id="mini-map-open-route"
                      onClick={() => setScreen('warga_peta')}
                      className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl flex items-center justify-center active:scale-90 transition-all"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Decorative Map Visual */}
                  <div className="h-28 bg-emerald-100 relative overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => setScreen('warga_peta')}>
                    {/* SVG/CSS simplified map blueprint representation to match clean aesthetic */}
                    <div className="absolute inset-0 bg-emerald-50 opacity-50 flex flex-wrap gap-2 p-1">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="w-10 h-6 bg-white rounded-md border border-gray-200/40"></div>
                      ))}
                    </div>
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                    <div className="absolute top-1/3 left-1/2 bg-emerald-600 text-white text-[10px] font-bold py-1 px-2 rounded-lg flex items-center gap-1 shadow-md">
                      <MapPin className="w-3 h-3" /> TPS3R Nitikan
                    </div>
                  </div>
                </div>

                {/* Recent activity log */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Laporan Saya Terbaru</h3>
                  <div className="space-y-2">
                    {reports.filter(r => r.reporterName === userProfile.name).slice(0, 2).map((item) => (
                      <div key={item.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={item.photoUrl} alt="Laporan" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[11px] font-bold text-gray-500 uppercase">{item.id}</span>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                              item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                              item.status === 'Proses' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-gray-800 truncate">{item.location}</p>
                          <p className="text-[11px] text-gray-500 truncate">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* 4. REPORT WASTE SCREEN (LAPOR) */}
          {screen === 'warga_lapor' && (
            <motion.div
              key="warga_lapor"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-24"
            >
              <div>
                {/* Custom Tool Header */}
                <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                  <button
                    id="lapor-back"
                    onClick={() => setScreen('warga_home')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-1 shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-700">KEMBALI</span>
                  </button>
                  <h2 className="text-md font-extrabold text-gray-900 mx-auto">Lapor Tumpukan Sampah</h2>
                  <div className="w-10"></div>
                </div>

                <div className="p-6 space-y-6">
                  
                  {/* Photo area */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Unggah Foto Bukti Sampah</label>
                    
                    {uploadedPhotoUrl ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm group">
                        <img src={uploadedPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          id="btn-remove-photo"
                          onClick={() => setUploadedPhotoUrl('')}
                          className="absolute top-3 right-3 p-2 bg-red-600/90 text-white rounded-full hover:bg-red-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-white hover:bg-gray-50 transition-all relative">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                            <Upload className="w-6 h-6" />
                          </div>
                          <h4 className="text-xs font-semibold text-gray-800">Gunakan Foto Demo Kreatif</h4>
                          <p className="text-[11px] text-gray-400 mt-1 mb-4">Pilih salah satu preset foto tumpukan sampah di Yogyakarta untuk simulasi:</p>
                        </div>

                        {/* Preset templates for easiest realistic sandbox demos */}
                        <div className="grid grid-cols-3 gap-2">
                          {presetPhotos.map((p, idx) => (
                            <button
                              id={`preset-photo-${idx}`}
                              key={p.name}
                              type="button"
                              onClick={() => setUploadedPhotoUrl(p.url)}
                              className="p-1 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold rounded-lg transition-all"
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form fields */}
                  <form onSubmit={handleNewReportSubmit} className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Lokasi Temuan</label>
                        <button
                          id="btn-autofill-gps"
                          type="button"
                          onClick={() => {
                            setNewLocation('Jl. KH. Ahmad Dahlan No. 25, Ngupasan');
                            setNewDistrict('Kraton');
                          }}
                          className="text-xs text-emerald-600 hover:underline font-bold flex items-center gap-1"
                        >
                          <Navigation className="w-3.5 h-3.5" /> Gunakan GPS
                        </button>
                      </div>
                      <input
                        id="input-lapor-location"
                        type="text"
                        required
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        placeholder="Contoh: Jl. Diponegoro No. 12"
                      />
                    </div>

                    {/* District Dropdown Selector */}
                    <div className="relative">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kecamatan (Kemantren)</label>
                      <button
                        id="dropdown-district-trigger"
                        type="button"
                        onClick={() => setDistrictSelectorOpen(!districtSelectorOpen)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm text-left flex justify-between items-center"
                      >
                        <span>{newDistrict}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Ubah</span>
                      </button>
                      
                      {districtSelectorOpen && (
                        <div className="absolute z-30 top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-2 space-y-1">
                          {JOGJA_DISTRICTS.map(dist => (
                            <button
                              id={`select-district-${dist}`}
                              key={dist}
                              type="button"
                              onClick={() => {
                                setNewDistrict(dist);
                                setDistrictSelectorOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-emerald-50 hover:text-emerald-800"
                            >
                              {dist}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Waste Category Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jenis Sampah Utama</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Organik', 'Anorganik', 'B3'] as const).map(cat => (
                          <button
                            id={`category-btn-${cat}`}
                            key={cat}
                            type="button"
                            onClick={() => setNewWasteType(cat)}
                            className={`py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                              newWasteType === cat 
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description text area */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Deskripsi Kerusakan / Volume Sampah</label>
                      <textarea
                        id="input-lapor-desc"
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        placeholder="Contoh: Ada sampah menimbun liar sampai ke tengah jalan, bau sangat tidak sedap."
                      ></textarea>
                    </div>

                    <button
                      id="btn-lapor-submit"
                      type="submit"
                      className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-md hover:bg-emerald-700 active:scale-[0.98] transition-all mt-4"
                    >
                      Kirim Laporan Sampah (+150 Poin)
                    </button>
                  </form>

                  {/* History of citizen reports list */}
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Riwayat Keterlibatan Laporan Saya</h3>
                    
                    <div className="space-y-3">
                      {reports.filter(r => r.reporterName === userProfile.name).map((report, idx) => (
                        <div key={report.id} id={`history-report-${idx}`} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-extrabold text-gray-400 uppercase mr-2">{report.id}</span>
                              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{report.wasteType}</span>
                            </div>
                            <div className="text-right">
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                report.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                                report.status === 'Proses' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800 font-semibold'
                              }`}>
                                {report.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                              <img src={report.photoUrl} alt="Evidence" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-800">{report.location}</p>
                              <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{report.description}</p>
                              <span className="text-[10px] text-gray-400 font-medium block mt-1">{report.date} • Kemantren {report.district}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* SUCCESS MODAL FOR LAPORAN */}
              {submissionSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSubmissionSuccess(false)}></div>
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl p-6 text-center max-w-sm w-full relative z-10 shadow-2xl space-y-4"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-950">Laporan Berhasil Dikirim!</h3>
                      <p className="text-xs text-gray-500 mt-2">Terima kasih atas kepedulian Anda. Tim JogjaGreen mendapat notifikasi dan poin saldo Anda telah ditambahkan sebesar +150!</p>
                    </div>
                    <button
                      id="btn-submission-close"
                      onClick={() => setSubmissionSuccess(false)}
                      className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                      Mantap, Kembali
                    </button>
                  </motion.div>
                </div>
              )}

            </motion.div>
          )}

          {/* 5. SORTING GUIDE SCREEN (PANDUAN PILAH) */}
          {screen === 'warga_guide' && (
            <motion.div
              key="warga_guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-24"
            >
              <div>
                {/* Custom Tool Header */}
                <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                  <button
                    id="guide-back"
                    onClick={() => setScreen('warga_home')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-700">KEMBALI</span>
                  </button>
                  <h2 className="text-md font-extrabold text-gray-900 mx-auto">Panduan Pilih Sampah</h2>
                  <div className="w-10"></div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-950 mb-1">Mulai Dari Rumah Kita</h3>
                    <p className="text-xs text-gray-500">Memilah sampah membantu menjaga kelancaran TPS3R Nitikan Yogyakarta dan mengurangi pencemaran laut.</p>
                  </div>

                  {/* Kategori Organizer detail cards */}
                  <div className="space-y-4">
                    
                    {/* Organik */}
                    <div className="bg-white border border-emerald-100 p-5 rounded-3xl shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">O</div>
                        <h4 className="text-md font-bold text-emerald-800">1. Sampah Organik (Dapat Membusuk)</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">Sampah basah sisa organisme hidup yang mudah terurai dan sangat baik diproses ulang menjadi pupuk organik.</p>
                      <div className="bg-emerald-50 rounded-xl p-3 flex flex-wrap gap-2 text-[11px] text-emerald-800 font-semibold direct-span">
                        <span>🥬 Sisa Sayur &amp; Kulit Buah</span>
                        <span>🐟 Daging/Sisa Makanan</span>
                        <span>🍂 Dedaunan Kering</span>
                      </div>
                    </div>

                    {/* Anorganik */}
                    <div className="bg-white border border-blue-100 p-5 rounded-3xl shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">A</div>
                        <h4 className="text-md font-bold text-blue-800">2. Sampah Anorganik (Bisa Didaur Ulang)</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">Sampah kering dari bahan buatan manusia yang tidak bisa membusuk, namun memiliki nilai jual ekonomi tinggi.</p>
                      <div className="bg-blue-50 rounded-xl p-3 flex flex-wrap gap-1.5 text-[11px] text-blue-800 font-semibold direct-span">
                        <span>🥤 Botol Plastik PET</span>
                        <span>📦 Kardus &amp; Kertas Bekas</span>
                        <span>🥫 Kaleng Aluminium</span>
                      </div>
                    </div>

                    {/* B3 */}
                    <div className="bg-white border border-red-100 p-5 rounded-3xl shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">B3</div>
                        <h4 className="text-md font-bold text-red-800">3. Sampah B3 (Berbahaya &amp; Beracun)</h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">Limbah rumah tangga yang mengandung zat beracun kimia atau berbahaya bagi kesehatan lingkungan.</p>
                      <div className="bg-red-50 rounded-xl p-3 flex flex-wrap gap-1.5 text-[11px] text-red-800 font-semibold direct-span">
                        <span>🔋 Baterai Bekas</span>
                        <span>💡 Lampu Neon / LED</span>
                        <span>🧪 Sisa Oli / Botol Pembersih</span>
                      </div>
                    </div>

                  </div>

                  {/* Interactive Cek Jenis Sampah Mini-calculator / quiz */}
                  <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-6 rounded-3xl shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-bold">Cek Jenis Sampah &amp; Belajar</h4>
                      <span className="text-[10px] font-extrabold bg-emerald-700 px-3 py-1 rounded-full text-emerald-200">GAME EDUKASI</span>
                    </div>

                    <p className="text-xs text-emerald-100 mb-4 leading-relaxed">Teka-teki pilah: Di mana wadah pembuangan yang tepat?</p>
                    
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center mb-4">
                      <span className="text-[11px] block text-emerald-200/90 font-bold uppercase tracking-wider mb-1">Nama Benda:</span>
                      <h5 className="text-xl font-extrabold tracking-tight text-white">{QUIZ_QUESTIONS[quizIndex].itemName}</h5>
                    </div>

                    {!quizIsSubmitted ? (
                      <div className="space-y-2">
                        <p className="text-[11px] text-emerald-300 font-semibold">🔍 Petunjuk: {QUIZ_QUESTIONS[quizIndex].hint}</p>
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          {(['Organik', 'Anorganik', 'B3'] as const).map(ans => (
                            <button
                              id={`answer-btn-${ans}`}
                              key={ans}
                              onClick={() => setQuizSelectedAnswer(ans)}
                              type="button"
                              className={`py-3 text-xs font-bold rounded-xl transition-all ${
                                quizSelectedAnswer === ans 
                                  ? 'bg-yellow-400 text-emerald-950 scale-105 shadow-md' 
                                  : 'bg-emerald-700/60 hover:bg-emerald-700 text-white border border-emerald-600/50'
                              }`}
                            >
                              {ans}
                            </button>
                          ))}
                        </div>
                        <button
                          id="btn-submit-answer"
                          disabled={!quizSelectedAnswer}
                          onClick={handleQuizAnswerSubmit}
                          className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-emerald-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-[0.98] mt-4 uppercase tracking-wider"
                        >
                          Kirim Jawaban (+50 Poin)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-3 bg-white/15 rounded-xl border border-white/10 text-xs">
                          <p className="font-bold mb-1">Informasi Edukatif:</p>
                          <p className="text-emerald-100 leading-relaxed text-[11px]">{QUIZ_QUESTIONS[quizIndex].fact}</p>
                        </div>
                        <p className="text-xs font-bold text-yellow-300 leading-normal">{quizMessage}</p>
                        
                        <button
                          id="btn-quiz-next"
                          onClick={handleNextQuiz}
                          className="w-full py-3 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-xl hover:bg-white active:scale-95 transition-all"
                        >
                          Coba Tebak Benda Lainnya
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* 6. MAP / TPS SCREEN */}
          {screen === 'warga_peta' && (
            <motion.div
              key="warga_peta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-24 relative overflow-hidden"
            >
              {/* Map Search & Header bar overlays */}
              <div className="p-4 absolute top-0 left-0 right-0 z-30 space-y-2">
                <div className="bg-white/95 backdrop-blur shadow-md rounded-2xl p-2 flex items-center gap-2 border border-emerald-100">
                  <button
                    id="peta-back"
                    onClick={() => setScreen('warga_home')}
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 cursor-pointer text-emerald-700"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-2 text-xs border border-gray-100">
                    <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
                    <input
                      id="input-map-search"
                      type="text"
                      className="w-full bg-transparent border-none outline-none text-xs text-gray-800"
                      placeholder="Cari TPS3R atau alamat di Yogyakarta..."
                      value={mapSearch}
                      onChange={(e) => setMapSearch(e.target.value)}
                    />
                  </div>

                  <button
                    id="btn-map-filter-penuh"
                    onClick={() => setMapFilter(mapFilter === 'penuh' ? 'all' : 'penuh')}
                    className={`p-2 rounded-xl border transition-all ${mapFilter === 'penuh' ? 'bg-red-100 border-red-200 text-red-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                    title="TPS Penuh"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter chips */}
                <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar-div scrollbar-none">
                  {(['all', 'terdekat', 'buka', 'penuh'] as const).map(f => (
                    <button
                      id={`map-filter-chip-${f}`}
                      key={f}
                      onClick={() => setMapFilter(f)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap shadow-sm border transition-all ${
                        mapFilter === f 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {f === 'all' ? 'Semua TPS3R' : f === 'terdekat' ? 'Terdekat' : f === 'buka' ? 'Buka Sekarang' : 'Hampir Penuh'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative Screen Canvas Map */}
              <div className="flex-1 bg-emerald-50/20 relative flex items-center justify-center p-0">
                {/* Visual streets representation */}
                <div className="absolute inset-0 bg-[#E8F0E5] opacity-80 pointer-events-none">
                  <div className="absolute inset-0 flex flex-col justify-around">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-6 bg-white border-y border-gray-200/50"></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex justify-around">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-6 bg-white border-x border-gray-200/50"></div>
                    ))}
                  </div>
                  {/* Diagonal streets */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-white rotate-12 origin-top-left"></div>
                  <div className="absolute bottom-0 right-0 w-full h-[3px] bg-white -rotate-12 origin-bottom-right"></div>
                </div>

                {/* Markers dynamic render */}
                {tpsPoints
                  .filter(tps => {
                    if (mapFilter === 'terdekat') return tps.distance.includes('meter') || tps.distance.includes('1.2 km');
                    if (mapFilter === 'buka') return tps.status === 'Buka';
                    if (mapFilter === 'penuh') return tps.capacity >= 80;
                    return true;
                  })
                  .filter(tps => tps.name.toLowerCase().includes(mapSearch.toLowerCase()))
                  .map(tps => (
                    <button
                      id={`tps-marker-${tps.id}`}
                      key={tps.id}
                      onClick={() => setSelectedTpsId(tps.id)}
                      style={{ top: `${tps.lat}%`, left: `${tps.lng}%` }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 active:scale-125 transition-all outline-none"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full border-2 border-white shadow-md relative ${
                          selectedTpsId === tps.id ? 'bg-amber-500 text-white scale-110 z-30' :
                          tps.status === 'Tutup' ? 'bg-gray-400 text-white opacity-80' : 
                          tps.capacity >= 80 ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          <Trash2 className="w-4 h-4" />
                          {tps.capacity >= 80 && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white"></span>
                          )}
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white text-gray-800 rounded shadow mt-1 border border-gray-100 max-w-[80px] truncate leading-tight block">
                          {tps.name}
                        </span>
                      </div>
                    </button>
                ))}

                {/* Yogyakarta center marker */}
                <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white pointer-events-none animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-emerald-600 rounded-full border-2 border-white relative flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[9px] font-bold uppercase text-emerald-800 tracking-wider bg-emerald-50 px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">Anda</span>
                </div>
              </div>

              {/* Botton detail sheet */}
              {selectedTpsId && (() => {
                const activeTps = tpsPoints.find(t => t.id === selectedTpsId);
                if (!activeTps) return null;
                return (
                  <motion.div 
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    className="absolute bottom-24 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl z-40 border border-gray-100 flex flex-col gap-4 max-w-[680px] mx-auto"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-md font-extrabold text-gray-900">{activeTps.name}</h4>
                          <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                            activeTps.status === 'Buka' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {activeTps.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          Mantrijeron • {activeTps.distance} dari lokasi Anda
                        </p>
                      </div>
                      <button
                        id="btn-close-sheet"
                        onClick={() => setSelectedTpsId(null)}
                        className="p-1 hover:bg-gray-100 rounded-full text-gray-400"
                      >
                        <span className="text-xs font-bold font-mono">X</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">TINGKAT KEPENUHAN BEREAKSI</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${activeTps.capacity >= 80 ? 'text-red-600' : 'text-emerald-700'}`}>
                            {activeTps.capacity}% Penuh
                          </span>
                        </div>
                        {/* Fill levels progress indicator */}
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1.5">
                          <div 
                            className={`h-full ${activeTps.capacity >= 80 ? 'bg-red-600' : 'bg-emerald-600'}`} 
                            style={{ width: `${activeTps.capacity}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">OPERASIONAL TIAP HARI</span>
                        <span className="text-xs font-bold text-gray-700 block">{activeTps.hours} WIB</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1 font-semibold">Tepat Angkut</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        id="btn-tps-navigate"
                        onClick={() => {
                          alert(`Navigasi rute aktif menuju ${activeTps.name}. Ikuti rute sepanjang 1.2km!`);
                          // Draw a route marker dummy representation
                        }}
                        className="col-span-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow"
                      >
                        <Navigation className="w-4 h-4" /> Dapatkan Rute Penjemputan
                      </button>
                      <button
                        id="btn-tps-share"
                        onClick={() => alert(`Tautan lokasi ${activeTps.name} berhasil disalin ke papan klip!`)}
                        className="py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl"
                      >
                        Bagikan Lokasi
                      </button>
                    </div>
                  </motion.div>
                );
              })()}

            </motion.div>
          )}

          {/* 7. REWARD MARKETPLACE SCREEN (REWARD) */}
          {screen === 'warga_reward' && (
            <motion.div
              key="warga_reward"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-24"
            >
              <div>
                {/* Custom Tool Header */}
                <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                  <button
                    id="reward-back"
                    onClick={() => setScreen('warga_home')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-700">KEMBALI</span>
                  </button>
                  <h2 className="text-md font-extrabold text-gray-900 mx-auto">Tukar Poin JogjaGreen</h2>
                  <div className="w-10"></div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Points Display inside marketplace */}
                  <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex justify-between items-center">
                    <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10">
                      <Award className="w-32 h-32" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-200 tracking-wider uppercase font-bold block mb-1">Saldo Koin Penyelamat Anda:</span>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        <h3 className="text-3xl font-extrabold tracking-tight">{userPoints} <span className="text-xs font-semibold text-emerald-200">Koin</span></h3>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-700/60 text-emerald-200 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold">SILVER TIER</span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Pilihan Penukaran Reward Eksklusif</h3>
                    
                    <div className="space-y-4">
                      {REWARDS.map((reward, index) => (
                        <div 
                          key={reward.id} 
                          className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row group"
                        >
                          {/* Image and badges list as requested */}
                          <div className="w-full sm:w-1/3 aspect-[4/3] sm:aspect-auto sm:h-36 overflow-hidden relative shrink-0">
                            <img src={reward.image} alt={reward.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                            {reward.badge && (
                              <span className="absolute top-2 left-2 text-[8px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow">
                                {reward.badge}
                              </span>
                            )}
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{reward.category}</span>
                                <span className="text-xs font-extrabold text-emerald-700">{reward.points} Poin</span>
                              </div>
                              <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{reward.title}</h4>
                              <p className="text-[11px] text-gray-500 mt-0.5 leading-normal line-clamp-2">{reward.description}</p>
                            </div>

                            <button
                              id={`redeem-btn-${index}`}
                              disabled={userPoints < reward.points}
                              onClick={() => handleRedeemReward(reward)}
                              className="w-full py-2 bg-emerald-100 hover:bg-emerald-600 text-emerald-800 hover:text-white disabled:opacity-40 disabled:bg-gray-100 disabled:text-gray-400 font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all active:scale-95 mt-3"
                            >
                              {userPoints >= reward.points ? 'TUKAR SEKARANG' : 'POIN KELOLA BELUM CUKUP'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* REDEEM CONFIRMATION SHEET */}
              {selectedReward && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedReward(null)}></div>
                  
                  <motion.div
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm relative z-10 shadow-2xl space-y-4"
                  >
                    {!redemptionSuccess ? (
                      <>
                        <h4 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Konfirmasi Penukaran</h4>
                        
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">Item yang Ditukarkan:</span>
                          <h5 className="text-sm font-bold text-emerald-950 mt-1">{selectedReward.title}</h5>
                          <p className="text-xs text-gray-500 mt-2 font-medium">Beban Biaya: {selectedReward.points} Koin Penyelamat</p>
                        </div>

                        <p className="text-[11px] text-gray-500 leading-normal text-center">Item ini akan segera diproses instan dan serial kupon digital Anda akan terbit otomatis.</p>
                        
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button
                            id="btn-redeem-cancel"
                            onClick={() => setSelectedReward(null)}
                            className="py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-250"
                          >
                            Batal
                          </button>
                          <button
                            id="btn-redeem-confirm"
                            onClick={confirmRedeem}
                            className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
                          >
                            Ya, Tukar
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-4 py-2">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 animate-bounce" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-emerald-950">Penukaran Sukses!</h4>
                          <p className="text-xs text-gray-500 mt-1">Saldo poin berkurang. Berikut adalah nomor kupon penukaran Yogyakarta Anda:</p>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-xl border border-dashed border-gray-400 select-all font-mono text-xs font-bold text-emerald-800 tracking-wider">
                          {redeemedCode}
                        </div>

                        <p className="text-[10px] text-gray-400">Salin kode di atas. Tunjukkan ke petugas toko kasir atau masukkan ke aplikasi PLN/GoPay untuk klaim.</p>
                        <button
                          id="btn-redeem-done"
                          onClick={() => setSelectedReward(null)}
                          className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-700"
                        >
                          Selesai
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

            </motion.div>
          )}

          {/* 8. CITIZEN PROFILE SCREEN */}
          {screen === 'warga_profil' && (
            <motion.div
              key="warga_profil"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-24"
            >
              <div>
                <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                  <button
                    onClick={() => setScreen('warga_home')}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-700">KEMBALI</span>
                  </button>
                  <h2 className="text-md font-extrabold text-gray-900 mx-auto">Profil Warga Jogja</h2>
                  <div className="w-10"></div>
                </div>

                <div className="p-6 space-y-6">
                  {/* User credentials */}
                  <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow">
                      <img src={userProfile.avatar} alt="Citizen" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-gray-800">{userProfile.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{userProfile.email}</p>
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded mt-1.5 inline-block">Warga Terverifikasi</span>
                    </div>
                  </div>

                  {/* Yogyakarta Smart Citizen status metrics */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-emerald-50/50 p-4 border border-emerald-100 rounded-2xl">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">KONTRIBUSI INDIVIDUAL</span>
                      <span className="text-lg font-bold text-emerald-800 block mt-1">12 Kilogram</span>
                      <span className="text-[9px] text-gray-500">Mencegah Sampah Liar</span>
                    </div>
                    <div className="bg-emerald-50/50 p-4 border border-emerald-100 rounded-2xl">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">TINGKAT EVALUASI</span>
                      <span className="text-lg font-bold text-emerald-800 block mt-1">Sangat Baik</span>
                      <span className="text-[9px] text-gray-500">Kolektor Pilah</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => alert('Sistem sinkronisasi akun Jogja ID sedang berjalan otomatis.')}
                      className="w-full text-left p-4 bg-white border border-gray-100 rounded-2xl flex justify-between items-center text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      <span>Hubungkan ke Jogja Kita / Jogja Smart ID</span>
                      <span className="font-bold text-emerald-600 text-[10px] uppercase">AKTIF</span>
                    </button>
                    <button
                      onClick={() => alert('Laporan rekapitulasi data sampah berhasil diunduh ke bentuk PDF.')}
                      className="w-full text-left p-4 bg-white border border-gray-100 rounded-2xl flex justify-between items-center text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      <span>Unduh Rekap Laporan &amp; Poin</span>
                      <span className="font-bold text-emerald-600 text-[10px] uppercase">CETAK</span>
                    </button>
                  </div>

                  <button
                    id="btn-profil-logout"
                    onClick={() => setScreen('splash')}
                    className="w-full py-4 text-xs font-extrabold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <LogOut className="w-5 h-5" /> KELUAR AKUN / PINDAH PERAN
                  </button>

                </div>
              </div>
            </motion.div>
          )}

          {/* 9. OFFICER / PETUGAS DASHBOARD SCREEN */}
          {screen === 'petugas_dashboard' && (
            <motion.div
              key="petugas_dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-8 p-6 space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider block">TIM MONITR PETUGAS</span>
                    <h2 className="text-md font-extrabold text-gray-900 leading-tight">Dashboard Eko Prasetyo</h2>
                  </div>
                </div>
                
                <button
                  id="btn-officer-logout"
                  onClick={() => setScreen('splash')}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-xl flex items-center justify-center active:scale-90 transition-all border border-red-100"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Analytics Mini Cards block */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <span className="text-[9px] text-gray-400 block font-bold uppercase">Lapor Hari Ini</span>
                  <span className="text-md font-extrabold text-emerald-800 block mt-1">48</span>
                </div>
                <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <span className="text-[9px] text-gray-400 block font-bold uppercase">TPS Kritis</span>
                  <span className="text-md font-extrabold text-red-600 block mt-1">12</span>
                </div>
                <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <span className="text-[9px] text-gray-400 block font-bold uppercase">Waktu Respons</span>
                  <span className="text-md font-extrabold text-blue-800 block mt-1">18 mnt</span>
                </div>
              </div>

              {/* Status Container Sensor monitor bins */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Sensor Kapasitas Tempat Sampah Kota</h3>
                
                <div className="space-y-2">
                  {TRASH_BINS.slice(0, 3).map((bin, index) => (
                    <div key={bin.id} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-800">{bin.locationName}</span>
                          <span className="text-[9px] font-bold bg-gray-100 uppercase px-1.5 py-0.5 rounded text-gray-500">{bin.type}</span>
                        </div>
                        <p className="text-[10px] text-gray-400">Terakhir bongkar armada: {bin.lastPickup}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-bold ${bin.capacityLevel >= 80 ? 'text-red-600' : 'text-emerald-700'}`}>
                          {bin.capacityLevel}%
                        </span>
                        <div className="w-14 bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                          <div 
                            className={`h-full ${bin.capacityLevel >= 80 ? 'bg-red-600' : 'bg-emerald-600'}`} 
                            style={{ width: `${bin.capacityLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimized routes planning section */}
              <div className="bg-gradient-to-br from-[#1E562F] to-[#0A2613] text-white p-5 rounded-3xl shadow-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-200 uppercase tracking-wider block">ROUTE COLLECTION TRACKER</h4>
                    <span className="text-md font-extrabold block">Optimalisasi Jalur Truk</span>
                  </div>
                  <button
                    id="btn-optimize-route"
                    onClick={() => {
                      setRouteOptimized(true);
                      alert('Rute berhasil dihitung dengan algoritme AI kearifan lokal! Efisiensi bahan bakar +24% tercapai.');
                    }}
                    className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-emerald-950 font-extrabold text-[10px] uppercase rounded-lg shadow whitespace-nowrap active:scale-95 transition-all"
                  >
                    Atur Rute AI
                  </button>
                </div>

                {/* Simulated map route visualization overlay */}
                <div className="relative h-28 bg-[#ffffff10] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {routeOptimized ? (
                    <div className="space-y-1 text-center relative z-10 w-full px-4">
                      <span className="text-[10px] text-yellow-300 font-extrabold uppercase block tracking-wider animate-pulse">Armada Rute Aktif</span>
                      <p className="text-xs leading-normal font-medium text-emerald-100">Nitikan ➔ Mantrijeron ➔ Pasar Kranggan • Selesai 14:30 WIB</p>
                      <div className="w-full bg-emerald-700/60 h-1 rounded overflow-hidden mt-2 max-w-sm mx-auto">
                        <div className="bg-yellow-300 h-full animate-pulse" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-xs text-emerald-200">
                      <p className="font-medium">Jaringan pembersihan belum tersambung ke sensor GPS.</p>
                      <span className="text-[10px] opacity-75 block mt-1 hover:underline cursor-pointer" onClick={() => setRouteOptimized(true)}>
                        Klik "Atur Rute AI" untuk menghitung jarak pemungutan.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* List of reports waiting to be completed */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Laporan Menunggu Tindakan</h3>
                  <span className="text-[10px] font-bold text-emerald-700 font-mono">Daftar Live</span>
                </div>

                <div className="space-y-3">
                  {reports.map((item, idx) => (
                    <div key={item.id} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full mr-2 ${
                            item.priority === 'Tinggi' ? 'bg-red-100 text-red-800' :
                            item.priority === 'Sedang' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            PRIORITAS {item.priority}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400">{item.id}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                          item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'Proses' ? 'bg-blue-100 text-blue-800 animate-pulse' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={item.photoUrl} alt="Laporan" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{item.location}</h4>
                          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                          <span className="text-[9px] text-gray-400 block mt-1">Diajukan: {item.reporterName} • {item.date}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                        <button
                          id={`tinjau-report-${idx}`}
                          onClick={() => {
                            setReviewingReport(item);
                          }}
                          className="py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-extrabold text-[11px] rounded-xl transition"
                        >
                          Tinjau Detail
                        </button>
                        <button
                          id={`selesai-report-${idx}`}
                          onClick={() => {
                            toggleReportStatus(item.id);
                          }}
                          className={`py-2.5 font-extrabold text-[11px] rounded-xl transition shadow-sm ${
                            item.status === 'Selesai' 
                              ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {item.status === 'Selesai' ? 'Tandai Belum Beres' : 'Tandai Selesai Pickup'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REPORT REVIEW MODAL DETAILS */}
              {reviewingReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setReviewingReport(null)}></div>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-3xl p-6 w-full max-w-sm relative z-10 shadow-2xl space-y-4"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <h4 className="text-md font-bold text-gray-900">Peninjauan Mandiri Petugas</h4>
                      <button className="text-xs font-mono font-bold hover:text-red-500" onClick={() => setReviewingReport(null)}>X</button>
                    </div>

                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm">
                      <img src={reviewingReport.photoUrl} alt="Laporan Foto" className="w-full h-full object-cover" />
                    </div>

                    <div className="text-xs space-y-1 font-medium select-all">
                      <p className="text-gray-400 uppercase text-[9px] font-bold">LOKASI DETIL:</p>
                      <p className="text-gray-800 font-bold">{reviewingReport.location}</p>
                      <p className="text-gray-400 text-[9px] font-bold block pt-2">DESKRIPSI WARGA:</p>
                      <p className="text-gray-600 leading-normal bg-gray-50 p-3 rounded-xl border border-gray-100">{reviewingReport.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => {
                          toggleReportPriority(reviewingReport.id);
                          setReviewingReport(null);
                        }}
                        className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold rounded-xl"
                      >
                        Ubah Prioritas
                      </button>
                      <button
                        onClick={() => {
                          toggleReportStatus(reviewingReport.id);
                          setReviewingReport(null);
                        }}
                        className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl"
                      >
                        Ubah Status Selesai
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

            </motion.div>
          )}

          {/* 10. ADMIN / PEMDA DASHBOARD SCREEN */}
          {screen === 'admin_dashboard' && (
            <motion.div
              key="admin_dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between pb-8 p-6 space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-950 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-blue-800 uppercase tracking-wider block">YOGYAKARTA PEMDA VIEW</span>
                    <h2 className="text-md font-extrabold text-gray-900 leading-tight">Yogyakarta Green Analytics</h2>
                  </div>
                </div>
                
                <button
                  id="btn-admin-logout"
                  onClick={() => setScreen('splash')}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-xl flex items-center justify-center active:scale-90 transition-all border border-red-100 shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Citywide Waste Summary Status Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Limbah Terdistribusi</span>
                  <span className="text-2xl font-black text-emerald-700 block mt-1">294.3 <span className="text-xs font-bold text-gray-400">Ton</span></span>
                  <p className="text-[10px] text-emerald-600/80 font-bold bg-emerald-50 py-0.5 rounded mt-2 inline-block px-2">Efisiensi 94%</p>
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-3xl shadow-sm text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Koin Tertebus</span>
                  <span className="text-2xl font-black text-emerald-700 block mt-1">104.5k <span className="text-xs font-bold text-gray-400">Poin</span></span>
                  <p className="text-[10px] text-emerald-600/80 font-bold bg-emerald-50 py-0.5 rounded mt-2 inline-block px-2">Sirkular Lestari</p>
                </div>
              </div>

              {/* Filtering district & export panel */}
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Filter Analisis Wilayah</h4>
                  <button
                    id="btn-admin-export"
                    onClick={() => setShowExportModal(true)}
                    className="p-1 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-extrabold rounded-lg uppercase tracking-wider transition"
                  >
                    Ekspor Data
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Kecamatan</label>
                    <select
                      id="select-admin-district"
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-medium outline-none"
                      value={adminDistrictFilter}
                      onChange={(e) => setAdminDistrictFilter(e.target.value)}
                    >
                      <option value="Semua">Semua Kemantren</option>
                      {JOGJA_DISTRICTS.map(dist => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Rentang Waktu</label>
                    <select
                      id="select-admin-date"
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl font-medium outline-none"
                      value={adminDateFilter}
                      onChange={(e) => setAdminDateFilter(e.target.value)}
                    >
                      <option value="Semua">Bulan Ini (Juni)</option>
                      <option value="Minggu">Minggu Terakhir</option>
                      <option value="Hari">Hari Ini</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Trend Chart Area: dynamic vector high fidelity visual SVG chart */}
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider block">Grafik Volume Sampah Terpilah (Jan-Jun)</h4>
                  <span className="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">KILOGRAM</span>
                </div>

                <div className="h-32 w-full flex items-end justify-between pt-4 relative">
                  {/* Backdrop chart grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-b border-gray-300">
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                    <div className="w-full h-[1px] bg-gray-400"></div>
                  </div>

                  {/* Dynamic Custom Responsive Chart columns */}
                  {[
                    { month: 'Jan', val: 80, color: 'bg-emerald-600' },
                    { month: 'Feb', val: 110, color: 'bg-emerald-600' },
                    { month: 'Mar', val: 95, color: 'bg-emerald-600' },
                    { month: 'Apr', val: 140, color: 'bg-emerald-600' },
                    { month: 'Mei', val: 125, color: 'bg-emerald-600' },
                    { month: 'Jun', val: 165, color: 'bg-emerald-700' }
                  ].map((col, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 space-y-1 relative z-10 group">
                      <span className="text-[9px] font-bold text-gray-400 hidden group-hover:block absolute -top-5 bg-gray-900 text-white px-1.5 py-0.5 rounded">
                        {col.val}kg
                      </span>
                      <div 
                        className={`w-8 rounded-t-lg transition-all ${col.color}`} 
                        style={{ height: `${(col.val / 180) * 85}px` }}
                      ></div>
                      <span className="text-[10px] text-gray-500 font-semibold">{col.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citywide Active Citizen Submittals Monitor table */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Aktivitas Laporan Warga se-Yogyakarta</h4>
                  <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-2 font-mono">Live Sync</span>
                </div>

                <div className="space-y-3">
                  {reports
                    .filter(rpt => adminDistrictFilter === 'Semua' || rpt.district === adminDistrictFilter)
                    .map((rpt, idx) => (
                      <div key={rpt.id} id={`admin-monitor-${idx}`} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <div>
                            <span className="font-extrabold text-blue-700 uppercase mr-2">{rpt.id}</span>
                            <span className="font-bold text-gray-400">{rpt.reporterName}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            rpt.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' :
                            rpt.status === 'Proses' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {rpt.status}
                          </span>
                        </div>

                        <div className="text-xs text-gray-800 font-medium">
                          Kemantren: <span className="font-bold text-emerald-800">{rpt.district}</span> • Alamat: {rpt.location}
                        </div>
                        <p className="text-[11px] text-gray-500 italic">"{rpt.description}"</p>
                      </div>
                  ))}
                </div>
              </div>

              {/* MOCK DATA EXPORT MODAL */}
              {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowExportModal(false)}></div>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-3xl p-6 text-center max-w-sm w-full relative z-10 shadow-2xl space-y-4"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Ekspor Data Berhasil!</h4>
                      <p className="text-xs text-gray-500 mt-2">Unduhan data kelola sampah Yogyakarta (.XLSX) telah selesai diproses untuk kemantren {adminDistrictFilter === 'Semua' ? 'Keseluruhan' : adminDistrictFilter}.</p>
                    </div>
                    <button
                      id="btn-export-close"
                      onClick={() => setShowExportModal(false)}
                      className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                      Beres, Mengerti
                    </button>
                  </motion.div>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>

        {/* BOTTOM NAVIGATION BAR FOR CITIZEN (WARGA) */}
        {role === 'warga' && ['warga_home', 'warga_lapor', 'warga_peta', 'warga_reward', 'warga_guide', 'warga_profil'].includes(screen) && (
          <nav className="bottom-nav">
            <button
              id="nav-beranda"
              onClick={() => setScreen('warga_home')}
              className={`flex flex-col items-center justify-center py-2 text-center w-12 transition-all ${
                screen === 'warga_home' ? 'text-emerald-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Beranda</span>
            </button>

            <button
              id="nav-lapor"
              onClick={() => setScreen('warga_lapor')}
              className={`flex flex-col items-center justify-center py-2 text-center w-12 transition-all ${
                screen === 'warga_lapor' ? 'text-emerald-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <AlertTriangle className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Lapor</span>
            </button>

            <button
              id="nav-peta"
              onClick={() => setScreen('warga_peta')}
              className={`flex flex-col items-center justify-center py-2 text-center w-12 transition-all ${
                screen === 'warga_peta' ? 'text-emerald-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <MapPin className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Peta</span>
            </button>

            <button
              id="nav-reward"
              onClick={() => setScreen('warga_reward')}
              className={`flex flex-col items-center justify-center py-2 text-center w-12 transition-all ${
                screen === 'warga_reward' ? 'text-emerald-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Gift className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Reward</span>
            </button>

            <button
              id="nav-profil"
              onClick={() => setScreen('warga_profil')}
              className={`flex flex-col items-center justify-center py-2 text-center w-12 transition-all ${
                screen === 'warga_profil' ? 'text-emerald-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Profil</span>
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}