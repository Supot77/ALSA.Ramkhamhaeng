import React, { useState } from 'react';
import { 
  Scale, Menu, X, ChevronRight, Users, Calendar, Globe, Mail, 
  MapPin, CheckCircle2, ArrowUpRight, Search, Heart, ShieldCheck, 
  UserPlus, ArrowRight, Compass, Train, Bus, Map, Layers, Info, Check, Eye, Navigation
} from 'lucide-react';

const FEATURED_EVENTS = [
  {
    id: 1,
    title: 'ALSA National Moot Court Competition 2026',
    category: 'Moot Court',
    date: '15-17 พฤษภาคม 2026',
    location: 'อาคารนิติศาสตร์ ม.รามคำแหง (หัวหมาก)',
    desc: 'การแข่งขันศาลจำลองระดับชาติ ฝึกฝนทักษะการว่าความ การเขียนคำร้อง และการโต้แย้งข้อกฎหมายต่อหน้าผู้พิพากษาจริง',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop',
    tag: 'Highlight'
  },
  {
    id: 2,
    title: 'Legal Seminar: Artificial Intelligence & Legal Ethics',
    category: 'Academic',
    date: '28 มิถุนายน 2026',
    location: 'หอประชุมพ่อขุนรามคำแหงมหาราช',
    desc: 'การเสวนาทางวิชาการเกี่ยวกับความท้าทายของเทคโนโลยีปัญญาประดิษฐ์กับกฎหมายลิขสิทธิ์และจริยธรรมทางกฎหมาย',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    tag: 'Academic'
  },
  {
    id: 3,
    title: 'ALSA International Study Trip & Student Exchange',
    category: 'Exchange',
    date: '10-18 สิงหาคม 2026',
    location: 'กรุงโตเกียว ประเทศญี่ปุ่น',
    desc: 'โครงการแลกเปลี่ยนนักศึกษานิติศาสตร์ระดับภูมิภาคเอเชีย เข้าเยี่ยมชมศาลสูงสุดญี่ปุ่นและสำนักงานกฎหมายชั้นนำ',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    tag: 'International'
  }
];

const BOARD_HIGHLIGHTS = [
  {
    name: 'นายกฤษฎา วงศ์สว่าง',
    role: 'President (ประธานบริหาร)',
    year: 'นักศึกษาชั้นปีที่ 3',
    quote: 'มุ่งมั่นขับเคลื่อน ALSA RU สู่การเป็นศูนย์กลางวิชาการนิติศาสตร์ระดับสากล',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'นางสาวพิมลพรรณ สุขเจริญ',
    role: 'Vice President of Academic Activities',
    year: 'นักศึกษาชั้นปีที่ 3',
    quote: 'เสริมสร้างศักยภาพการแข่งขัน Moot Court และทักษะการวิเคราะห์กฎหมายเชิงลึก',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop'
  },
  {
    name: 'นายธนกร รัตนเดช',
    role: 'Director of International Exchange',
    year: 'นักศึกษาชั้นปีที่ 2',
    quote: 'เชื่อมโยงนักศึกษารามคำแหงกับเครือข่ายกฎหมายทั่วเอเชียกว่า 17 ประเทศ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
  }
];

const PARTNER_LOGOS = [
  { name: 'คณะนิติศาสตร์ ม.รามคำแหง', category: 'Host University', logo: '🏛️' },
  { name: 'สภาทนายความในพระบรมราชูปถัมภ์', category: 'Legal Institution', logo: '⚖️' },
  { name: 'Baker & McKenzie Thailand', category: 'Global Law Firm', logo: '💼' },
  { name: 'Tilleke & Gibbins', category: 'Partner Law Firm', logo: '📜' },
  { name: 'Chandler MHM', category: 'Sponsoring Firm', logo: '🏢' },
  { name: 'ALSA National Chapter Thailand', category: 'Parent Organization', logo: '🌏' }
];

