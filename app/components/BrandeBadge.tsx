'use client'

import Image from 'next/image'
import logo from '../../public/img/full-logo-connect.png'

export function BrandBadge() {
  return (
    <div className="fixed right-4 bottom-4 z-50 hidden md:block">
      <div className="inline-flex items-center justify-center rounded-sm bg-black/50 px-4 py-2 shadow-sm dark:bg-transparent">
        <Image
          src={logo}
          alt="Connect Digital"
          width={150}
          height={50}
          className="opacity-90 select-none dark:opacity-90"
        />
      </div>
    </div>
  )
}
