
import {Metadata} from "next";

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

export default function SettingsLayout({children}: { children: React.ReactNode; }) {

    return (
        <div className="min-h-screen">
            <main className="container py-8">{children}</main>
        </div>
    );
}