const BANGKOK_DISTRICTS_50 = [
  // Highlighted RU District
  { id: 'bangkapi', name: 'บางกะปิ', nameEn: 'Bang Kapi', isRU: true, zone: 'กรุงเทพตะวันออก', path: 'M 490,210 L 535,195 L 565,225 L 530,260 L 480,240 Z', cx: 520, cy: 225, details: 'ศูนย์กลางหลัก ALSA RU — ที่ตั้งคณะนิติศาสตร์ มหาวิทยาลัยรามคำแหง (หัวหมาก)' },
  
  // Other 49 Districts (Gray color)
  { id: 'phranakhon', name: 'พระนคร', nameEn: 'Phra Nakhon', isRU: false, path: 'M 280,270 L 295,265 L 300,280 L 285,285 Z', cx: 290, cy: 275 },
  { id: 'dusit', name: 'ดุสิต', nameEn: 'Dusit', isRU: false, path: 'M 300,230 L 330,220 L 335,250 L 305,260 Z', cx: 317, cy: 240 },
  { id: 'nongchok', name: 'หนองจอก', nameEn: 'Nong Chok', isRU: false, path: 'M 640,120 L 760,110 L 770,220 L 650,210 Z', cx: 705, cy: 160 },
  { id: 'bangrak', name: 'บางรัก', nameEn: 'Bang Rak', isRU: false, path: 'M 305,310 L 330,300 L 335,325 L 310,335 Z', cx: 320, cy: 318 },
  { id: 'bangkhen', name: 'บางเขน', nameEn: 'Bang Khen', isRU: false, path: 'M 430,100 L 500,90 L 510,140 L 440,150 Z', cx: 470, cy: 120 },
  { id: 'thra', name: 'บางกะปิสะพานสูง', nameEn: 'Saphan Sung', isRU: false, path: 'M 535,195 L 610,185 L 615,235 L 565,225 Z', cx: 580, cy: 210 },
  { id: 'pathumwan', name: 'ปทุมวัน', nameEn: 'Pathum Wan', isRU: false, path: 'M 330,280 L 380,275 L 385,305 L 335,310 Z', cx: 358, cy: 292 },
  { id: 'pomprap', name: 'ป้อมปราบศัตรูพ่าย', nameEn: 'Pom Prap Sattru Phai', isRU: false, path: 'M 295,265 L 320,260 L 325,275 L 300,280 Z', cx: 310, cy: 270 },
  { id: 'phaya', name: 'พญาไท', nameEn: 'Phaya Thai', isRU: false, path: 'M 335,220 L 375,215 L 380,245 L 340,250 Z', cx: 358, cy: 232 },
  { id: 'thonburi', name: 'ธนบุรี', nameEn: 'Thon Buri', isRU: false, path: 'M 240,310 L 275,305 L 280,340 L 245,345 Z', cx: 260, cy: 325 },
  { id: 'bangkokyai', name: 'บางกอกใหญ่', nameEn: 'Bangkok Yai', isRU: false, path: 'M 240,285 L 275,280 L 278,300 L 242,305 Z', cx: 258, cy: 292 },
  { id: 'huai', name: 'ห้วยขวาง', nameEn: 'Huai Khwang', isRU: false, path: 'M 410,210 L 470,200 L 485,235 L 420,245 Z', cx: 445, cy: 222 },
  { id: 'khlongsan', name: 'คลองสาน', nameEn: 'Khlong San', isRU: false, path: 'M 285,300 L 310,295 L 312,320 L 288,325 Z', cx: 298, cy: 310 },
  { id: 'talingchan', name: 'ตลิ่งชัน', nameEn: 'Taling Chan', isRU: false, path: 'M 140,220 L 210,210 L 215,260 L 145,270 Z', cx: 178, cy: 240 },
  { id: 'bangkoknoi', name: 'บางกอกน้อย', nameEn: 'Bangkok Noi', isRU: false, path: 'M 215,235 L 265,225 L 270,265 L 220,275 Z', cx: 242, cy: 250 },
  { id: 'khlongtoei', name: 'คลองเตย', nameEn: 'Khlong Toei', isRU: false, path: 'M 385,325 L 435,320 L 440,355 L 390,360 Z', cx: 412, cy: 340 },
  { id: 'latsi', name: 'หลักสี่', nameEn: 'Lak Si', isRU: false, path: 'M 380,110 L 430,100 L 435,145 L 385,155 Z', cx: 408, cy: 128 },
  { id: 'bangsue', name: 'บางซื่อ', nameEn: 'Bang Sue', isRU: false, path: 'M 310,180 L 360,170 L 365,210 L 315,220 Z', cx: 338, cy: 195 },
  { id: 'chatuchak', name: 'จตุจักร', nameEn: 'Chatuchak', isRU: false, path: 'M 360,170 L 420,160 L 430,200 L 370,210 Z', cx: 395, cy: 185 },
  { id: 'donmueang', name: 'ดอนเมือง', nameEn: 'Don Mueang', isRU: false, path: 'M 370,50 L 450,40 L 460,95 L 380,105 Z', cx: 415, cy: 72 },
  { id: 'prawet', name: 'ประเวศ', nameEn: 'Prawet', isRU: false, path: 'M 530,260 L 620,245 L 630,310 L 540,325 Z', cx: 580, cy: 285 },
  { id: 'khlongsamwa', name: 'คลองสามวา', nameEn: 'Khlong Sam Wa', isRU: false, path: 'M 580,80 L 690,70 L 700,150 L 590,160 Z', cx: 640, cy: 115 },
  { id: 'watthana', name: 'วัฒนา', nameEn: 'Watthana', isRU: false, path: 'M 400,270 L 480,255 L 490,295 L 410,310 Z', cx: 445, cy: 282 },
  { id: 'bangkhae', name: 'บางแค', nameEn: 'Bang Khae', isRU: false, path: 'M 100,290 L 170,280 L 175,340 L 105,350 Z', cx: 138, cy: 315 },
  { id: 'lakkrabang', name: 'ลาดกระบัง', nameEn: 'Lat Krabang', isRU: false, path: 'M 620,225 L 750,210 L 760,295 L 630,310 Z', cx: 690, cy: 260 },
  { id: 'saimai', name: 'สายไหม', nameEn: 'Sai Mai', isRU: false, path: 'M 460,70 L 560,60 L 570,110 L 470,120 Z', cx: 515, cy: 90 },
  { id: 'kannayao', name: 'คันนายาว', nameEn: 'Khan Na Yao', isRU: false, path: 'M 545,140 L 610,130 L 615,180 L 550,190 Z', cx: 580, cy: 160 },
  { id: 'saphan', name: 'สะพานสูง', nameEn: 'Saphan Sung Sub', isRU: false, path: 'M 560,220 L 630,210 L 635,250 L 565,260 Z', cx: 598, cy: 235 },
  { id: 'wangthong', name: 'วังทองหลาง', nameEn: 'Wang Thonglang', isRU: false, path: 'M 450,215 L 490,208 L 495,240 L 455,248 Z', cx: 472, cy: 228 },
  { id: 'minburi', name: 'มีนบุรี', nameEn: 'Min Buri', isRU: false, path: 'M 610,150 L 710,140 L 720,210 L 620,220 Z', cx: 665, cy: 180 },
  { id: 'bangna', name: 'บางนา', nameEn: 'Bang Na', isRU: false, path: 'M 440,355 L 510,345 L 515,395 L 445,405 Z', cx: 478, cy: 375 },
  { id: 'rathburana', name: 'ราษฎร์บูรณะ', nameEn: 'Rat Burana', isRU: false, path: 'M 280,380 L 330,370 L 335,420 L 285,430 Z', cx: 308, cy: 400 },
  { id: 'bangphlat', name: 'บางพลัด', nameEn: 'Bang Phlat', isRU: false, path: 'M 220,180 L 290,170 L 295,220 L 225,230 Z', cx: 258, cy: 200 },
  { id: 'sathorn', name: 'สาทร', nameEn: 'Sathon', isRU: false, path: 'M 315,335 L 355,330 L 360,360 L 320,365 Z', cx: 338, cy: 348 },
  { id: 'bangkorlaem', name: 'บางคอแหลม', nameEn: 'Bang Kho Laem', isRU: false, path: 'M 290,350 L 325,345 L 330,380 L 295,385 Z', cx: 310, cy: 365 },
  { id: 'samphanthawong', name: 'สัมพันธวงศ์', nameEn: 'Samphanthawong', isRU: false, path: 'M 290,285 L 305,280 L 310,295 L 295,300 Z', cx: 300, cy: 290 },
  { id: 'buengkum', name: 'บึงกุ่ม', nameEn: 'Bueng Kum', isRU: false, path: 'M 500,140 L 560,130 L 565,185 L 505,195 Z', cx: 532, cy: 162 },
  { id: 'sathu', name: 'ยานนาวา', nameEn: 'Yan Nawa', isRU: false, path: 'M 335,360 L 380,350 L 385,390 L 340,400 Z', cx: 360, cy: 375 },
  { id: 'thungkhru', name: 'ทุ่งครุ', nameEn: 'Thung Khru', isRU: false, path: 'M 240,410 L 300,400 L 305,480 L 245,490 Z', cx: 272, cy: 445 },
  { id: 'bangbon', name: 'บางบอน', nameEn: 'Bang Bon', isRU: false, path: 'M 60,370 L 150,355 L 155,420 L 65,435 Z', cx: 108, cy: 395 },
  { id: 'ratchathewi', name: 'ราชเทวี', nameEn: 'Ratchathewi', isRU: false, path: 'M 335,250 L 380,245 L 385,275 L 340,280 Z', cx: 360, cy: 262 },
  { id: 'dinDaeng', name: 'ดินแดง', nameEn: 'Din Daeng', isRU: false, path: 'M 375,215 L 410,210 L 415,245 L 380,250 Z', cx: 395, cy: 230 },
  { id: 'suanluang', name: 'สวนหลวง', nameEn: 'Suan Luang', isRU: false, path: 'M 460,280 L 530,265 L 535,315 L 465,330 Z', cx: 498, cy: 298 },
  { id: 'chomthong', name: 'จอมทอง', nameEn: 'Chom Thong', isRU: false, path: 'M 180,340 L 250,330 L 255,390 L 185,400 Z', cx: 218, cy: 365 },
  { id: 'phasicharoen', name: 'ภาษีเจริญ', nameEn: 'Phasi Charoen', isRU: false, path: 'M 150,280 L 210,270 L 215,320 L 155,330 Z', cx: 182, cy: 300 },
  { id: 'bangkhuntian', name: 'บางขุนเทียน', nameEn: 'Bang Khun Thian', isRU: false, path: 'M 50,430 L 180,410 L 190,560 L 60,580 Z', cx: 120, cy: 495 },
  { id: 'phrakhanong', name: 'พระโขนง', nameEn: 'Phra Khanong', isRU: false, path: 'M 425,320 L 475,310 L 480,350 L 430,360 Z', cx: 452, cy: 335 },
  { id: 'tawiwatthana', name: 'ทวีวัฒนา', nameEn: 'Thawi Watthana', isRU: false, path: 'M 20,230 L 130,215 L 135,280 L 25,295 Z', cx: 78, cy: 255 },
  { id: 'nongkhaem', name: 'หนองแขม', nameEn: 'Nong Khaem', isRU: false, path: 'M 10,295 L 90,285 L 95,360 L 15,370 Z', cx: 52, cy: 328 },
  { id: 'latphrao', name: 'ลาดพร้าว', nameEn: 'Lat Phrao', isRU: false, path: 'M 420,150 L 490,140 L 495,190 L 425,200 Z', cx: 458, cy: 170 },
];

