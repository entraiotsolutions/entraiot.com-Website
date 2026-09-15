"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  User, 
  Building, 
  MessageSquare,
  Target
} from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animations";
import { GlowEffect } from "@/components/ui/particle-effects";

interface FormStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Company Information
  company: string;
  industry: string;
  companySize: string;
  
  // Project Details
  projectType: string;
  budget: string;
  timeline: string;
  requirements: string;
  
  // Additional Information
  message: string;
  source: string;
}

const formSteps: FormStep[] = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User
  },
  {
    id: "company",
    title: "Company Details",
    description: "About your organization",
    icon: Building
  },
  {
    id: "project",
    title: "Project Requirements",
    description: "What are you looking for?",
    icon: Target
  },
  {
    id: "message",
    title: "Additional Information",
    description: "Any specific requirements?",
    icon: MessageSquare
  }
];

interface MultiStepFormProps {
  onSubmit?: (data: FormData) => void;
  className?: string;
}

export function MultiStepForm({ onSubmit, className = "" }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
    projectType: "",
    budget: "",
    timeline: "",
    requirements: "",
    message: "",
    source: ""
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default form submission handling
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default behavior - log to console and show success message
      console.log("Form submitted:", formData);
      alert("Thank you for your submission! We'll get back to you soon.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
              />
            </div>
          </div>
        );

      case 1: // Company Information
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => updateFormData("industry", e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
              >
                <option value="">Select Industry</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="logistics">Logistics</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="energy">Energy</option>
                <option value="smart-cities">Smart Cities</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="companySize">Company Size</Label>
              <select
                id="companySize"
                value={formData.companySize}
                onChange={(e) => updateFormData("companySize", e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Select Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
          </div>
        );

      case 2: // Project Requirements
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="projectType">Project Type *</Label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => updateFormData("projectType", e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
              >
                <option value="">Select Project Type</option>
                <option value="iot-consulting">IoT Consulting</option>
                <option value="ai-solutions">AI Solutions</option>
                <option value="smart-automation">Smart Automation</option>
                <option value="predictive-maintenance">Predictive Maintenance</option>
                <option value="custom-solution">Custom Solution</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => updateFormData("budget", e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="">Select Budget</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>
              <div>
                <Label htmlFor="timeline">Project Timeline</Label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => updateFormData("timeline", e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="">Select Timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="12-months+">12+ months</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="requirements">Project Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => updateFormData("requirements", e.target.value)}
                placeholder="Describe your project requirements..."
                rows={4}
              />
            </div>
          </div>
        );

      case 3: // Additional Information
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateFormData("message", e.target.value)}
                placeholder="Any additional information or questions..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="source">How did you hear about us?</Label>
              <select
                id="source"
                value={formData.source}
                onChange={(e) => updateFormData("source", e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="">Select Source</option>
                <option value="google">Google Search</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Referral</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <GlowEffect color="#6366f1" intensity={0}>
      <Card className={`glass backdrop-blur-sm border border-border/20 ${className}`}>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl">Get Your Free Consultation</CardTitle>
            <Badge variant="secondary">
              Step {currentStep + 1} of {formSteps.length}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {React.createElement(formSteps[currentStep].icon, { className: "h-6 w-6 text-primary" })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{formSteps[currentStep].title}</h3>
                  <p className="text-muted-foreground">{formSteps[currentStep].description}</p>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <ScrollAnimation direction="up" delay={0.2}>
              {renderStepContent()}
            </ScrollAnimation>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === formSteps.length - 1 ? (
                <Button type="submit" className="flex items-center gradient-primary text-primary-foreground">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </GlowEffect>
  );
}
