import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const type = location.state?.type;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 md:p-10 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-emerald-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4 text-emerald-700">Payment Successful!</h1>

            <p className="text-lg text-muted-foreground mb-6">
              {type === "job_application"
                ? "Your job application has been submitted successfully."
                : "Your hiring request has been submitted successfully."}
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg border border-emerald-200 mb-8">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <ol className="text-left text-sm space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">1.</span>
                  <span>You will receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">2.</span>
                  <span>Our team will review your submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">3.</span>
                  <span>We will contact you within 24 hours</span>
                </li>
                {type === "job_application" && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">4.</span>
                    <span>Get matched with top employers</span>
                  </li>
                )}
                {type === "hiring_request" && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">4.</span>
                    <span>Receive profiles of qualified candidates</span>
                  </li>
                )}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" variant="default">
                  Back to Home
                </Button>
              </Link>
              {type === "job_application" && (
                <Link to="/get-hired">
                  <Button size="lg" variant="outline">
                    Submit Another Application
                  </Button>
                </Link>
              )}
              {type === "hiring_request" && (
                <Link to="/find-talent">
                  <Button size="lg" variant="outline">
                    Submit Another Request
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
