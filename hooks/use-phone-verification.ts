"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function usePhoneVerification() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendOTP = async (phone: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/phone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/phone/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      toast({
        title: "Success",
        description: "Phone number verified successfully",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    loading,
  };
}