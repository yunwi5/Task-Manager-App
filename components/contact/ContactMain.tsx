import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import ContactForm from "./ContactForm";

const ContactMain: React.FC = () => {
    const userContext = useUser();
    const { email } = userContext.user || { name: "", user: "" };

    return (
        <main className="px-4 pt-6 pb-12 md:px-8 lg:px-12 lg:pt-10 xl:px-16 xl:pt-14 xl:pb-16 max-w-[60rem] m-auto">
            <h1 className="mb-4 text-slate-500 font-normal app-heading">Contact Us</h1>
            <ContactForm email={email || ""} />
        </main>
    );
};

export default ContactMain;
