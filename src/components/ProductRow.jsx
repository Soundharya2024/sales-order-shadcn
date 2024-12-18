import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
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
    <TableRow className="hover:bg-transparent">
      <TableCell className="align-top p-0 pt-4 w-[50px]">
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="bg-transparent hover:bg-transparent grow-0 p-0"
          onClick={() => removeRow(product.id)}
        >
          <DeleteIcon />
        </Button>
      </TableCell>
      <TableCell className="align-top min-w-[200px] max-w-[300px]">
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
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </TableCell>
      <TableCell className="align-top min-w-[200px] max-w-[300px]">
        <FormField
          control={form.control}
          name={`products.${productIndex}.Product_Quantity`}
          render={({ field }) => (
            <FormItem className="grow max-w-[300px]">
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </TableCell>
      <TableCell className="align-top min-w-[200px] max-w-[300px]">
        <FormField
          control={form.control}
          name={`products.${productIndex}.Product_Description`}
          render={({ field }) => (
            <FormItem className="grow max-w-[300px]">
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value);
                    handleFieldChange("Product_Description", value);
                  }}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
