import { redirect } from "next/navigation";

/** Quote flow redirects into the studio contact form. */
export default function QuoteRedirect() {
  redirect("/contact");
}
