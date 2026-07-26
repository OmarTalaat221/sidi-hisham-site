import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import axios from 'axios';
import parse from 'html-react-parser';
import SEO from '@/components/SEO';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import SEOImage from '@/components/common/SEOImage';
import {
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  NewspaperIcon,
  GlobeAltIcon,
  FlagIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/outline';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function getTranslation(translations = [], local) {
  if (!Array.isArray(translations) || translations.length === 0) return {};
  return (
    translations.find(
      (item) => String(item?.locale || '').toLowerCase() === String(local || '').toLowerCase()
    ) ||
    translations[0] ||
    {}
  );
}

function buildImageUrl(raw) {
  if (!raw) return '/images/eim.png';
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  return `https://api.sedihisham.com/${raw.replace(/^\/+/, '')}`;
}

function GraphCMSImageLoader({ src }) {
  return buildImageUrl(src);
}

// ─────────────────────────────────────────────
// Skeleton Card
// ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="mt-auto h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Single Card
// ─────────────────────────────────────────────
function ContentCard({ id, image, title, description, href, isRTL, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="flex flex-col h-full"
    >
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="group relative flex flex-col h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_45px_-10px_rgba(124,20,34,0.28)]"
      >
        {/* glow border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#7c1422]/25 transition-all duration-500" />

        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden bg-gray-100 shrink-0">
          <SEOImage
            width={700}
            height={440}
            loader={GraphCMSImageLoader}
            src={image}
            alt={isRTL ? 'صورة سيدي هشام' : 'Sedi Hisham image'}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          {/* base gradient for text legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
          {/* accent bar sweep on hover */}
          <span className="absolute bottom-0 start-0 h-[3px] w-0 bg-gradient-to-r from-[#7c1422] to-[#e61c24] transition-all duration-500 ease-out group-hover:w-full" />
          {/* subtle top sheen sweep */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 gap-3">
          <div className={`font-arabicBold text-base font-bold text-gray-900 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-[#7c1422] ${isRTL ? 'text-right' : 'text-left'}`}>
            {title || '—'}
          </div>
          <div className={`font-arabicLight text-sm leading-6 text-gray-500 line-clamp-3 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {description ? parse(String(description)) : '—'}
          </div>
          <Link href={href} className="mt-2 block w-full">
            <button
              type="button"
              className="group/btn relative min-h-[42px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#7c1422] to-[#c0202f] text-white font-arabicMedium text-sm shadow-md shadow-[#7c1422]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#7c1422]/35 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <span>{isRTL ? 'التفاصيل' : 'Details'}</span>
              {isRTL ? (
                <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
              ) : (
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              )}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Cards Swiper Panel
// ─────────────────────────────────────────────
function CardsSwiper({ items, isRTL, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 gap-4 text-center"
      >
        <NewspaperIcon className="w-14 h-14 text-gray-300" />
        <p className="font-arabicMedium text-gray-400 text-base">
          {isRTL ? 'لا توجد عناصر لعرضها حالياً' : 'No items to display at the moment'}
        </p>
      </motion.div>
    );
  }

  const canLoop = items.length > 3;

  return (
    <div className={`news-swiper-wrap ${isRTL ? 'dir-rtl' : ''}`}>
      <Swiper
        key={isRTL ? 'rtl' : 'ltr'}
        dir={isRTL ? 'rtl' : 'ltr'}
        modules={[Autoplay, Navigation, Pagination, A11y]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        navigation={{
          prevEl: '.news-swiper-prev',
          nextEl: '.news-swiper-next',
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={canLoop}
        watchOverflow
        speed={700}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          540: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-12 pt-1 px-1"
      >
        {items.map((item, i) => (
          <SwiperSlide key={item.id || i} className="h-auto">
            <div className="h-full">
              <ContentCard
                index={i}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                href={item.href}
                isRTL={isRTL}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav buttons */}
      <button
        className="news-swiper-prev absolute start-0 top-1/2 -translate-y-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-[#7c1422] hover:bg-[#7c1422] hover:text-white transition-all duration-200 -translate-x-1/2 sm:-translate-x-full"
        aria-label="Previous"
      >
        {isRTL ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
      </button>
      <button
        className="news-swiper-next absolute end-0 top-1/2 -translate-y-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-[#7c1422] hover:bg-[#7c1422] hover:text-white transition-all duration-200 translate-x-1/2 sm:translate-x-full"
        aria-label="Next"
      >
        {isRTL ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tab config
// ─────────────────────────────────────────────
const TABS = [
  {
    keyAr: 'فعاليات سورية',
    keyEn: 'Syrian Events',
    iconAr: FlagIcon,
    iconEn: FlagIcon,
  },
  {
    keyAr: 'فعاليات عالمية',
    keyEn: 'International Events',
    iconAr: GlobeAltIcon,
    iconEn: GlobeAltIcon,
  },
  {
    keyAr: 'أخبار',
    keyEn: 'News',
    iconAr: NewspaperIcon,
    iconEn: NewspaperIcon,
  },
];

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function NewsPage() {
  const { local } = useSelector((state) => state.language);
  const isAr = local === 'ar';

  const [news, setNews] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [newsRes, activitiesRes] = await Promise.all([
          axios.get('https://api.sedihisham.com/news/findall'),
          axios.get('https://api.sedihisham.com/activities/findall'),
        ]);
        setNews(newsRes.data?.length ? newsRes.data.slice().reverse() : []);
        setActivities(activitiesRes.data?.length ? activitiesRes.data.slice().reverse() : []);
      } catch {
        /* silent */
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Build card data for each tab
  const nationalActivities = activities
    .filter((a) => a.category === 'national')
    .map((a) => {
      const t = getTranslation(a.activity_translations, local);
      return {
        id: a.id,
        image: buildImageUrl(a.image_url?.[0]?.image_url),
        title: t.title,
        description: t.descrition,
        href: `/news/activityDetails/${a.id}`,
      };
    });

  const internationalActivities = activities
    .filter((a) => a.category === 'international')
    .map((a) => {
      const t = getTranslation(a.activity_translations, local);
      return {
        id: a.id,
        image: buildImageUrl(a.image_url?.[0]?.image_url),
        title: t.title,
        description: t.descrition,
        href: `/news/activityDetails/${a.id}`,
      };
    });

  const newsItems = news.map((n) => {
    const t = getTranslation(n.new_translations, local);
    return {
      id: n.id,
      image: buildImageUrl(n.image_url?.[0]?.image_url),
      title: t.title,
      description: t.descrition,
      href: `/news/newsDetails/${n.id}`,
    };
  });

  const panelData = [nationalActivities, internationalActivities, newsItems];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative min-h-screen bg-stone-50 overflow-hidden pb-24 pt-4"
    >
      <SEO
        title="سيدي هشام - أخبار وفعاليات | شركة العقاد للصناعة والتجارة"
        description="تابع أحدث أخبار وفعاليات سيدي هشام وتعرّف على كل جديد من شركة العقاد للصناعة والتجارة"
        keywords="سيدي هشام, أخبار, فعاليات, شركة العقاد"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      {/* ── Decorative BG ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_theme(colors.red.50),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_theme(colors.amber.50),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:22px_22px] opacity-50" />
        <motion.div
          className="absolute -top-32 -start-24 w-[440px] h-[440px] rounded-full bg-[#7c1422]/10 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 -end-32 w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 22, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Hero header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pt-10 pb-8 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7c1422]/10 text-[#7c1422] border border-[#7c1422]/15 text-xs font-bold mb-4 font-arabicBold"
          >
            <NewspaperIcon className="w-4 h-4" />
            {isAr ? 'أخبار وفعاليات' : 'News & Events'}
          </motion.span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight font-arabicBold mb-3">
            {isAr ? 'فعاليات سيدي هشام' : 'Sedi Hisham News & Events'}
          </h1>

          <p className="text-stone-500 font-arabicMedium text-sm sm:text-base max-w-xl mx-auto">
            {isAr
              ? 'تابع أحدث أخبار وفعاليات سيدي هشام وتعرّف على كل جديد'
              : 'Follow the latest Sedi Hisham news, activities, and updates'}
          </p>

          <div className="mt-5 flex justify-center">
            <span className="h-1 w-16 rounded-full bg-gradient-to-r from-[#7c1422] to-amber-500" />
          </div>
        </motion.div>

        {/* ── Tab Group ── */}
        <Tab.Group>
          {({ selectedIndex }) => (
            <>
              {/* Tab list */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex justify-center mb-10"
              >
                <Tab.List className="flex gap-2 bg-white/80 backdrop-blur-xl rounded-2xl p-1.5 shadow-sm border border-stone-200/60">
                  {TABS.map((tab, i) => {
                    const Icon = isAr ? tab.iconAr : tab.iconEn;
                    const label = isAr ? tab.keyAr : tab.keyEn;
                    return (
                      <Tab key={i} className="outline-none">
                        {({ selected }) => (
                          <motion.div
                            whileTap={{ scale: 0.96 }}
                            className={`relative flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold font-arabicBold transition-all duration-250 cursor-pointer select-none ${
                              selected
                                ? 'bg-gradient-to-r from-[#7c1422] to-[#c0202f] text-white shadow-md shadow-[#7c1422]/25'
                                : 'text-stone-600 hover:text-[#7c1422] hover:bg-red-50'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="hidden sm:block">{label}</span>
                          </motion.div>
                        )}
                      </Tab>
                    );
                  })}
                </Tab.List>
              </motion.div>

              {/* Tab Panels */}
              <Tab.Panels>
                {TABS.map((tab, panelIdx) => (
                  <Tab.Panel key={panelIdx} className="outline-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`panel-${panelIdx}-${local}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        {/* Panel card wrapper */}
                        <div className="relative rounded-3xl border border-stone-200/60 bg-white/90 backdrop-blur-xl shadow-lg shadow-stone-200/50 overflow-visible px-4 sm:px-8 py-8">
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#7c1422] via-[#e61c24] to-amber-400 rounded-t-3xl" />

                          <CardsSwiper
                            items={panelData[panelIdx]}
                            isRTL={isAr}
                            loading={loading}
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>

      </div>

      {/* Global Swiper bullet styles override */}
      <style jsx global>{`
        .news-swiper-wrap {
          position: relative;
        }
        .news-swiper-wrap .swiper-pagination-bullet {
          background: #7c1422;
          opacity: 0.35;
          transition: opacity 0.2s, transform 0.2s;
        }
        .news-swiper-wrap .swiper-pagination-bullet-active {
          background: #7c1422;
          opacity: 1;
          transform: scale(1.2);
        }
        .news-swiper-wrap .swiper {
          overflow: visible;
        }
      `}</style>
    </div>
  );
}