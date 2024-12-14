"use client";
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
import { Input } from "@/components/ui/input";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  Customer: z.string(),
  Order_Date: z.string().nonempty("Kindly choose the Order Date"),
  Sales_Person: z
    .string()
    .nonempty({ message: "Kindly choose the Sales Person" }),
  Branch: z.string().nonempty("Kindly choose the Branch"),
  Home_Delivery: z.boolean(),
});

const App = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Customer: "",
      Order_Date: format(new Date(), "dd-MMM-yyy"),
      Sales_Person: "",
      Branch: "",
      Home_Delivery: false,
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="rounded border border-solid border-gray-300 md:m-5 m-8">
      <div className="p-5 bg-[#FAFBFE] ">
        <h4>Add Sales</h4>
      </div>
      <div className="px-5 pb-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-5 justify-items-start">
              <FormField
                control={form.control}
                name="customer"
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
                              String(format(field.value, "dd-MMM-yyyy"))
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
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Home Delivery</FormLabel>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" className="w-28">
                Reset
              </Button>
              <Button type="submit" className="w-28">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default App;
