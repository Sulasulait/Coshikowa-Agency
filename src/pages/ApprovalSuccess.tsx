import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ApprovalSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "already-approved">("loading");
  const [paymentData, setPaymentData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid approval link - no token provided");
      return;
    }

    const approvePayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/approve-payment?token=${token}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          }
        );

        const text = await response.text();

        if (text.includes("Already Approved")) {
          setStatus("already-approved");
          return;
        }

        if (text.includes("Invalid or Expired Token")) {
          setStatus("error");
          setErrorMessage("Invalid or expired approval link");
          return;
        }

        if (text.includes("Payment Approved Successfully")) {
          setStatus("success");
          const amountMatch = text.match(/KES\s+([\d,]+)/);
          const typeMatch = text.match(/Type:<\/strong>\s*<span>([^<]+)</);
          const emailMatch = text.match(/Customer:<\/strong>\s*<span>([^<]+)</);

          setPaymentData({
            amount: amountMatch ? amountMatch[1] : "N/A",
            type: typeMatch ? typeMatch[1] : "N/A",
            email: emailMatch ? emailMatch[1] : "N/A"
          });
          return;
        }

        setStatus("error");
        setErrorMessage("Unexpected response from server");
      } catch (error) {
        console.error("Approval error:", error);
        setStatus("error");
        setErrorMessage("Failed to process approval. Please try again.");
      }
    };

    approvePayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 md:p-10">
            {status === "loading" && (
              <div className="text-center">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Processing Approval...</h1>
                <p className="text-muted-foreground">Please wait while we process the payment approval.</p>
              </div>
            )}

            {status === "success" && (
              <div className="text-center">
                <CheckCircle className="h-20 w-20 text-emerald-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4 text-emerald-700">Payment Approved Successfully!</h1>

                <p className="text-lg text-muted-foreground mb-6">
                  The payment has been approved and the application has been submitted to your email.
                </p>

                {paymentData && (
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg border border-emerald-200 mb-6">
                    <h3 className="font-semibold mb-4">Payment Details</h3>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{paymentData.type}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">KES {paymentData.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Customer:</span>
                        <span className="font-medium text-sm">{paymentData.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    The customer has been notified via email about the approval.
                  </p>
                </div>
              </div>
            )}

            {status === "already-approved" && (
              <div className="text-center">
                <CheckCircle className="h-20 w-20 text-emerald-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4 text-emerald-700">Already Approved</h1>
                <p className="text-lg text-muted-foreground">
                  This payment has already been approved and processed.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="text-center">
                <AlertCircle className="h-20 w-20 text-red-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4 text-red-700">Approval Failed</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {errorMessage || "An error occurred while processing the approval."}
                </p>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm text-red-900">
                    Please contact support if this issue persists.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApprovalSuccess;