export default function ALSAHomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', studentId: '', email: '', phone: '', year: '1' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('bangkapi');
  const [mapViewMode, setMapViewMode] = useState('interactive');
  const [activeCategory, setActiveCategory] = useState('All');

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about-teaser' },
    { name: 'Event', href: '#event-teaser' },
    { name: 'Location', href: '#map-spotlight' },
    { name: 'Membership', href: '#membership-teaser' },
    { name: 'People', href: '#people-teaser' },
    { name: 'Partner', href: '#partner-teaser' },
    { name: 'Contacts', href: '#contacts-teaser' },
  ];

  const handleScrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setRegModalOpen(false);
      setFormData({ name: '', studentId: '', email: '', phone: '', year: '1' });
    }, 2000);
  };

  const filteredEvents = activeCategory === 'All' 
    ? FEATURED_EVENTS 
    : FEATURED_EVENTS.filter(e => e.category === activeCategory);

  const currentDistrictData = BANGKOK_DISTRICTS_50.find(d => d.id === selectedDistrict) || BANGKOK_DISTRICTS_50[0];

  return (
    <div className="min-h-screen bg-[#510706] text-white font-sans antialiased selection:bg-white selection:text-[#510706]">
      
      {/* 1. TOP HERO HEADER WITH VISUAL BANNER */}
      <header className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] overflow-hidden bg-black">
        <img 
          src="/header-bg2.jpg" 
        
          alt="Faculty of Law Ramkhamhaeng University Banner"
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#510706] via-[#510706]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 text-white">
          <div className="flex items-center gap-4 mb-3">
            <img 
              src="/logo2.png" 
              alt="ALSA RU Logo" 
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-md" 
            />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-2 drop-shadow-sm">
            Asian Law Students' Association
          </h1>
          <p className="text-white/90 text-base sm:text-xl font-medium tracking-wide">
            Local Chapter Ramkhamhaeng University
          </p>
        </div>
      </header>

      {/* 2. STICKY NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#510706]/90 backdrop-blur-xl border-b border-red-950/80 transition-all duration-300 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between lg:justify-center relative">
          
          {/* Desktop Links (Centered Navigation Only) */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-medium text-white/90">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollTo(item.href)}
                className="hover:text-white transition-colors py-1 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <span className="text-xs font-semibold text-white">Navigation</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-white hover:text-white/80 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#510706] border-b border-red-950 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollTo(item.href)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-red-950/60 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* 3. HERO OVERVIEW SECTION */}
      <section id="hero" className="py-20 sm:py-28 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-white mb-3 block">
          ALSA RAMKHAMHAENG UNIVERSITY
        </span>
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.025em] leading-[1.08] text-white mb-6">
          นิติศาสตร์รามคำแหง.<br className="hidden sm:inline" />ในมุมมองที่กว้างกว่าที่เคย.
        </h2>
        <p className="text-white/80 text-lg sm:text-2xl font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
          ศูนย์กลางการเชื่อมต่อวิสัยทัศน์กฎหมายระดับเอเชีย พัฒนาทักษะการว่าความ การแข่งขัน Moot Court และเครือข่ายวิชาการระดับสากล
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => handleScrollTo('#about-teaser')}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/40 text-sm font-semibold transition-all shadow-md transform active:scale-95 inline-flex items-center gap-2"
          >
            <span>ทำความรู้จัก ALSA RU</span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={() => handleScrollTo('#event-teaser')}
            className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/40 text-sm font-medium transition-all shadow-sm transform active:scale-95"
          >
            ดูกิจกรรมวิชาการ
          </button>
        </div>
      </section>

      {/* 4. ABOUT TEASER SECTION */}
      <section id="about-teaser" className="py-20 bg-[#400504] border-y border-red-950/60 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-white font-semibold block">
                ABOUT OUR CHAPTER
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-snug">
                ส่งเสริมศักยภาพนักศึกษานิติศาสตร์ รามคำแหง สู่เวทีระดับสากล
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                ALSA Ramkhamhaeng University เป็นสาขาในระดับสถาบันอุดมศึกษาภายใต้ ALSA Thailand และ ALSA International มุ่งเน้นการพัฒนานักศึกษานิติศาสตร์ มหาวิทยาลัยรามคำแหง ให้มีความเชี่ยวชาญทั้งด้านทฤษฎี กฎหมายเปรียบเทียบ ภาษาอังกฤษเพื่อกฎหมาย และทักษะการปฏิบัติงานจริง
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-[#350403] p-4 rounded-2xl border border-red-950/50">
                  <div className="text-2xl font-bold text-white">17+</div>
                  <div className="text-xs text-white/80 font-medium mt-1">ประเทศสมาชิกในภูมิภาคเอเชีย</div>
                </div>
                <div className="bg-[#350403] p-4 rounded-2xl border border-red-950/50">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-white/80 font-medium mt-1">การสนับสนุนวิชาการ & Moot Court</div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => handleScrollTo('#membership-teaser')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white underline hover:text-white/80"
                >
                  <span>อ่านต่อเรื่องราวและวิสัยทัศน์ของเรา</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-red-950/60 shadow-xl bg-stone-900">
                <img 
                  src="https://images.unsplash.com/photo-1505664177922-24151b1450a1?q=80&w=1200&auto=format&fit=crop" 
                  alt="Moot Court Mooting Session"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center opacity-90"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white">
                  <span className="text-xs text-white font-semibold tracking-wider block mb-1">FEATURED ACTIVITY</span>
                  <h3 className="text-lg font-semibold text-white">การฝึกซ้อมว่าความศาลจำลอง (Moot Court Intensive)</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVENT TEASER SECTION */}
      <section id="event-teaser" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-white font-semibold mb-2 block">
              EVENTS & ACADEMICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              กิจกรรมและโครงการวิชาการ
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Moot Court', 'Academic', 'Exchange'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-white/20 text-white border border-white/50 font-semibold' 
                    : 'bg-[#350403] text-white/80 hover:bg-red-950/60 border border-red-950/60'
                }`}
              >
                {cat === 'All' ? 'ทั้งหมด' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="bg-[#350403] rounded-3xl overflow-hidden border border-red-950/60 shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-black/40">
                  <img 
                    src={evt.image} 
                    alt={evt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <span className="absolute top-3 right-3 bg-[#510706] text-white border border-white/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {evt.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-white/90 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-4">
                    {evt.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-red-950/40 flex items-center justify-between text-xs text-white/70">
                <span className="truncate max-w-[180px]">{evt.location}</span>
                <span className="text-white font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  รายละเอียด <ChevronRight className="w-3 h-3 text-white" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BANGKOK 50 DISTRICTS MAP SECTION */}
      <section id="map-spotlight" className="py-20 bg-[#400504] border-y border-red-950/60 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#510706] text-white text-xs font-semibold mb-3 border border-red-950/80">
              <Compass className="w-3.5 h-3.5 text-white" />
              <span>BANGKOK 50 DISTRICTS MAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
              แผนผังกรุงเทพมหานคร 50 เขต & ที่ตั้ง ALSA RU
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              แสดงเขตการปกครองทั้ง 50 เขตของกรุงเทพมหานครเป็นสีโทนโมโนโครม โดยเน้น <strong className="text-white underline">เขตบางกะปิ (สีสว่างเด่นชัด)</strong> ซึ่งเป็นที่ตั้งศูนย์กลางหลัก ณ คณะนิติศาสตร์ มหาวิทยาลัยรามคำแหง (หัวหมาก)
            </p>
          </div>

          {/* View Switcher Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-white/70 tracking-wider">โหมดการแสดงผล:</span>
              <button
                onClick={() => setMapViewMode('interactive')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  mapViewMode === 'interactive' 
                    ? 'bg-white/20 text-white font-semibold border border-white/50 shadow-sm' 
                    : 'bg-[#350403] text-white/80 hover:bg-red-950/60 border border-red-950/60'
                }`}
              >
                แผนผัง 50 เขต (Bangkok Vector Map)
              </button>
              <button
                onClick={() => setMapViewMode('googlemaps')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  mapViewMode === 'googlemaps' 
                    ? 'bg-white/20 text-white font-semibold border border-white/50 shadow-sm' 
                    : 'bg-[#350403] text-white/80 hover:bg-red-950/60 border border-red-950/60'
                }`}
              >
                Google Maps Satellite (ม.ร. หัวหมาก)
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium bg-[#350403] px-3 py-1 rounded-full border border-red-950/80 text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              <span>ไฮไลท์สว่าง: เขตบางกะปิ (ม.รามคำแหง HQ)</span>
            </div>
          </div>

          {/* Map Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SVG Interactive Map Box */}
            <div className="lg:col-span-8 bg-[#18181b] rounded-3xl p-4 sm:p-6 border border-stone-800 shadow-xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {mapViewMode === 'interactive' ? (
                <div className="relative w-full h-[400px] sm:h-[480px] bg-[#121214] rounded-2xl overflow-hidden border border-stone-800 p-2 sm:p-4 flex flex-col justify-center items-center">
                  
                  {/* Subtle Grid Watermark */}
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* 50 Districts SVG Render */}
                  <svg 
                    viewBox="0 0 800 600" 
                    className="w-full h-full max-h-[460px] filter drop-shadow-md select-none transition-all duration-300"
                  >
                    <defs>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Render 50 Bangkok District Vector Polygons */}
                    {BANGKOK_DISTRICTS_50.map((district) => {
                      const isRU = district.isRU;
                      const isSelected = selectedDistrict === district.id;

                      return (
                        <g key={district.id} className="cursor-pointer group" onClick={() => setSelectedDistrict(district.id)}>
                          <path
                            d={district.path}
                            fill={isRU ? '#ffffff' : isSelected ? '#52525b' : '#27272a'}
                            stroke={isRU ? '#ffffff' : isSelected ? '#a1a1aa' : '#3f3f46'}
                            strokeWidth={isRU ? '2.5' : '1'}
                            filter={isRU ? 'url(#glow)' : 'none'}
                            className="transition-all duration-300 hover:opacity-90 hover:stroke-white"
                          />

                          {/* District Node Dot */}
                          <circle
                            cx={district.cx}
                            cy={district.cy}
                            r={isRU ? '5' : '2.5'}
                            fill={isRU ? '#510706' : '#71717a'}
                          />

                          {/* Highlight Marker for Bang Kapi */}
                          {isRU && (
                            <g>
                              <circle cx={district.cx} cy={district.cy} r="14" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-ping opacity-75" />
                              <text
                                x={district.cx}
                                y={district.cy - 12}
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="11"
                                fontWeight="bold"
                                className="drop-shadow-md"
                              >
                                ★ เขตบางกะปิ (ALSA RU)
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Dynamic Interactive Legend Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-900/90 backdrop-blur-md p-3 rounded-xl border border-stone-800 flex flex-wrap items-center justify-between gap-2 text-white text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded bg-white border border-white"></div>
                      <span className="font-semibold text-white">เขตบางกะปิ (ที่ตั้งหลัก ม.รามคำแหง)</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                      <div className="w-3 h-3 rounded bg-[#27272a] border border-stone-700"></div>
                      <span>อีก 49 เขตปกครองในกรุงเทพมหานคร (สีเทา)</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Google Maps Satellite View */
                <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-stone-800 shadow-inner">
                  <iframe 
                    title="Faculty of Law, Ramkhamhaeng University Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.478542289457!2d100.61332837588825!3d13.750580986641603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e504c555555%3A0x6b043c7df47402c3!2z4EOC4LiT4Liw4LiZ4Li04LiV4Li04LmA4Lio4Lij4LmM4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lij4Liy4Lih4LiE4Liz4LmB4LiH!5e0!3m2!1sth!2sth!4v1700000000000!520" 
                    className="w-full h-full border-0 filter contrast-105" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}

              {/* Quick Select Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDistrict('bangkapi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedDistrict === 'bangkapi'
                      ? 'bg-white text-[#510706] ring-1 ring-white/40 shadow'
                      : 'bg-stone-800 text-white hover:bg-stone-700'
                  }`}
                >
                  ★ เขตบางกะปิ (ALSA RU Hub)
                </button>
                <span className="text-stone-400 text-xs self-center px-1">หรือเลือกเขตอื่นๆ:</span>
                {['pathumwan', 'chatuchak', 'watthana', 'dusit'].map((distId) => {
                  const item = BANGKOK_DISTRICTS_50.find(d => d.id === distId);
                  return (
                    <button
                      key={distId}
                      onClick={() => setSelectedDistrict(distId)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedDistrict === distId
                          ? 'bg-stone-700 text-white'
                          : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
                      }`}
                    >
                      เขต{item?.name}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Selected District Details & Campus Info Box */}
            <div className="lg:col-span-4 bg-[#350403] rounded-3xl p-6 border border-red-950/60 shadow-sm flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#510706] text-white text-xs font-medium border border-red-950/60">
                    กรุงเทพมหานคร
                  </span>
                  {currentDistrictData.isRU ? (
                    <span className="px-3 py-1 rounded-full bg-white text-[#510706] text-[11px] font-bold tracking-wide shadow-sm">
                      MAIN HQ DISTRICT
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-stone-800 text-white text-[11px] font-medium">
                      เขตทั่วไป (สีเทา)
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  เขต{currentDistrictData.name} ({currentDistrictData.nameEn})
                </h3>
                
                {currentDistrictData.isRU ? (
                  <p className="text-xs font-semibold text-white mb-4">
                    ศูนย์กลางการดำเนินงาน ALSA Ramkhamhaeng University
                  </p>
                ) : (
                  <p className="text-xs text-white/60 mb-4">
                    หนึ่งใน 49 เขตปกครองของกรุงเทพมหานคร
                  </p>
                )}

                <div className="space-y-4 pt-4 border-t border-red-950/40 text-xs sm:text-sm">
                  {currentDistrictData.isRU ? (
                    <>
                      <div>
                        <span className="font-semibold text-white block mb-1">📍 สถานที่ตั้งหลัก:</span>
                        <p className="text-white/80 leading-relaxed text-xs">
                          คณะนิติศาสตร์ อาคารนิติศาสตร์ ชั้น 1-4 มหาวิทยาลัยรามคำแหง (หัวหมาก) 282 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="font-semibold text-white block">🚌 การเดินทางมายังเขตบางกะปิ (ม.ร.):</span>
                        
                        <div className="flex items-start gap-2 bg-[#510706] p-2 rounded-xl border border-red-950/60">
                          <Train className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span className="text-white/90 text-xs">ARL รามคำแหง / MRT สายสีเหลือง (สถานีแยกลำสาลี / ศรีกรีฑา)</span>
                        </div>
                        <div className="flex items-start gap-2 bg-[#510706] p-2 rounded-xl border border-red-950/60">
                          <Navigation className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span className="text-white/90 text-xs">เรือด่วนคลองแสนแสบ ท่าเรือ ม.รามคำแหง</span>
                        </div>
                        <div className="flex items-start gap-2 bg-[#510706] p-2 rounded-xl border border-red-950/60">
                          <Bus className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span className="text-white/90 text-xs">รถประจำทางสาย 22, 60, 71, 92, 93, 115, 137, 168, 501</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-[#510706] rounded-2xl border border-red-950/60 text-white/80 text-xs leading-relaxed">
                      📌 เขตนี้แสดงผลเป็นสีเทาตามระบบผังเมือง หากต้องการดูข้อมูลสถานที่ตั้ง ALSA RU กรุณาเลือก <strong className="text-white underline">เขตบางกะปิ</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-950/40">
                <a
                  href="https://maps.google.com/?q=Faculty+of+Law,+Ramkhamhaeng+University"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-white" />
                  <span>นำทางไปยัง ALSA RU (เขตบางกะปิ)</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP TEASER */}
      <section id="membership-teaser" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="bg-[#350403] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-red-950/80">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-[#510706] text-white text-xs font-semibold border border-red-950/80">
              JOIN ALSA RU FAMILY
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold leading-tight text-white">
              ร่วมเป็นส่วนหนึ่งของ ALSA Ramkhamhaeng
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              เปิดรับสมัครนักศึกษานิติศาสตร์ มหาวิทยาลัยรามคำแหง ทุกชั้นปี เข้าร่วมเป็นสมาชิก เพื่อรับสิทธิประโยชน์ในการเข้าร่วมแข่งขัน Moot Court กิจกรรมเสวนาวิชาการ และทุนแลกเปลี่ยนต่างประเทศ
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>สิทธิเข้าแข่งขัน Moot Court ระดับชาติ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>โครงการแลกเปลี่ยนต่างประเทศ 17 ประเทศ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>อบรมภาษาอังกฤษเพื่อกฎหมายฟรี</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>เกียรติบัตรรับรองจาก ALSA International</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setRegModalOpen(true)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold text-sm transition-all shadow-md transform active:scale-95 inline-flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-white" />
                <span>สมัครสมาชิก ALSA RU ตอนนี้</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EXECUTIVE BOARD SECTION */}
      <section id="people-teaser" className="py-20 bg-[#400504] border-y border-red-950/60 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-white font-semibold mb-2 block">
              EXECUTIVE BOARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              คณะกรรมการบริหารองค์กร
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOARD_HIGHLIGHTS.map((person, idx) => (
              <div key={idx} className="bg-[#350403] p-6 rounded-3xl border border-red-950/60 flex flex-col items-center text-center">
                <img 
                  src={person.avatar} 
                  alt={person.name} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md mb-4"
                />
                <h3 className="font-semibold text-base text-white mb-1">{person.name}</h3>
                <span className="text-xs font-semibold text-white mb-1">{person.role}</span>
                <span className="text-[11px] text-white/70 mb-4">{person.year}</span>
                <p className="text-xs text-white/90 italic leading-relaxed">"{person.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PARTNER SPONSORS SECTION */}
      <section id="partner-teaser" className="py-16 bg-[#280302] text-white px-4 md:px-6 border-b border-red-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-white font-semibold mb-2 block">
              PARTNERSHIPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              เครือข่ายพันธมิตรผู้ร่วมสนับสนุน
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PARTNER_LOGOS.map((partner, idx) => (
              <div key={idx} className="bg-[#350403]/80 border border-red-950/60 p-4 rounded-xl flex items-center gap-3">
                <div className="text-2xl">{partner.logo}</div>
                <div>
                  <h4 className="font-medium text-white text-xs leading-snug">{partner.name}</h4>
                  <span className="text-[10px] text-white/60">{partner.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACTS SECTION */}
      <section id="contacts-teaser" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#350403] p-8 sm:p-12 rounded-3xl border border-red-950/60 shadow-sm">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-white font-semibold block">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              ช่องทางการติดต่อ
            </h2>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              หากมีข้อสงสัยเกี่ยวกับกิจกรรม การสมัครสมาชิก หรือการสร้างความร่วมมือทางวิชาการ สามารถติดต่อทีมงาน ALSA RU ได้ผ่านช่องทางด้านล่าง
            </p>

            <div className="space-y-3 pt-4 text-xs sm:text-sm text-white">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white" />
                <span>คณะนิติศาสตร์ มหาวิทยาลัยรามคำแหง (หัวหมาก)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white" />
                <span>alsa.ramkhamhaeng@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-white" />
                <span>www.alsathailand.org</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#510706] p-6 rounded-2xl border border-red-950/60">
            <h3 className="font-semibold text-sm text-white mb-4">ส่งข้อความถึงเรา</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 text-xs">
              <div>
                <label className="block text-white font-medium mb-1">ชื่อ-นามสกุล</label>
                <input type="text" placeholder="ระบุชื่อของคุณ" className="w-full px-3 py-2 rounded-xl border border-red-950/80 focus:outline-none focus:border-white bg-[#350403] text-white placeholder-white/40" />
              </div>
              <div>
                <label className="block text-white font-medium mb-1">อีเมล</label>
                <input type="email" placeholder="example@email.com" className="w-full px-3 py-2 rounded-xl border border-red-950/80 focus:outline-none focus:border-white bg-[#350403] text-white placeholder-white/40" />
              </div>
              <div>
                <label className="block text-white font-medium mb-1">ข้อความ</label>
                <textarea rows={3} placeholder="พิมพ์ข้อความของคุณที่นี่..." className="w-full px-3 py-2 rounded-xl border border-red-950/80 focus:outline-none focus:border-white bg-[#350403] text-white placeholder-white/40"></textarea>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold transition-colors">
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 11. REGISTRATION MODAL DIALOG */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#350403] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-950 shadow-2xl relative text-white">
            <button 
              onClick={() => setRegModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="w-12 h-12 rounded-full bg-[#510706] text-white border border-red-950 inline-flex items-center justify-center mb-2">
                <UserPlus className="w-6 h-6 text-white" />
              </span>
              <h3 className="text-xl font-bold text-white">สมัครสมาชิก ALSA RU</h3>
              <p className="text-xs text-white/70 mt-1">สำหรับนักศึกษานิติศาสตร์ มหาวิทยาลัยรามคำแหง</p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <Check className="w-12 h-12 text-white mx-auto" />
                <h4 className="font-semibold text-base text-white">ส่งข้อมูลสมัครเรียบร้อยแล้ว!</h4>
                <p className="text-xs text-white/70">ทีมงาน ALSA RU จะติดต่อกลับทางอีเมลเพื่อยืนยันสถานะสมาชิก</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-white font-medium mb-1">ชื่อ - นามสกุล *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="นาย/นางสาว ..." 
                    className="w-full px-3 py-2 rounded-xl border border-red-950 bg-[#510706] text-white placeholder-white/40 focus:outline-none focus:border-white" 
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">รหัสนักศึกษา (ม.ร.) *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    placeholder="65xxxxxxxx" 
                    className="w-full px-3 py-2 rounded-xl border border-red-950 bg-[#510706] text-white placeholder-white/40 focus:outline-none focus:border-white" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-white font-medium mb-1">ชั้นปี *</label>
                    <select 
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border border-red-950 bg-[#510706] text-white focus:outline-none focus:border-white"
                    >
                      <option value="1">ปี 1</option>
                      <option value="2">ปี 2</option>
                      <option value="3">ปี 3</option>
                      <option value="4">ปี 4 ขึ้นไป</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-1">เบอร์โทรศัพท์ *</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="08x-xxx-xxxx" 
                      className="w-full px-3 py-2 rounded-xl border border-red-950 bg-[#510706] text-white placeholder-white/40 focus:outline-none focus:border-white" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">อีเมลติดต่อ *</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="student@rumail.ru.ac.th" 
                    className="w-full px-3 py-2 rounded-xl border border-red-950 bg-[#510706] text-white placeholder-white/40 focus:outline-none focus:border-white" 
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold text-xs transition-all shadow-md"
                  >
                    ยืนยันการสมัครสมาชิก
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 12. FOOTER */}
      <footer className="bg-[#280302] text-white/70 text-xs border-t border-red-950/80 py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-3 text-xs">เกี่ยวกับ ALSA RU</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><a href="#about-teaser" className="hover:underline hover:text-white">ประวัติความเป็นมา</a></li>
                <li><a href="#people-teaser" className="hover:underline hover:text-white">คณะกรรมการบริหาร</a></li>
                <li><a href="#about-teaser" className="hover:underline hover:text-white">วิสัยทัศน์องค์กร</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-xs">วิชาการ & กิจกรรม</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><a href="#event-teaser" className="hover:underline hover:text-white">Moot Court Competition</a></li>
                <li><a href="#event-teaser" className="hover:underline hover:text-white">Legal Seminars</a></li>
                <li><a href="#event-teaser" className="hover:underline hover:text-white">International Study Trip</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-xs">สถานที่ & เขตกรุงเทพฯ</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><a href="#map-spotlight" className="hover:underline hover:text-white">แผนผังกรุงเทพฯ 50 เขต</a></li>
                <li><a href="#map-spotlight" className="hover:underline hover:text-white">เขตบางกะปิ (ม.รามคำแหง)</a></li>
                <li><a href="#partner-teaser" className="hover:underline hover:text-white">องค์กรพันธมิตร</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-xs">สมาชิกภาพ</h4>
              <ul className="space-y-2 leading-relaxed">
                <li><button onClick={() => setRegModalOpen(true)} className="hover:underline text-white font-medium">สมัครสมาชิกออนไลน์</button></li>
                <li><a href="#membership-teaser" className="hover:underline hover:text-white">สิทธิประโยชน์สมาชิก</a></li>
                <li><a href="#contacts-teaser" className="hover:underline hover:text-white">ติดต่อสอบถาม</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-red-950/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/50">
            <div>
              © 2026 Asian Law Students' Association, Ramkhamhaeng University Chapter. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span>นโยบายความเป็นส่วนตัว</span>
              <span>•</span>
              <span>ข้อกำหนดการใช้งาน</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}