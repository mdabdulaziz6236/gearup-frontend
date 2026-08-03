import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <>
      <Navbar user={user} />
      {children}
      <Footer />
    </>
  );
}
