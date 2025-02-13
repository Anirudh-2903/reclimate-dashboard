import { TopNavbar } from '@/components/TopNavbar';
import { Metadata } from 'next';
import React from 'react'

export const generateMetadata = async (): Promise<Metadata> => {
    return {
      title: "Reclimate | Profile",
    openGraph: {
      title: "Reclimate | Profile",
        locale: "en_US",
        type: "website",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  };


const Profile = () => {
  return (
    <>
    <TopNavbar />
    <div>Profile</div>
    </>
  )
}

export default Profile