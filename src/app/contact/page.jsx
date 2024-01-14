import SectionHeaders from "@/components/layout/SectionHeaders";

const ContactPage = () => {
    return (
        <section className="text-center my-8" id="contact">
            <SectionHeaders
                subHeader={'Don\'t hesitate'}
                mainHeader={'Contact us'}
            />
            <div className="mt-8">
                <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
                    +880 1723 187906
                </a>
            </div>
        </section>
    )
}

export default ContactPage;