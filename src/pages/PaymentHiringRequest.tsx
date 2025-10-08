import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { callEdgeFunction } from "@/lib/api";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "test";
const KES_TO_USD_RATE = 0.0078;
const AMOUNT_KES = 3000;
const AMOUNT_USD = (AMOUNT_KES * KES_TO_USD_RATE).toFixed(2);

const PaymentHiringRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const formData = location.state?.formData;

  useEffect(() => {
    if (!formData) {
      toast({
        title: "Missing Information",
        description: "Please fill out the hiring request form first.",
        variant: "destructive",
      });
      navigate("/find-talent");
      return;
    }

    const createPaymentRecord = async () => {
      try {
        const { data: payment, error } = await supabase
          .from("payments")
          .insert({
            payment_type: "hiring_request",
            amount_kes: AMOUNT_KES,
            amount_usd: parseFloat(AMOUNT_USD),
            payment_status: "pending",
            form_data: formData,
            email: formData.email,
          })
          .select()
          .single();

        if (error) throw error;
        setPaymentId(payment.id);
      } catch (error) {
        console.error("Error creating payment record:", error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    createPaymentRecord();
  }, [formData, navigate, toast]);

  const onApprove = async (data: any) => {
    setIsProcessing(true);
    try {
      if (paymentId) {
        const { error } = await supabase
          .from("payments")
          .update({
            payment_status: "completed",
            paypal_order_id: data.orderID,
            paypal_payer_id: data.payerID,
            completed_at: new Date().toISOString(),
          })
          .eq("id", paymentId);

        if (error) throw error;
      }

      await callEdgeFunction("send-hiring-request", formData);

      navigate("/payment-success", {
        state: { type: "hiring_request" },
      });
    } catch (error: any) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Processing Error",
        description: "Payment completed but there was an error. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onCancel = () => {
    toast({
      title: "Payment Cancelled",
      description: "Your payment was cancelled. You can try again when ready.",
    });
    navigate("/find-talent");
  };

  const onError = (err: any) => {
    console.error("PayPal Error:", err);
    toast({
      title: "Payment Error",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
  };

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Complete Your Payment</h1>
              <p className="text-muted-foreground mb-6">
                To submit your hiring request, please complete the payment below.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-lg border border-blue-200 mb-6">
                <div className="text-2xl font-bold text-blue-700 mb-2">
                  KES {AMOUNT_KES.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  (Approximately ${AMOUNT_USD} USD)
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  One-time hiring request fee
                </p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-6 text-left">
                <h3 className="font-semibold mb-2">Request Summary:</h3>
                <p className="text-sm"><strong>Company:</strong> {formData.companyName}</p>
                <p className="text-sm"><strong>Contact:</strong> {formData.contactPerson}</p>
                <p className="text-sm"><strong>Email:</strong> {formData.email}</p>
                <p className="text-sm"><strong>Position:</strong> {formData.position}</p>
              </div>
            </div>

            {isProcessing || !paymentId ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">{isProcessing ? "Processing payment..." : "Preparing payment..."}</span>
              </div>
            ) : (
              <PayPalScriptProvider
                options={{
                  clientId: PAYPAL_CLIENT_ID,
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    label: "pay"
                  }}
                  forceReRender={[AMOUNT_USD]}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: AMOUNT_USD,
                          },
                          description: "Hiring Request Fee - Coshikowa Agency",
                        },
                      ],
                      application_context: {
                        shipping_preference: "NO_SHIPPING",
                      },
                    });
                  }}
                  onApprove={onApprove}
                  onCancel={onCancel}
                  onError={onError}
                />
              </PayPalScriptProvider>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Secure payment powered by PayPal</p>
              <p className="mt-2">
                After payment, your hiring request will be submitted automatically.
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentHiringRequest;
