import React from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X as DeleteIcon } from "lucide-react";

const ProductRow = (form) => {
  const productData = [
    {
      Name: "pdt1",
      Category: "c1",
      Description: "d1",
    },
    {
      Name: "pdt2",
      Category: "c2",
      Description: "d2",
    },
    {
      Name: "pdt3",
      Category: "c3",
      Description: "d3",
    },
  ];

  return (
    <div className="flex border-b-2 gap-2 py-2">
      <FormField
        control={form.control}
        name="Product_Name"
        render={({ field }) => (
          <FormItem className="grow max-w-[300px]">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pdt-1">Product 1</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="Product_Quantity"
        render={({ field }) => (
          <FormItem className="grow max-w-[300px]">
            <Input {...field} className="min-w-[100px] max-w-[300px]" />
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="Product_Description"
        render={({ field }) => (
          <FormItem className="grow max-w-[300px]">
            <Textarea {...field} />
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <Button
        variant="destructive"
        size="icon"
        className="rounded-full grow-0 ml-auto"
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default ProductRow;
