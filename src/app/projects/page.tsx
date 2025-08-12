import { redirect } from "next/navigation";

export default function ProjectsPage() {
    // Redirect to the work page since that's our main portfolio
    redirect("/work");
}
