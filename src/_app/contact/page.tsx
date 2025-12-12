import ContactForm from "@/components/form/contactForm";
import { getTranslations } from "next-globe-gen";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    const t = getTranslations("contact");
    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col p-12 gap-4 items-center max-w-4xl w-full">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-preset-1 text-dark">{t("title")}</h1>
                    <p className="text-preset-4">
                        {t("description")} 
                    </p>
                </div>
                <div className="flex flex-col gap-12 md:flex-row w-full">
                    <ContactForm />
                    <div className="flex flex-col gap-4 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-accent rounded-full p-3 flex items-center justify-center">
                                <FaPhoneAlt className="text-dark" size={18} />
                            </div>
                            <div className="flex flex-col text-dark">
                                <p className="text-preset-5-bold">{t("data.phone")}</p>
                                <p className="text-preset-5">+51 123 456 789</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-accent rounded-full p-3 flex items-center justify-center">
                                <FaEnvelope className="text-dark" size={18} />
                            </div>
                            <div className="flex flex-col text-dark">
                                <p className="text-preset-5-bold">{t("data.email")}</p>
                                <p className="text-preset-5">contact@physioclinic.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-accent rounded-full p-3 flex items-center justify-center">
                                <FaMapMarkerAlt className="text-dark" size={18} />
                            </div>
                            <div className="flex flex-col text-dark">
                                <p className="text-preset-5-bold">{t("data.address")}</p>
                                <p className="text-preset-5">Calle de la Fisioterapia, 123. 28001</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg pt-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.97857186457!2d-73.974187!3d40.781219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f50cb8abf%3A0x83f8f4d9e7d81e0d!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1700000000000"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                </div>
            </div>
        </div>
    );
}
