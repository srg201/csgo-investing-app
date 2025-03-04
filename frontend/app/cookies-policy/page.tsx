import React from "react";

const Page = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-8">
        <h1 className="heading-2">Cookies Policy</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Cookies are small text files that are placed on your device when you
            visit our website. They help us provide you with a better experience
            by remembering your preferences, analyzing site usage, and enabling
            certain website functionalities.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">2. Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Essential Cookies",
                description:
                  "Required for basic website functionality and security",
              },
              {
                title: "Preference Cookies",
                description:
                  "Remember your settings and personalization choices",
              },
            ].map((cookie, index) => (
              <div
                key={index}
                className="border border-primary p-6 rounded-lg border-dashed"
              >
                <h3 className="text-xl font-medium mb-2">{cookie.title}</h3>
                <p className="text-muted-foreground">{cookie.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Managing Your Cookie Preferences
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            You can control and/or delete cookies as you wish. You can delete
            all cookies that are already on your computer and you can set most
            browsers to prevent them from being placed. However, if you do this,
            you may have to manually adjust some preferences every time you
            visit our site and some features may not work as intended.
          </p>
          <div className="border border-dashed border-primary p-6 rounded-lg mt-4">
            <h3 className="text-xl font-medium mb-4">Browser Settings</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy & Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Privacy & Security → Cookies</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
