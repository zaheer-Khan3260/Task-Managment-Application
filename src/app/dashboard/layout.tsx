import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      // const [open, setOpen] = useState(false );
  return (
    <html lang="en">
      <body>
      <div className="flex">
      <Sidebar/>
      {children}
      </div>
      </body>
    </html>
  );
}

  
  
