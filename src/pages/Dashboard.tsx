import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useStore } from "@/store/useStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, Star, Users, ShoppingCart, DollarSign, Package } from "lucide-react";

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

  // Chart data
  const ratingDistribution = [
    { rating: "5 Stars", count: feedback.filter(f => f.rating === 5).length },
    { rating: "4 Stars", count: feedback.filter(f => f.rating === 4).length },
    { rating: "3 Stars", count: feedback.filter(f => f.rating === 3).length },
    { rating: "2 Stars", count: feedback.filter(f => f.rating === 2).length },
    { rating: "1 Star", count: feedback.filter(f => f.rating === 1).length },
  ];

  const sentimentData = [
    { name: "Positive", value: feedback.filter(f => f.sentiment === 'Positive').length, color: "#10b981" },
    { name: "Neutral", value: feedback.filter(f => f.sentiment === 'Neutral').length, color: "#f59e0b" },
    { name: "Negative", value: feedback.filter(f => f.sentiment === 'Negative').length, color: "#ef4444" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15200 },
    { month: "Mar", revenue: 18900 },
    { month: "Apr", revenue: 22100 },
    { month: "May", revenue: 25300 },
    { month: "Jun", revenue: 28700 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back, Brand Owner!</h1>
            <p className="text-muted-foreground">Here's a quick overview of your brand's performance.</p>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Growth: +12.5%
          </Badge>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Product</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mostOrderedProduct}</div>
              <p className="text-xs text-muted-foreground">
                Most ordered this month
              </p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Complaints</CardTitle>
              <Package className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mostComplainedProduct}</div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repeat Buyers</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repeatCustomers}</div>
              <p className="text-xs text-muted-foreground">
                Loyal customers
              </p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +5.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Ratings Distribution */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Product Ratings Distribution</CardTitle>
              <CardDescription>
                Distribution of feedback ratings across all products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Customer Sentiment Analysis */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Customer Sentiment Analysis</CardTitle>
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
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center mt-4 space-x-4">
                {sentimentData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Monthly Revenue Growth</CardTitle>
            <CardDescription>
              Your revenue trend over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;