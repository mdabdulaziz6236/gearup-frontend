"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, Download, Printer, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getPaymentDetails } from "@/service/api";
import html2canvas from "html2canvas"; 
import jsPDF from "jspdf"; 

interface PaymentDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function PaymentDetailsPage({ params }: PaymentDetailsPageProps) {
  const resolvedParams = use(params);
  const paymentId = resolvedParams.id;

  const [payment, setPayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(false); // পিডিএফ লোডিং স্টেট

  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPaymentDetails();
  }, [paymentId]);

  const fetchPaymentDetails = async () => {
    try {     
      const res = await getPaymentDetails(paymentId, );
      setPayment(res.data);
    } catch (error) {
      toast.error("Failed to load payment receipt");
    } finally {
      setIsLoading(false);
    }
  };


  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      setIsPdfLoading(true);
      

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
      });
      
      const imgData = canvas.toDataURL("image/png");
      

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      

      pdf.save(`Receipt-${payment.id}.pdf`);
      toast.success("PDF downloaded successfully!");
      
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to download PDF.");
    } finally {
      setIsPdfLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!payment) {
    return <div className="text-center py-20 text-red-500">Payment receipt not found!</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4 md:p-0">
      {/* Back Button (Hide on print) */}
      <div className="print:hidden">
        <Link href="/dashboard/customer/payments" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payments
        </Link>
      </div>

      {/*  Invoice Card */}
      <div 
        ref={invoiceRef} // 
        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm print:shadow-none print:border-none print:p-0"
      >
        
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Payment Receipt</h1>
            <p className="text-sm font-mono text-slate-500">ID: {payment.id}</p>
          </div>
          <div className="flex items-center gap-3">
            {payment.status === "COMPLETED" && (
              <span className="inline-flex items-center text-sm font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 px-4 py-2 rounded-full uppercase tracking-wider">
                <CheckCircle2 className="mr-2 h-5 w-5" /> PAID
              </span>
            )}
          </div>
        </div>

        {/* Transaction Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Transaction Details</h3>
            <div className="space-y-2">
              <p className="text-sm"><span className="text-slate-500 w-24 inline-block">Method:</span> <span className="font-semibold text-slate-900 dark:text-white capitalize">{payment.provider}</span></p>
              <p className="text-sm"><span className="text-slate-500 w-24 inline-block">Date:</span> <span className="font-medium text-slate-900 dark:text-white">{new Date(payment.paidAt || payment.createdAt).toLocaleString()}</span></p>
              <p className="text-sm"><span className="text-slate-500 w-24 inline-block">Txn ID:</span> <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">{payment.transactionId}</span></p>
            </div>
          </div>
        </div>

        {/* Order Breakdown */}
        <div className="mb-10">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Order Summary</h3>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">{payment.rentalOrder.gear.title}</p>
                <p className="text-sm text-slate-500 mt-1">Brand: {payment.rentalOrder.gear.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 mb-1">Rental Period</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {new Date(payment.rentalOrder.startDate).toLocaleDateString()} - {new Date(payment.rentalOrder.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-medium text-slate-600 dark:text-slate-400">Total Amount Paid</span>
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">${payment.amount}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-sm text-slate-500 mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p>If you have any questions regarding this receipt, please contact our support team.</p>
          <p className="font-semibold mt-1">Thank you for using GearUp!</p>
        </div>
      </div>

      {/* Action Buttons (Hide on print) */}
      <div className="flex justify-end gap-4 print:hidden">
        <Button variant="outline" onClick={handlePrint} className="rounded-xl border-slate-200 dark:border-slate-800">
          <Printer className="mr-2 h-4 w-4" /> Print Receipt
        </Button>

      </div>
    </div>
  );
}