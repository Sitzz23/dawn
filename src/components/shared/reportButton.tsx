"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReportIcon } from "./reportIcon";
import { SignedIn, useAuth, useUser } from "@clerk/nextjs";
import { sendEmail } from "@/lib/sendEmail";

const FloatingReportButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [titleError, setTitleError] = useState("");
  const [messageError, setMessageError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!title) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!message) {
      setMessageError("Message is required");
      valid = false;
    } else {
      setMessageError("");
    }

    if (valid) {
      const formData = {
        title,
        message,
        senderName: user?.fullName || "",
        senderEmail: user?.emailAddresses?.[0]?.emailAddress || "",
      };
      try {
        await sendEmail(formData);
        console.log("Email sent successfully:", formData);
        setIsDropdownOpen(false);
        setTitle("");
        setMessage("");
        setTimeout(() => {
          setIsExpanded(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    }
  };

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsExpanded(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SignedIn>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          ref={buttonRef}
          className="flex items-center border  rounded-full cursor-pointer overflow-hidden"
          initial={{ width: "3rem" }}
          animate={{ width: isExpanded ? "auto" : "3rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onHoverStart={() => !isDropdownOpen && setIsExpanded(true)}
          onHoverEnd={() => !isDropdownOpen && setIsExpanded(false)}
          onClick={handleButtonClick}
        >
          <motion.div className="flex items-center justify-center w-12 h-[46px]">
            <ReportIcon className="h-[18px] scale-x-[-1]" />
          </motion.div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                className="whitespace-nowrap pr-4 font-semibold"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.1 }}
              >
                Report a Bug
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              ref={formRef}
              className="absolute bottom-full right-0 mb-2 w-64 bg-background border rounded-md shadow-lg p-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="flex gap-2 justify-start items-center mb-4">
                <ReportIcon className="w-4 scale-x-[-1]" />
                <span className="font-semibold">Report a bug</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && (
                      <p className="text-red-500 text-sm mt-1">{titleError}</p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {messageError && (
                      <p className="text-red-500 text-sm mt-1">
                        {messageError}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Send
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SignedIn>
  );
};

export default FloatingReportButton;
