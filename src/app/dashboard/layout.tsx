"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Dashboard</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
