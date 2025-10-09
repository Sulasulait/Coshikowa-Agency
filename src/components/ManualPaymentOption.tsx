import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { callEdgeFunction } from "@/lib/api";

interface ManualPaymentOptionProps {
  paymentId: string;
  amountKES: number;
  onPaymentSubmitted: () => void;
  formData?: any;
}

export const ManualPaymentOption = ({
  paymentId,
  amountKES,
  onPaymentSubmitted,
  formData,
}: ManualPaymentOptionProps) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "bank_transfer">("mpesa");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPG, PNG, WEBP) or PDF file",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload your payment proof",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = uploadedFile.name.split(".").pop();
      const fileName = `${paymentId}-${Date.now()}.${fileExt}`;
      const filePath = `payment-proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("payments")
        .upload(filePath, uploadedFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("payments")
        .getPublicUrl(filePath);

      const { error: proofError } = await supabase.from("payment_proofs").insert({
        payment_id: paymentId,
        file_url: urlData.publicUrl,
        file_name: uploadedFile.name,
        file_size: uploadedFile.size,
      });

      if (proofError) throw proofError;

      const { error: updateError } = await supabase
        .from("payments")
        .update({
          payment_method: paymentMethod,
          payment_status: "pending_review",
          payment_proof_url: urlData.publicUrl,
        })
        .eq("id", paymentId);

      if (updateError) throw updateError;

      await callEdgeFunction("send-payment-proof-notification", {
        paymentId,
        paymentProofUrl: urlData.publicUrl,
        paymentMethod,
        email: formData?.email || "N/A",
      }).catch((error) => {
        console.error("Error sending notification:", error);
      });

      toast({
        title: "Payment proof submitted",
        description: "Your payment is under review. We'll notify you once approved.",
      });

      onPaymentSubmitted();
    } catch (error: any) {
      console.error("Error uploading payment proof:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload payment proof. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Manual Payment Option</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Pay KES {amountKES.toLocaleString()} using M-Pesa or Bank Transfer, then upload your payment proof below.
          </p>
        </div>

        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "mpesa" | "bank_transfer")}>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="mpesa" id="mpesa" />
              <Label htmlFor="mpesa" className="cursor-pointer flex-1">
                <div className="font-semibold">M-Pesa</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Send to: <span className="font-medium text-foreground">+254 715957054</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Name: <span className="font-medium text-foreground">Joshua</span>
                </div>
              </Label>
            </div>

            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-muted/50 cursor-pointer">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer" className="cursor-pointer flex-1">
                <div className="font-semibold">Bank Transfer</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Bank: <span className="font-medium text-foreground">Equity Bank</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Account: <span className="font-medium text-foreground">0286265672</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Name: <span className="font-medium text-foreground">Joshua</span>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>

        <div className="border-t pt-6">
          <Label htmlFor="proof" className="text-base font-semibold mb-3 block">
            Upload Payment Proof
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a screenshot or receipt of your payment (JPG, PNG, or PDF, max 5MB)
          </p>

          <div className="space-y-4">
            <Input
              id="proof"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
              onChange={handleFileSelect}
              disabled={isUploading}
            />

            {previewUrl && (
              <div className="border rounded-lg p-4">
                <img
                  src={previewUrl}
                  alt="Payment proof preview"
                  className="max-h-64 mx-auto object-contain"
                />
              </div>
            )}

            {uploadedFile && !previewUrl && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {uploadedFile.name}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!uploadedFile || isUploading}
          className="w-full"
          size="lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Submit Payment Proof
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Your application will be submitted after admin approval (usually within 30 minutes)
        </p>
      </div>
    </Card>
  );
};
