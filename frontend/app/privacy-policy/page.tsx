import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full p-6">
      <div className="flex flex-col gap-8">
        <h1 className="heading-2">Privacy Policy</h1>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Welcome to Case Investor&apos;s Privacy Policy. At Case Investor, we
            take your privacy seriously and are committed to protecting your
            personal information. This comprehensive policy outlines how we
            collect, use, disclose, and safeguard your data when you use our
            website for tracking CS2 case investments and accessing
            Counter-Strike 2 news. By using our services, you agree to the
            practices described in this policy.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">
              2.1 Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (operating system, screen resolution)</li>
              <li>Usage patterns and website interaction data</li>
              <li>Performance metrics and analytics data</li>
            </ul>

            <h3 className="text-xl font-medium">
              2.2 Cookies and Similar Technologies
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to improve user experience</li>
              <li>Preference cookies to remember your settings</li>
            </ul>

            <h3 className="text-xl font-medium">
              2.3 Voluntarily Provided Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact form submissions</li>
              <li>Feedback and support requests</li>
              <li>Newsletter subscriptions (if applicable)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            3. How We Use Your Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Service Improvement</h3>
              <ul className="space-y-2">
                <li>• Enhance CS2 case investment tracking</li>
                <li>• Optimize website performance</li>
                <li>• Develop new features</li>
                <li>• Analyze usage patterns</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">User Experience</h3>
              <ul className="space-y-2">
                <li>• Personalize content delivery</li>
                <li>• Provide relevant CS2 news</li>
                <li>• Remember your preferences</li>
                <li>• Respond to your inquiries</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">4. Data Protection</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We implement robust security measures to protect your information
            from unauthorized access, disclosure, alteration, and destruction.
            These measures include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Strict access controls and authentication</li>
            <li>Continuous monitoring for potential security threats</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">5. Contact Us</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-lg leading-relaxed text-muted-foreground">
              If you have any questions, concerns, or requests related to your
              privacy or this policy, please don&apos;t hesitate to contact us.
              You can reach our privacy team through:
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              - Email:{" "}
              <Link
                href="mailto:caseinvestor@gmail.com"
                className="text-primary underline"
              >
                caseinvestor@gmail.com
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
