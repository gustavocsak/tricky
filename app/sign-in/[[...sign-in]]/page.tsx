import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-5/6 items-center justify-center">
      <SignIn />
    </div>
  );
}
