import SeoMeta from "@/components/shared/SeoMeta"
import { Button } from "@/components/ui/button"

const ProfilePage = () => {
    return (
        <SeoMeta
            title="My Profile | Artisan Bakehouse"
            description="Manage your order history, saved preferences, and track your baking skill development courses."
        >
            <div className="container-max section-spacing">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold">My Baking Journey</h1>
                    <Button variant="outline">Log Out</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 bg-card p-8 rounded-lg subtle-shadow">
                        <h2 className="text-2xl font-bold font-heading">Order History</h2>
                        <div className="mt-4 text-center py-10 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">You have no past orders.</p>
                            <Button asChild className="mt-4"><a href="/catalog">Start Shopping</a></Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-secondary p-8 rounded-lg">
                        <h2 className="text-2xl font-bold font-heading">My Stats</h2>
                        <div className="space-y-4 mt-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Orders</p>
                                <p className="text-2xl font-bold">0</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Lifetime Spend</p>
                                <p className="text-2xl font-bold">$0.00</p>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold font-heading mt-8">Preferences</h2>
                         <div className="space-y-2 mt-4 text-sm">
                            <label className="flex items-center justify-between">
                                <span>Marketing Emails</span>
                                <input type="checkbox" className="toggle-checkbox" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </SeoMeta>
    )
}

export default ProfilePage;