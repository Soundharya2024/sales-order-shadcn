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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProductRow = ({
  form,
  product,
  productIndex,
  productsStateHandler,
  removeRow,
}) => {
  const errors = form.formState.errors.products?.[productIndex]; // Errors for the current row

  const handleFieldChange = (fieldName, newValue) => {
    productsStateHandler((prevProducts) =>
      prevProducts.map((product, index) =>
        index === productIndex
          ? { ...product, [fieldName]: newValue } // Update specific field
          : product
      )
    );
  };

  return (
    <div className="flex gap-2 py-2">
      <FormField
        control={form.control}
        name={`products.${productIndex}.Product_Name`}
        render={({ field }) => (
          <FormItem className="grow max-w-[300px]">
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleFieldChange("Product_Name", value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pdt-1">Product 1</SelectItem>
              </SelectContent>
            </Select>
            {errors?.Product_Name && (
              <p className="text-red-500 font-medium text-sm">
                {errors.Product_Name.message}
              </p>
            )}
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name={`products.${productIndex}.Product_Quantity`}
        render={({ field }) => (
          <FormItem className="grow max-w-[300px]">
            <Input
              {...field}
              type="number"
              min={1}
              step={1}
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
                handleFieldChange("Product_Quantity", value);
              }}
              className="min-w-[100px] max-w-[300px]"
            />
            {errors?.Product_Quantity && (
              <p className="text-red-500 font-medium text-sm">
                {errors.Product_Quantity.message}
              </p>
            )}
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name={`products.${productIndex}.Product_Description`}
        render={({ field }) => (
          <FormItem className="grow max-w-[300px]">
            <Textarea
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value);
                handleFieldChange("Product_Description", value);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              type="button"
              size="icon"
              className="rounded-full grow-0 ml-auto"
              onClick={() => removeRow(product.id)}
            >
              <DeleteIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-red-500 font-medium">
            <p>Remove Row</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProductRow;
