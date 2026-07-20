import Link from 'next/link'
import React from 'react'
import twitter from '../../../public/images/twitter.svg'
import whatsapp from '../../../public/images/whatsapp.svg'
import instagram from '../../../public/images/instagram.svg'
import facebook from '../../../public/images/facebook.svg'
import SocialMediaIcon from '../../footer/SocialMediaIcon'
import Contact from './Contact'

export default function ShareCard({ local }) {
  return (
    <div className="mx-8 py-3  bg-gray-100 px-6 rounded-xl">
      <Link href="/signup">
        <p className="text-green-600 font-arabicLight cursor-pointer text-center text-[17px]">
          {local === 'ar' ? ' انشاء حساب جديد' : 'Create account'}
        </p>
      </Link>
      <p className="text-red-500 text-center font-arabicLight text-[17px] mt-2">
        {local === 'ar' ? ' مواقع التواصل الاجتماعي' : 'Social media'}
      </p>
      <div className="flex mt-3">
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
      <p className="text-red-500 font-arabicLight text-center text-[17px] mt-2">
        {local === 'ar' ? ' بريد إلكتروني' : 'Email'}
      </p>
      <div className="mt-3">
        <Contact
          // title={local === "ar"?"المبيعات ":"Sales"}
          email="sales@sedihisham.com"
        />
        <Contact
          // title={local === "ar" ? "خدمة زبائن " : "customer service"}
          email="info@sedihisham.com"
        />
      </div>
    </div>
  )
}
