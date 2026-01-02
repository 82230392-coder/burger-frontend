import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  Settings, 
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  MoreVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231', 
      change: '+20.1%', 
      trend: 'up',
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Orders', 
      value: '2,345', 
      change: '+15.3%', 
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Customers', 
      value: '1,234', 
      change: '+8.2%', 
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Products', 
      value: '456', 
      change: '-2.4%', 
      trend: 'down',
      icon: Package,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#ORD-2024-001', customer: 'John Doe', product: 'Crispy Chicken Burger', amount: '$12.99', status: 'Completed', time: '2 min ago' },
    { id: '#ORD-2024-002', customer: 'Jane Smith', product: 'Vegan Delight', amount: '$10.99', status: 'Processing', time: '5 min ago' },
    { id: '#ORD-2024-003', customer: 'Mike Johnson', product: 'Double Stack', amount: '$15.99', status: 'Pending', time: '10 min ago' },
    { id: '#ORD-2024-004', customer: 'Sarah Williams', product: 'Classic Burger', amount: '$8.99', status: 'Completed', time: '15 min ago' },
    { id: '#ORD-2024-005', customer: 'Tom Brown', product: 'Ultimate Bacon', amount: '$13.99', status: 'Cancelled', time: '20 min ago' }
  ];

  const topProducts = [
    { name: 'Crispy Chicken Burger', sales: 234, revenue: '$3,038', trend: '+12%' },
    { name: 'Double Stack', sales: 189, revenue: '$3,022', trend: '+8%' },
    { name: 'Classic Burger', sales: 156, revenue: '$1,402', trend: '+5%' },
    { name: 'Vegan Delight', sales: 142, revenue: '$1,560', trend: '+15%' }
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: ShoppingBag, label: 'Orders', id: 'orders', badge: '12' },
    { icon: Package, label: 'Products', id: 'products' },
    { icon: Users, label: 'Customers', id: 'customers' },
    { icon: Activity, label: 'Analytics', id: 'analytics' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center font-bold text-xl">
              🍔
            </div>
            <span className="text-xl font-bold">BurgerAdmin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search orders, products..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-sm">Admin User</div>
                  <div className="text-xs text-gray-500">admin@burger.com</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                      <Icon size={24} />
                    </div>
                    {stat.trend === 'up' ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                        <ArrowUp size={16} />
                        {stat.change}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                        <ArrowDown size={16} />
                        {stat.change}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{order.id}</div>
                        <div className="text-sm text-gray-600">{order.customer} • {order.product}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{order.amount}</div>
                          <div className="text-xs text-gray-500">{order.time}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-2xl">
                        🍔
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm mb-1">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.sales} sales</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 text-sm">{product.revenue}</div>
                        <div className="text-xs text-green-600 font-semibold">{product.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart Placeholder */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Sales Overview</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold">Week</button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold">Month</button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold">Year</button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-center">
                <TrendingUp size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 font-semibold">Sales Chart</p>
                <p className="text-sm text-gray-400">Integrate your charting library here</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;