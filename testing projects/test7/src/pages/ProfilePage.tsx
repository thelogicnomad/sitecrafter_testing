import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoaderCircle } from 'lucide-react';
import ProfileCard from '@/components/ui/ProfileCard';
import { format } from 'date-fns';

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: api.fetchUserProfile,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoaderCircle className="w-16 h-16 animate-spin text-primary" /></div>;
  }

  if (isError || !user) {
    return <div className="text-center py-20">Error loading profile. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">Your Profile</h1>
        <p className="mt-4 text-lg text-foreground/70">Manage your orders and preferences.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 flex justify-center">
            <ProfileCard 
                name={user.name}
                title="Loyal Customer"
                handle={user.email.split('@')[0]}
                status="Online"
                contactText="Update Preferences"
                avatarUrl={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.email}`}
                onContactClick={() => alert("Preference update form would be here.")}
            />
        </div>
        <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold font-display text-primary mb-4">Your Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {Object.entries(user.stats).map(([key, value]) => (
                        <div key={key} className="p-4 bg-background rounded-md">
                            <p className="text-2xl font-bold text-accent">{value}</p>
                            <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                 <h2 className="text-2xl font-bold font-display text-primary mb-4">Order History</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-background">
                                    <td className="p-2 font-mono text-sm">{order.id}</td>
                                    <td className="p-2">{format(new Date(order.date), 'MMM d, yyyy')}</td>
                                    <td className="p-2">${order.total.toFixed(2)}</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;