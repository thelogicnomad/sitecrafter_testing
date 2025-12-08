import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { DashboardWidgets } from '@/components/features/DashboardWidgets';
    import { Card } from '@/components/ui/Card';
    import { Button } from '@/components/ui/Button';
    import { ShinyText } from '@/components/ui/ShinyText';
    import { User, ShoppingBag, Clock, Package, DollarSign, Settings } from 'lucide-react';
    import { getSeededImageUrl } from '@/lib/utils';

    // Mock User Data
    const mockUserProfile = {
      id: 'user-123',
      name: 'Victoria Sterling',
      email: 'victoria.sterling@example.com',
      avatarUrl: getSeededImageUrl('victoria-sterling', 200, 200),
      memberSince: 'January 2023',
    };

    // Mock Dashboard Stats (adjusted to be an object matching DashboardStats interface)
    const mockStats = {
      totalOrders: 14,
      totalSpend: 1250.00,
      pendingOrders: 2,
      lastOrderSummary: 'Velvet Rose Cake (2 weeks ago)', // Example for a potential 'last order' widget
    };

    // Mock Order History
    const mockOrders = [
      {
        id: 'ORD-001',
        orderDate: '2024-07-20', // Changed from 'date' to 'orderDate'
        productName: 'Velvet Rose Cake (Large)', // Simplified for DashboardWidgets list
        items: [
          { name: 'Velvet Rose Cake (Large)', qty: 1, price: 75.00 },
          { name: 'Golden Caramel Macarons', qty: 12, price: 30.00 },
        ],
        total: 105.00,
        status: 'Delivered' as const,
        deliveryDate: '2024-07-22',
        imageUrl: getSeededImageUrl('order-velvet-rose', 100, 100),
      },
      {
        id: 'ORD-002',
        orderDate: '2024-06-15',
        productName: 'Custom Wedding Cake',
        items: [
          { name: 'Custom Wedding Cake', qty: 1, price: 550.00 },
        ],
        total: 550.00,
        status: 'Delivered' as const,
        deliveryDate: '2024-06-18',
        imageUrl: getSeededImageUrl('order-wedding-cake', 100, 100),
      },
      {
        id: 'ORD-003',
        orderDate: '2024-08-01',
        productName: 'Artisan Berry Tart & Espresso Delight',
        items: [
          { name: 'Artisan Berry Tart', qty: 1, price: 45.00 },
          { name: 'Espresso Chocolate Delight', qty: 1, price: 70.00 },
        ],
        total: 115.00,
        status: 'Processing' as const, // Changed to 'Processing' to match DashboardWidgets type
        deliveryDate: '2024-08-05',
        imageUrl: getSeededImageUrl('order-berry-espresso', 100, 100),
      },
    ];

    const UserDashboard: React.FC = () => {
      const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

      const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1 } },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

      return (
        <motion.div
          className="container mx-auto px-4 py-16 max-w-7xl"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        >
          {/* Welcome Banner */}
          <motion.div
            className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl shadow-lifted mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3">
              Welcome Back, <ShinyText text={mockUserProfile.name.split(' ')[0]} className="font-display inline-block" />!
            </h1>
            <p className="text-lg text-gray-700">
              Your personalized hub for all things ArtisanBake Collective.
            </p>
          </motion.div>

          {/* Dashboard Stats */}
          <motion.div
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Your Activity at a Glance</h2>
            <DashboardWidgets stats={mockStats} orders={mockOrders} userProfile={mockUserProfile} />
          </motion.div>

          {/* Order History */}
          <motion.div
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Your Recent Orders</h2>
            <div className="space-y-6">
              {mockOrders.map((order, index) => (
                <motion.div key={order.id} variants={itemVariants}>
                  <Card className="p-6 bg-white shadow-lifted flex flex-col md:flex-row items-center gap-6">
                    <img
                      src={order.imageUrl}
                      alt={`Order ${order.id}`}
                      className="w-24 h-24 object-cover rounded-lg shadow-inner flex-shrink-0"
                      width={96}
                      height={96}
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-primary">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">Ordered on: {order.orderDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-secondary/20 text-primary' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-gray-700 text-sm mb-3">
                        {order.items.map((item, i) => (
                          <li key={i}>{item.qty} x {item.name} (${item.price.toFixed(2)})</li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                        <span>Total: ${order.total.toFixed(2)}</span>
                        {order.status === 'Delivered' ? (
                          <span className="text-sm font-normal text-gray-600">Delivered: {order.deliveryDate}</span>
                        ) : (
                          <span className="text-sm font-normal text-primary">Est. Delivery: {order.deliveryDate}</span>
                        )}
                      </div>
                    </div>
                    <Link to={`/dashboard/order/${order.id}`}>
                      <Button variant="outline" size="sm" className="whitespace-nowrap mt-4 md:mt-0">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/dashboard/orders">
                <Button variant="secondary" size="md">
                  View All Orders
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Profile Settings Link */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="p-8 bg-primary/10 shadow-lifted">
              <h2 className="text-3xl font-bold text-primary mb-4">Manage Your Profile</h2>
              <p className="text-lg text-gray-700 mb-6">
                Update your personal information, addresses, and preferences.
              </p>
              <Link to="/dashboard/settings">
                <Button variant="primary" size="lg" className="inline-flex items-center">
                  <Settings className="mr-2" size={20} /> Profile Settings
                </Button>
              </Link>
            </Card>
          </motion.div>
        </motion.div>
      );
    };

    export default UserDashboard;