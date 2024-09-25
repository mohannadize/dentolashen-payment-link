import { HydrateClient } from "@/trpc/server";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone, MapPin } from "@phosphor-icons/react/dist/ssr";

const addresses: {
  address: string;
  phone: string;
}[] = [
  // {
  //   address: "أكتوبر: 412 الحى 1 - المحور المركزي - بجوار فاميلى مول - الدور 2",
  //   phone: "01093907239",
  // },
  // {
  //   address:
  //     "التجمع الخامس: مول اليجنتري الدور الثاني عياده 245 بجوار بنزينه امارات مصر",
  //   phone: "01507933551",
  // },
  {
    address: "الزمالك: 2 بهجت علي، أبو الفدا، الزمالك",
    phone: "01287700517",
  },
  {
    address: "أسيوط: 11 ش الجمهورية, الدور 3 أمام بنك القاهرة,",
    phone: "01008494486",
  },
];

export default async function Home() {
  return (
    <HydrateClient>
      <header className="flex flex-col items-center justify-center pt-6 text-center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <h1 className="mt-4 text-2xl font-bold">Dento Lashen</h1>
        <p className="text-sm text-gray-500" dir="rtl">
          نقدم خدمات طبية استثنائية في مجالات متعددة للعناية بصحة وجمال أسنانكم
          مع 9 سنوات من الخبرة، 50+ طبيب متخصص، وأحدث التقنيات
        </p>
        <div className="mt-4 flex flex-wrap justify-center items-center">
          {addresses.map((address, index) => (
            <AddressCard
              key={index}
              address={address.address}
              phone={address.phone}
            />
          ))}
        </div>
      </header>
      <main className="mx-auto mt-10 w-[600px] max-w-[90vw]">
        <PaymentForm />
        <Footer />
      </main>
    </HydrateClient>
  );
}
function Footer() {
  return (
    <div className="mt-4 space-x-4 text-center text-sm text-gray-500">
      <FooterItem title="Refund Policy">
        <ul className="list-disc pl-5">
          <li>Refunds must be requested within 30 days of purchase</li>
          <li>A valid reason must be provided for the refund request</li>
          <li>Processing fees may be deducted from the refund amount</li>
        </ul>
      </FooterItem>
      <FooterItem title="Privacy Policy">
        <ul className="list-disc pl-5">
          <li>We collect and process personal data to provide our services</li>
          <li>
            Your data is securely stored and not shared with third parties
          </li>
          <li>
            You have the right to request access to or deletion of your data
          </li>
        </ul>
      </FooterItem>
    </div>
  );
}

function FooterItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer hover:underline">{title}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function PaymentForm() {
  return (
    <form>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <Input placeholder="First Name" required />
        </div>
        <div className="col-span-6">
          <Input placeholder="Last Name" required />
        </div>
        <div className="col-span-12 flex items-center">
          <Input
            placeholder="Payment Amount"
            required
            className="rounded-e-none"
            type="number"
            min={0}
            step={0.01}
          />
          <Button
            disabled
            className="rounded-s-none bg-slate-100 text-slate-700"
          >
            EGP
          </Button>
        </div>
        <div className="col-span-12 flex items-center space-x-2 rounded-md bg-slate-100 p-2">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Dialog>
              <DialogTrigger asChild>
                <span className="cursor-pointer text-blue-500">
                  Terms of Service
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Terms of Service</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <p>
                    By using our services, you agree to the following terms:
                  </p>
                  <ul className="mt-2 list-disc pl-5">
                    <li>
                      You must be at least 18 years old to use our services
                    </li>
                    <li>
                      You agree to provide accurate and complete information
                    </li>
                    <li>
                      You are responsible for maintaining the confidentiality of
                      your account
                    </li>
                    <li>
                      We reserve the right to modify or terminate services at
                      any time
                    </li>
                    <li>
                      You agree not to use our services for any illegal or
                      unauthorized purpose
                    </li>
                    <li>
                      We may update these terms from time to time, and continued
                      use of our services constitutes acceptance of any changes
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </label>
        </div>
        <div className="col-span-12">
          <Button className="w-full">Pay Now</Button>
        </div>
      </div>
    </form>
  );
}

function AddressCard({ address, phone }: { address: string; phone: string }) {
  return (
    <div dir="rtl" className="flex flex-col items-start justify-between rounded-md p-6 text-start text-sm text-gray-500 shadow-sm w-[300px] max-w-[90%]">
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" className="flex items-center mb-2">
        <MapPin className="me-2" size={20} />
        <span>
          {address}
        </span>
      </a>
      <a href={`tel:${phone}`} className="flex items-center" target="_blank">
        <Phone className="me-2" size={20} />
        <span>{phone}</span>
      </a>
    </div>
  );
}
