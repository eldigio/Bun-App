import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/api";
import { createExpenseSchema } from "@server/sharedType";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/create-expense")({ component: CreateExpense });

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: { title: "", amount: "0", date: new Date().toISOString() },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions);
      navigate({ to: "/expenses" });

      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, { expense: value });

      try {
        const newExpense = await createExpense({ value });

        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        });

        toast("Expense Created", { description: `Successfully created new expense: ${newExpense.id}` });
      } catch (error) {
        toast("Error", { description: "Failed to create new expense" });
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        className="flex flex-col gap-y-4 max-w-xl mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{ onChange: createExpenseSchema.shape.title }}
          children={(field) => (
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors && <em>{field.state.meta.touchedErrors}</em>}
            </div>
          )}
        />
        <form.Field
          name="amount"
          validators={{ onChange: createExpenseSchema.shape.amount }}
          children={(field) => (
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.touchedErrors && <em>{field.state.meta.touchedErrors}</em>}
            </div>
          )}
        />
        <form.Field
          name="date"
          validators={{ onChange: createExpenseSchema.shape.date }}
          children={(field) => (
            <div className="self-center">
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) => field.handleChange((date ?? new Date()).toISOString())}
                className="rounded-md border"
              />
              {field.state.meta.touchedErrors && <em>{field.state.meta.touchedErrors}</em>}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="mt-4" disabled={!canSubmit}>
              {isSubmitting ? "Creating..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
