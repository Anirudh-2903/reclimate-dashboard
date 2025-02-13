import AuthForm from '@/components/AuthForm';
import { Metadata } from 'next';
import React from 'react'

export const generateMetadata = async (): Promise<Metadata> => {
    return {
      title: "Reclimate | Sign Up",
    openGraph: {
      title: "Reclimate | Sign Up",
        locale: "en_US",
        type: "website",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  };

const SignUp = () => {
  return (
    <AuthForm type='sign-up' />
  )
}

export default SignUp;