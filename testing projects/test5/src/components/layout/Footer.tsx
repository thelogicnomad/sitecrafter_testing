import { Link } from "react-router-dom"
import { Cookie, Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-secondary">
            <div className="container-max py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <Cookie className="h-7 w-7 text-primary" />
                            <span className="font-heading text-xl font-bold text-foreground">Artisan Bakehouse</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Handcrafted cakes, pastries, and custom creations, baked fresh daily.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/catalog" className="text-muted-foreground hover:text-primary">Catalog</Link></li>
                            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                            <li><Link to="/profile" className="text-muted-foreground hover:text-primary">My Profile</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>123 Sweet Street, Flavor Town, 90210</li>
                            <li>(555) 123-4567</li>
                            <li>orders@artisanbakehouse.com</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Artisan Bakehouse. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;