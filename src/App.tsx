import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GetHired from "./pages/GetHired";
import FindTalent from "./pages/FindTalent";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import JobOpenings from "./pages/JobOpenings";
import LegalDisclaimer from "./pages/LegalDisclaimer";
import RefundPolicy from "./pages/RefundPolicy";
import PaymentJobApplication from "./pages/PaymentJobApplication";
import PaymentHiringRequest from "./pages/PaymentHiringRequest";
import PaymentSuccess from "./pages/PaymentSuccess";
import ApprovalSuccess from "./pages/ApprovalSuccess";
import AdminPayments from "./pages/AdminPayments";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/get-hired" element={<GetHired />} />
            <Route path="/find-talent" element={<FindTalent />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/job-openings" element={<JobOpenings />} />
            <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/payment-job-application" element={<PaymentJobApplication />} />
            <Route path="/payment-hiring-request" element={<PaymentHiringRequest />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/approval-success" element={<ApprovalSuccess />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
