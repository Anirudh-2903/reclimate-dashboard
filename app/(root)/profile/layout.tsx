
import {Metadata} from "next";

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

export default function ProfileLayout({children}: { children: React.ReactNode; }) {
    return (
        <div className="min-h-screen">
            <main className="container py-8">{children}</main>
        </div>
    );
}