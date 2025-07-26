import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useStore, AutoReplyRule } from "@/store/useStore";
import { Plus, Edit, Trash2, MessageSquare, Zap, Hash, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const AutoReply = () => {
  const { autoReplyRules, addAutoReplyRule, updateAutoReplyRule, deleteAutoReplyRule } = useStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutoReplyRule | null>(null);

  const handleAddRule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRule = {
      keyword: formData.get('keyword') as string,
      response: formData.get('response') as string,
    };
    addAutoReplyRule(newRule);
    setIsAddDialogOpen(false);
    e.currentTarget.reset();
  };

  const handleEditRule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingRule) return;
    
    const formData = new FormData(e.currentTarget);
    const updatedRule = {
      keyword: formData.get('keyword') as string,
      response: formData.get('response') as string,
    };
    updateAutoReplyRule(editingRule.id, updatedRule);
    setEditingRule(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">DM Auto-Reply Rules</h1>
            <p className="text-muted-foreground">Configure automated direct message responses based on keywords to enhance customer engagement.</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Auto-Reply Rule</DialogTitle>
                <DialogDescription>
                  Create a new automated response rule for Instagram DMs. Define keywords that will trigger your custom response.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddRule} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keywords</Label>
                  <Input 
                    id="keyword" 
                    name="keyword" 
                    placeholder='e.g., "delivery status", "refund policy"'
                    required 
                  />
                  <p className="text-xs text-muted-foreground">
                    Use comma-separated values for multiple keywords
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="response">Response Message</Label>
                  <Textarea 
                    id="response" 
                    name="response" 
                    placeholder="Type your automated response here. Use [Link] as a placeholder for URLs"
                    rows={4}
                    required 
                  />
                  <p className="text-xs text-muted-foreground">
                    Use placeholders like [Link] for dynamic content. Keep responses helpful and conversational.
                  </p>
                </div>
                <Button type="submit" className="w-full">Add Rule</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{autoReplyRules.length}</div>
              <p className="text-xs text-muted-foreground">
                Automated responses configured
              </p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Handled</CardTitle>
              <MessageCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <MessageSquare className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&lt; 1s</div>
              <p className="text-xs text-muted-foreground">
                Average response time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>How Auto-Reply Works</CardTitle>
            <CardDescription>
              Your automated system monitors Instagram DMs for specific keywords and responds instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <Hash className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">1. Keyword Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Our system scans incoming messages for your predefined keywords
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">2. Instant Trigger</h3>
                <p className="text-sm text-muted-foreground">
                  When a keyword is detected, the corresponding response is automatically sent
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">3. Smart Response</h3>
                <p className="text-sm text-muted-foreground">
                  Customers receive helpful information instantly, improving their experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing Auto-Reply Rules */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle>Existing Auto-Reply Rules</CardTitle>
            <CardDescription>
              Manage your current automated response rules. Edit keywords and responses as needed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {autoReplyRules.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No auto-reply rules yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first automated response rule to start engaging with customers instantly.
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)} className="btn-gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Rule
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keywords</TableHead>
                      <TableHead>Response Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {autoReplyRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>
                          <Badge variant="secondary" className="font-mono text-xs">
                            {rule.keyword}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm line-clamp-3">{rule.response}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-success text-success-foreground">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingRule(rule)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAutoReplyRule(rule.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Rule Dialog */}
        <Dialog open={!!editingRule} onOpenChange={() => setEditingRule(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Auto-Reply Rule</DialogTitle>
              <DialogDescription>
                Update the keywords and response message for this automated rule.
              </DialogDescription>
            </DialogHeader>
            {editingRule && (
              <form onSubmit={handleEditRule} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-keyword">Keywords</Label>
                  <Input 
                    id="edit-keyword" 
                    name="keyword" 
                    defaultValue={editingRule.keyword}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-response">Response Message</Label>
                  <Textarea 
                    id="edit-response" 
                    name="response" 
                    defaultValue={editingRule.response}
                    rows={4}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">Update Rule</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AutoReply;
