import React from 'react';
    import { Card } from '@/components/ui/Card';
    import { ProfileCard } from '@/components/ui/ProfileCard';
    import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
    import { cn, getRandomImageUrl } from '@/lib/utils';
    import { Package, DollarSign, CalendarDays, Clock, ShoppingBag } from 'lucide-react'; // Added ShoppingBag
    import { motion } from 'framer-motion';

    // Dummy Types
    interface UserProfile {
      name: string;
      email: string;
      avatarUrl?: string;
      memberSince: string;
    }

    interface Order {
      id: string;
      productName: string;
      status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Processing'; // Added 'Processing'
      total: number;
      orderDate: string;
      deliveryDate?: string;
    }

    interface DashboardStats {
      totalOrders: number;
      totalSpend: number;
      pendingOrders: number;
      lastOrderSummary?: string; // Added for 'Last Order' widget
    }

    interface DashboardWidgetsProps {
      stats: DashboardStats; // Expects an object, not an array
      orders: Order[];
      userProfile: UserProfile;
      isLoading?: boolean;
      className?: string;
    }

    const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
      stats,
      orders,
      userProfile,
      isLoading = false,
      className,
    }) => {
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      };

      const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
      };

      return (
        <section className={cn('container mx-auto px-4 py-12', className)} aria-labelledby="dashboard-title">
          <motion.h2
            id="dashboard-title"
            className="text-4xl font-bold text-primary mb-10 text-center font-poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Personalized Dashboard
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible">
              <ProfileCard
                name={isLoading ? 'Loading...' : userProfile.name}
                title={isLoading ? 'Member' : `Member Since ${userProfile.memberSince}`}
                avatarUrl={isLoading ? undefined : userProfile.avatarUrl || getRandomImageUrl(200, 200)}
                showUserInfo
                enableTilt={false} // Disable tilt for dashboard context
                className="lg:col-span-1 h-full"
              />
            </motion.div>

            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                <Card className="flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-secondary/10 to-white">
                  <ShoppingBag className="h-10 w-10 text-primary mb-3" />
                  <p className="text-lg text-gray-600">Total Orders</p>
                  <h3 className="text-3xl font-bold text-primary font-inter mt-1">
                    {isLoading ? <SkeletonLoader width="80px" height="1.5rem" /> : stats.totalOrders}
                  </h3>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <Card className="flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-secondary/10 to-white">
                  <DollarSign className="h-10 w-10 text-primary mb-3" />
                  <p className="text-lg text-gray-600">Total Spend</p>
                  <h3 className="text-3xl font-bold text-primary font-inter mt-1">
                    {isLoading ? <SkeletonLoader width="120px" height="1.5rem" /> : `$${stats.totalSpend.toFixed(2)}`}
                  </h3>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <Card className="flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-secondary/10 to-white">
                  <Package className="h-10 w-10 text-primary mb-3" />
                  <p className="text-lg text-gray-600">Pending Orders</p>
                  <h3 className="text-3xl font-bold text-primary font-inter mt-1">
                    {isLoading ? <SkeletonLoader width="60px" height="1.5rem" /> : stats.pendingOrders}
                  </h3>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Recent Orders */}
          <motion.div
            className="mt-12"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8 bg-white/95 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-primary mb-6 font-poppins">Recent Orders</h3>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <SkeletonLoader width="40%" height="1.2rem" />
                      <SkeletonLoader width="20%" height="1.2rem" />
                      <SkeletonLoader width="20%" height="1.2rem" />
                    </div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No recent orders found.</p>
              ) : (
                <ul className="divide-y divide-gray-200" role="list" aria-label="Recent orders">
                  {orders.map((order) => (
                    <motion.li
                      key={order.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4"
                      role="listitem"
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="font-semibold text-primary">{order.productName}</p>
                        <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-700">
                        <span
                          className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            order.status === 'Delivered' && 'bg-green-100 text-green-800',
                            order.status === 'Shipped' && 'bg-blue-100 text-blue-800',
                            order.status === 'Pending' && 'bg-yellow-100 text-yellow-800',
                            order.status === 'Processing' && 'bg-secondary/20 text-primary', // Added processing style
                            order.status === 'Cancelled' && 'bg-red-100 text-red-800'
                          )}
                        >
                          {order.status}
                        </span>
                        <span className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                          {order.orderDate}
                        </span>
                        {order.deliveryDate && (
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            Est. {order.deliveryDate}
                          </span>
                        )}
                        <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </Card>
          </motion.div>
        </section>
      );
    };

    export { DashboardWidgets };