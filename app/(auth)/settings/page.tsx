import { TopNavbar } from '@/components/TopNavbar';
import { Metadata } from 'next';
import React from 'react'

export const generateMetadata = async (): Promise<Metadata> => {
    return {
      title: "Reclimate | Settings",
    openGraph: {
      title: "Reclimate | Settings",
        locale: "en_US",
        type: "website",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  };


const Settings = () => {
  return (
    <>
    <TopNavbar />
    <div>Settings</div>
    </>
  )
}

export default Settings