import { redirect } from "next/navigation";

export default function LocationSingularRedirect() {
  redirect("/locations");
}