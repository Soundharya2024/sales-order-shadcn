import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CirclePlus as AddIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const productCategoryFormSchema = z.object({
  name: z.string().nonempty({ message: "Kindly enter Category name" }),
});

const AddProductCategoryDialog = () => {
  const productCategoryForm = useForm({
    resolver: zodResolver(productCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Dialog Form Data:", data);
  };

  return (
    <Form {...productCategoryForm}>
      <form onSubmit={productCategoryForm.handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <AddIcon /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                {/* Can be added if needed */}
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={productCategoryForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <DialogFooter>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default AddProductCategoryDialog;
