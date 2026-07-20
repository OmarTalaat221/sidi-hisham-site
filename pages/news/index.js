import React from 'react'
import NewsCard from '../../components/news/NewsCard'
import NewsCarousel from '../../components/news/NewsCarousel'
import newsBack from '../../public/images/NewsBack.png'
import news from '../../public/images/news.jpg'
import OptimizedImage from "@/components/common/OptimizedImage";
import Tabs from '../../components/news/Tabs'
import SEO from '@/components/SEO';
export default function Index() {
  return (
    <div>
      <SEO 
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />
      <div className="absolute invisible md:visible  object-cover opacity-50 w-full h-full rounded-xl">
        <OptimizedImage  alt="صورة سيدي هشام" src={newsBack} />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <OptimizedImage  alt="صورة سيدي هشام" src={news} />
      </div>
      <div>
        <Tabs />
      </div>
    </div>
  )
}
