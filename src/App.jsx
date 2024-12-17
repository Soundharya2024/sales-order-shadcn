"use client";
import React from "react";
import { useState } from "react";
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

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon, CirclePlus as AddIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProductRow from "./components/ProductRow";

const formSchema = z.object({
  Customer: z.string(),
  Order_Date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Kindly choose a valid date" /* Checks for invalid date */,
  }),
  Sales_Person: z
    .string()
    .nonempty({ message: "Kindly choose the Sales Person" }),
  Branch: z.string().nonempty("Kindly choose the Branch"),
  Home_Delivery: z.boolean(),
  products: z
    .array(
      z.object({
        Product_Name: z.string().nonempty("Kindly choose the Product Name"),
        Product_Quantity: z.coerce
          .number()
          .int()
          .positive({ message: "Quantity must be greater than zero" }),
        Product_Description: z.string(),
      })
    )
    .nonempty({ message: "Kindly add atleast one product" }),
});

const App = () => {
  const [products, setProducts] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Customer: "",
      Order_Date: new Date(),
      Sales_Person: "",
      Branch: "",
      Home_Delivery: false,
      products: [],
    },
  });

  const addRow = () => {
    const newProduct = {
      id: Date.now(),
      Product_Name: "",
      Product_Quantity: 1,
      Product_Description: "",
    };

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      form.setValue("products", updatedProducts); // Sync with React Hook Form
      return updatedProducts;
    });
  };

  const deleteRow = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    form.setValue("products", updatedProducts); // Sync with React Hook Form
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      Order_Date: format(data.Order_Date, "dd-MMM-yyyy"), // Format the date
    };
    console.log("Form Data:", formattedData);
  };

  return (
    <>
      <div className="p-2 bg-[#FAFBFE] ">
        <h4>Add Sales</h4>
      </div>
      <div className="px-2 pb-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 py-2 gap-2 justify-items-start">
              <FormField
                control={form.control}
                name="Customer"
                render={({ field }) => (
                  <FormItem className="sm:w-full w-[300px] md:max-w-[300px]">
                    <FormLabel>Customer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Jane_Doe">Jane Doe</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="Order_Date"
                render={({ field }) => (
                  <FormItem className="flex flex-col sm:w-full w-[300px] md:max-w-[300px]">
                    <FormLabel>Order Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                            {field.value ? (
                              format(field.value, "dd-MMM-yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="Sales_Person"
                render={({ field }) => (
                  <FormItem className="sm:w-full w-[300px] md:max-w-[300px]">
                    <FormLabel>Sales Person</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Jane_Doe">Jane Doe</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="Branch"
                render={({ field }) => (
                  <FormItem className="sm:w-full w-[300px] md:max-w-[300px]">
                    <FormLabel>Branch</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="test-branch">Test Branch</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="Home_Delivery"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(!!checked)
                        } /* to ensure it handles boolean values only */
                      />
                    </FormControl>
                    <FormLabel>Home Delivery</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="border-b-2 mb-2">
              <div className="flex border-b-2 gap-2 py-2">
                <div className="grow max-w-[300px]">Product</div>
                <div className="grow max-w-[300px]">Quantity</div>
                <div className="grow max-w-[300px]">Description</div>
                <div className="grow-0 w-[40px] ml-auto"></div>
              </div>
              <div className="flex flex-col divide-y">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductRow
                      key={product.id}
                      form={form}
                      product={product}
                      productIndex={index}
                      productsStateHandler={setProducts}
                      removeRow={deleteRow}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No products added</p>
                )}
              </div>
            </div>
            <Button variant="ghost" type="button" onClick={addRow}>
              <AddIcon /> Add Row
            </Button>
            {form.formState.errors.products && (
              <p className="text-red-500 font-medium text-sm">
                {form.formState.errors.products.message}
              </p>
            )}
            <div className="flex justify-end gap-4 pt-2">
              <Button
                variant="secondary"
                type="button"
                className="w-28"
                onClick={() => form.reset(form.defaultValues)}
              >
                Reset
              </Button>
              <Button type="submit" className="w-28">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default App;