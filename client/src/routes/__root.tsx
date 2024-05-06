import { Toaster } from "@/components/ui/sonner";
import { QueryClient } from "@tanstack/react-query";
import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({ component: Root });

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <div className="p-2 max-w-2xl mx-auto">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}

function Navbar() {
  return (
    <div className="p-2 flex justify-between items-baseline max-w-2xl mx-auto">
      <Link to="/" className="[&.active]:font-bold">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </Link>
      <div className="flex gap-2">
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
    </div>
  );
}
