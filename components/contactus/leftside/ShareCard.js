import Link from 'next/link'
import React from 'react'
import twitter from '../../../public/images/twitter.svg'
import whatsapp from '../../../public/images/whatsapp.svg'
import instagram from '../../../public/images/instagram.svg'
import facebook from '../../../public/images/facebook.svg'
import SocialMediaIcon from '../../footer/SocialMediaIcon'
import Contact from './Contact'

export default function ShareCard({ local }) {
  const isAr = local === 'ar';

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      {/* Account Signup Callout */}
      <Link
        href="/signup"
        className="block text-center p-3.5 rounded-xl bg-gradient-to-r from-red-50 via-rose-50/80 to-red-50 hover:from-red-100/80 hover:to-rose-100/80 border border-red-200/60 transition-all duration-200 group shadow-2xs cursor-pointer"
      >
        <p className="text-[#7c1422] font-arabicBold font-bold text-sm group-hover:text-[#5a0e18] transition-colors">
          {isAr ? "إنشاء حساب جديد" : "Create new account"}
        </p>
      </Link>

      {/* Social Media Section */}
      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 ${isAr ? "text-right font-arabicBold" : "text-left"}`}>
          {isAr ? "مواقع التواصل الاجتماعي" : "Social Media"}
        </h4>
        <div className="flex items-center justify-around bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
          <SocialMediaIcon
            src={twitter}
            href="https://twitter.com/sedihisham1"
          />
          <SocialMediaIcon
            src={whatsapp}
            href="https://api.whatsapp.com/send?phone=%2B963942000971&app=facebook&entry_point=page_cta&fbclid=IwAR23B41qgd7-Z89fxmv0wHhvHxM7dCCrp3qBZgzqyCPNUUaWq0zMHSC_kAQ"
          />
          <SocialMediaIcon
            src={instagram}
            href="https://www.instagram.com/sedi_hisham/?hl=en"
          />
          <SocialMediaIcon
            src={facebook}
            href="https://www.facebook.com/sedihishamm"
          />
        </div>
      </div>

      {/* Email Contact Section */}
      <div>
        <h4 className={`text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ${isAr ? "text-right font-arabicBold" : "text-left"}`}>
          {isAr ? "البريد الإلكتروني" : "Direct Email"}
        </h4>
        <div className="space-y-1">
          <Contact
            title={isAr ? "المبيعات" : "Sales"}
            email="sales@sedihisham.com"
          />
          <Contact
            title={isAr ? "خدمة العملاء" : "Support"}
            email="info@sedihisham.com"
          />
        </div>
      </div>
    </div>
  )
}
