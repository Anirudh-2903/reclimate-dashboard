import AuthForm from '@/components/AuthForm';
import { Metadata } from 'next';
import React from 'react'

export const generateMetadata = async (): Promise<Metadata> => {
    return {
      title: "Reclimate | Sign In",
    openGraph: {
      title: "Reclimate | Sign In",
        locale: "en_US",
        type: "website",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  };

const SignIn = () => {
  return (
    <AuthForm type='sign-in' />
  )
}

export default SignIn;