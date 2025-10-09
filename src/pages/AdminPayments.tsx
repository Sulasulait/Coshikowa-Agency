import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, Eye } from "lucide-react";
import { callEdgeFunction } from "@/lib/api";

interface Payment {
  id: string;
  payment_type: string;
  amount_kes: number;
  payment_method: string;
  payment_status: string;
  payment_proof_url: string | null;
  email: string;
  form_data: Record<string, unknown>;
  admin_notes: string | null;
  created_at: string;
}

const AdminPayments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewProofDialog, setViewProofDialog] = useState(false);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .in("payment_status", ["pending_review", "completed", "rejected"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast({
        title: "Error",
        description: "Failed to load payments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (payment: Payment) => {
    setIsProcessing(true);
    try {
      const { error: updateError } = await supabase
        .from("payments")
        .update({
          payment_status: "completed",
          admin_notes: adminNotes,
          reviewed_by: "admin",
          reviewed_at: new Date().toISOString(),
          completed_at: new Date().toISOString(),
        })
        .eq("id", payment.id);

      if (updateError) throw updateError;

      if (payment.payment_type === "job_application") {
        await callEdgeFunction("send-job-application", payment.form_data);
      } else if (payment.payment_type === "hiring_request") {
        await callEdgeFunction("send-hiring-request", payment.form_data);
      }

      toast({
        title: "Payment Approved",
        description: "Application has been submitted successfully",
      });

      setSelectedPayment(null);
      setAdminNotes("");
      fetchPayments();
    } catch (error) {
      console.error("Error approving payment:", error);
      toast({
        title: "Error",
        description: "Failed to approve payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (payment: Payment) => {
    if (!adminNotes.trim()) {
      toast({
        title: "Notes required",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("payments")
        .update({
          payment_status: "rejected",
          admin_notes: adminNotes,
          reviewed_by: "admin",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", payment.id);

      if (error) throw error;

      toast({
        title: "Payment Rejected",
        description: "User will be notified",
      });

      setSelectedPayment(null);
      setAdminNotes("");
      fetchPayments();
    } catch (error) {
      console.error("Error rejecting payment:", error);
      toast({
        title: "Error",
        description: "Failed to reject payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending_review: "secondary",
      completed: "default",
      rejected: "destructive",
    };

    return <Badge variant={variants[status] || "outline"}>{status.replace("_", " ")}</Badge>;
  };

  const PaymentCard = ({ payment }: { payment: Payment }) => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {payment.payment_type === "job_application" ? "Job Application" : "Hiring Request"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(payment.created_at).toLocaleDateString()}
          </p>
        </div>
        {getStatusBadge(payment.payment_status)}
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm">
          <span className="font-medium">Email:</span> {payment.email}
        </p>
        <p className="text-sm">
          <span className="font-medium">Amount:</span> KES {payment.amount_kes.toLocaleString()}
        </p>
        <p className="text-sm">
          <span className="font-medium">Method:</span> {payment.payment_method}
        </p>
        {payment.payment_type === "job_application" && payment.form_data?.fullName && (
          <p className="text-sm">
            <span className="font-medium">Name:</span> {String(payment.form_data.fullName)}
          </p>
        )}
        {payment.payment_type === "hiring_request" && payment.form_data?.companyName && (
          <p className="text-sm">
            <span className="font-medium">Company:</span> {String(payment.form_data.companyName)}
          </p>
        )}
      </div>

      {payment.admin_notes && (
        <div className="mb-4 p-3 bg-muted rounded-md">
          <p className="text-xs font-medium mb-1">Admin Notes:</p>
          <p className="text-sm">{payment.admin_notes}</p>
        </div>
      )}

      {payment.payment_status === "pending_review" && (
        <div className="flex gap-2">
          {payment.payment_proof_url && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedPayment(payment);
                setViewProofDialog(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Proof
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setSelectedPayment(payment);
              setAdminNotes("");
            }}
          >
            Review
          </Button>
        </div>
      )}
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Payment Management</h1>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending">
                Pending Review ({payments.filter((p) => p.payment_status === "pending_review").length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({payments.filter((p) => p.payment_status === "completed").length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({payments.filter((p) => p.payment_status === "rejected").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {payments.filter((p) => p.payment_status === "pending_review").length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">No pending payments</Card>
              ) : (
                payments
                  .filter((p) => p.payment_status === "pending_review")
                  .map((payment) => <PaymentCard key={payment.id} payment={payment} />)
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {payments.filter((p) => p.payment_status === "completed").length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">No approved payments</Card>
              ) : (
                payments
                  .filter((p) => p.payment_status === "completed")
                  .map((payment) => <PaymentCard key={payment.id} payment={payment} />)
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {payments.filter((p) => p.payment_status === "rejected").length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">No rejected payments</Card>
              ) : (
                payments
                  .filter((p) => p.payment_status === "rejected")
                  .map((payment) => <PaymentCard key={payment.id} payment={payment} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <Dialog open={!!selectedPayment && !viewProofDialog} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Payment</DialogTitle>
            <DialogDescription>
              Review the payment details and approve or reject the submission
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span>{" "}
                  {selectedPayment.payment_type === "job_application" ? "Job Application" : "Hiring Request"}
                </div>
                <div>
                  <span className="font-medium">Amount:</span> KES {selectedPayment.amount_kes.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {selectedPayment.email}
                </div>
                <div>
                  <span className="font-medium">Method:</span> {selectedPayment.payment_method}
                </div>
              </div>

              {selectedPayment.payment_proof_url && (
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedPayment.payment_proof_url!, "_blank")}
                    className="mb-2"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Payment Proof
                  </Button>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Admin Notes (Optional for approval, Required for rejection)</Label>
                <Textarea
                  id="notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any notes about this payment..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedPayment(null)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedPayment && handleReject(selectedPayment)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              Reject
            </Button>
            <Button onClick={() => selectedPayment && handleApprove(selectedPayment)} disabled={isProcessing}>
              {isProcessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              Approve & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewProofDialog} onOpenChange={setViewProofDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
          </DialogHeader>
          {selectedPayment?.payment_proof_url && (
            <div className="max-h-[70vh] overflow-auto">
              <img
                src={selectedPayment.payment_proof_url}
                alt="Payment proof"
                className="w-full h-auto"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewProofDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;
