import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/stats-card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useStore } from "@/store/useStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, Star, Users, ShoppingCart, DollarSign, Package, Target, Zap, Activity } from "lucide-react";

const Dashboard = () => {
  const { orders, feedback } = useStore();

  // Calculate analytics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const avgOrderValue = totalRevenue / totalOrders || 0;
  
  const topProduct = orders.reduce((acc, order) => {
    acc[order.product] = (acc[order.product] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostOrderedProduct = Object.entries(topProduct).sort(([,a], [,b]) => b - a)[0]?.[0] || "No orders yet";
  
  const mostComplaints = feedback.filter(f => f.sentiment === 'Negative').reduce((acc, fb) => {
    acc[fb.product] = (acc[fb.product] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostComplainedProduct = Object.entries(mostComplaints).sort(([,a], [,b]) => b - a)[0]?.[0] || "No complaints";
  
  const repeatCustomers = new Set(orders.map(o => o.customer)).size;
  const conversionRate = ((orders.filter(o => o.status === 'Shipped').length / totalOrders) * 100) || 0;

  // Chart data
  const ratingDistribution = [
    { rating: "5 Stars", count: feedback.filter(f => f.rating === 5).length },
    { rating: "4 Stars", count: feedback.filter(f => f.rating === 4).length },
    { rating: "3 Stars", count: feedback.filter(f => f.rating === 3).length },
    { rating: "2 Stars", count: feedback.filter(f => f.rating === 2).length },
    { rating: "1 Star", count: feedback.filter(f => f.rating === 1).length },
  ];

  const sentimentData = [
    { name: "Positive", value: feedback.filter(f => f.sentiment === 'Positive').length, color: "hsl(var(--success))" },
    { name: "Neutral", value: feedback.filter(f => f.sentiment === 'Neutral').length, color: "hsl(var(--warning))" },
    { name: "Negative", value: feedback.filter(f => f.sentiment === 'Negative').length, color: "hsl(var(--destructive))" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12500, orders: 45, customers: 38 },
    { month: "Feb", revenue: 15200, orders: 52, customers: 44 },
    { month: "Mar", revenue: 18900, orders: 68, customers: 59 },
    { month: "Apr", revenue: 22100, orders: 75, customers: 67 },
    { month: "May", revenue: 25300, orders: 89, customers: 78 },
    { month: "Jun", revenue: 28700, orders: 95, customers: 85 },
  ];

  const performanceData = [
    { name: "Conversion Rate", value: conversionRate, target: 85 },
    { name: "Customer Satisfaction", value: 92, target: 90 },
    { name: "Order Fulfillment", value: 88, target: 95 },
    { name: "Response Time", value: 96, target: 90 },
  ];
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Welcome Back, Brand Owner!
            </h1>
            <p className="text-muted-foreground mt-2">Here's your brand's performance overview for today.</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Activity className="w-3 h-3 mr-1" />
                All systems operational
              </Badge>
              <Badge variant="outline">
                Last updated: {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">+12.5%</div>
            <p className="text-sm text-muted-foreground">Monthly Growth</p>
            <Badge className="mt-2 bg-gradient-to-r from-primary to-accent">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending Up
            </Badge>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            description="This month"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12.5, label: "vs last month" }}
            variant="success"
          />
          
          <StatsCard
            title="Top Product"
            value={mostOrderedProduct}
            description="Most ordered this month"
            icon={<Star className="h-4 w-4" />}
            trend={{ value: 8.2, label: "increase" }}
          />
          
          <StatsCard
            title="Conversion Rate"
            value={`${conversionRate.toFixed(1)}%`}
            description="Orders to visitors"
            icon={<Target className="h-4 w-4" />}
            trend={{ value: 3.1, label: "improvement" }}
            variant="success"
          />
          
          <StatsCard
            title="Repeat Customers"
            value={repeatCustomers}
            description="Loyal customers"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 15.3, label: "growth" }}
          />
          
          <StatsCard
            title="Avg Order Value"
            value={`$${avgOrderValue.toFixed(2)}`}
            description="Per transaction"
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={{ value: 5.2, label: "increase" }}
          />
        </div>

        {/* Performance Metrics */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Key performance indicators for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceData.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <span className="text-sm text-muted-foreground">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        metric.value >= metric.target 
                          ? "bg-gradient-to-r from-success to-success/80" 
                          : "bg-gradient-to-r from-warning to-warning/80"
                      )}
                      style={{ width: `${Math.min(metric.value, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: {metric.target}%</span>
                    <span className={metric.value >= metric.target ? "text-success" : "text-warning"}>
                      {metric.value >= metric.target ? "✓ Met" : "⚠ Below"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Ratings Distribution */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Product Ratings Distribution
              </CardTitle>
              <CardDescription>
                Distribution of feedback ratings across all products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="count" 
                      fill="url(#colorGradient)" 
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity"
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Customer Sentiment Analysis */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Customer Sentiment Analysis
              </CardTitle>
              <CardDescription>
                Overall sentiment breakdown from customer feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <ChartLegend payload={sentimentData.map(item => ({ value: `${item.name}: ${item.value}`, color: item.color }))} />
            </CardContent>
          </Card>
        </div>

        {/* Revenue & Growth Analytics */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Revenue & Growth Analytics
            </CardTitle>
            <CardDescription>
              Multi-metric analysis of your business performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue" 
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stackId="2"
                    stroke="hsl(var(--accent))"
                    fill="url(#ordersGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;