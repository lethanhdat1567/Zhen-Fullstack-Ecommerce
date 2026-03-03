import Contact from "./components/Contact/Contact";
import Info from "./components/Info/Info";

function ContactInfo() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5">
                <Info />
            </div>

            <div className="lg:col-span-7">
                <Contact />
            </div>
        </div>
    );
}

export default ContactInfo;
