import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { api } from "./lib/api";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("Server Error");
  const data = await res.json();
  return data;
}

function App() {
  const { isPending, error, data } = useQuery({ queryKey: ["get-total-spent"], queryFn: getTotalSpent });

  if (error) return "An Error Occurred:" + error.message;

  return (
    <Card className="w-96 m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "Loading..." : data.total}</CardContent>
    </Card>
  );
}

export default App;
