import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useStore, Feedback as FeedbackType } from "@/store/useStore";
import { Search, Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const Feedback = () => {
  const { feedback } = useStore();
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter feedback
  const filteredFeedback = feedback.filter(fb => {
    const matchesSentiment = sentimentFilter === "all" || fb.sentiment === sentimentFilter;
    const matchesSearch = fb.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fb.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fb.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSentiment && matchesSearch;
  });

  // Calculate stats
  const totalReviews = feedback.length;
  const avgRating = feedback.reduce((sum, fb) => sum + fb.rating, 0) / totalReviews || 0;
  const positiveCount = feedback.filter(fb => fb.sentiment === 'Positive').length;
  const neutralCount = feedback.filter(fb => fb.sentiment === 'Neutral').length;
  const negativeCount = feedback.filter(fb => fb.sentiment === 'Negative').length;

  const sentimentData = [
    { name: "Positive", value: positiveCount, color: "#10b981" },
    { name: "Neutral", value: neutralCount, color: "#f59e0b" },
    { name: "Negative", value: negativeCount, color: "#ef4444" },
  ];

  const ratingDistribution = [
    { rating: "5", count: feedback.filter(f => f.rating === 5).length },
    { rating: "4", count: feedback.filter(f => f.rating === 4).length },
    { rating: "3", count: feedback.filter(f => f.rating === 3).length },
    { rating: "2", count: feedback.filter(f => f.rating === 2).length },
    { rating: "1", count: feedback.filter(f => f.rating === 1).length },
  ];

  const getSentimentColor = (sentiment: FeedbackType['sentiment']) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-success text-success-foreground';
      case 'Neutral':
        return 'bg-warning text-warning-foreground';
      case 'Negative':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSentimentIcon = (sentiment: FeedbackType['sentiment']) => {
    switch (sentiment) {
      case 'Positive':
        return <TrendingUp className="w-4 h-4" />;
      case 'Neutral':
        return <Minus className="w-4 h-4" />;
      case 'Negative':
        return <TrendingDown className="w-4 h-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Feedback Overview</h1>
            <p className="text-muted-foreground">Manage and analyze individual customer reviews</p>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            Average Rating: {avgRating.toFixed(1)}/5
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-modern">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReviews}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {avgRating.toFixed(1)}
                <Star className="w-5 h-5 fill-primary text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">+0.3 from last month</p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Positive Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{positiveCount}</div>
              <p className="text-xs text-muted-foreground">{((positiveCount/totalReviews)*100).toFixed(1)}% of total</p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unresolved Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{negativeCount}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Analysis Chart */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>
                Distribution of feedback sentiment across all reviews
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

          {/* Rating Distribution */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>
                Breakdown of ratings from 1 to 5 stars
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
        </div>

        {/* All Customer Feedback */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>All Customer Feedback</CardTitle>
            <CardDescription>
              Manage and analyze individual customer reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sentimentFilter === "all" ? "default" : "outline"}
                  onClick={() => setSentimentFilter("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={sentimentFilter === "Positive" ? "default" : "outline"}
                  onClick={() => setSentimentFilter("Positive")}
                  size="sm"
                  className="text-success border-success hover:bg-success hover:text-white"
                >
                  Positive
                </Button>
                <Button
                  variant={sentimentFilter === "Neutral" ? "default" : "outline"}
                  onClick={() => setSentimentFilter("Neutral")}
                  size="sm"
                  className="text-warning border-warning hover:bg-warning hover:text-white"
                >
                  Neutral
                </Button>
                <Button
                  variant={sentimentFilter === "Negative" ? "default" : "outline"}
                  onClick={() => setSentimentFilter("Negative")}
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                >
                  Negative
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rating</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeedback.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        {renderStars(review.rating)}
                      </TableCell>
                      <TableCell className="font-medium">{review.customer}</TableCell>
                      <TableCell>{review.product}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate text-sm">{review.message}</p>
                      </TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <Badge className={getSentimentColor(review.sentiment)}>
                          <span className="mr-1">{getSentimentIcon(review.sentiment)}</span>
                          {review.sentiment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;