import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { IModel } from '@/types/model.type';

interface ModelTableProps {
  models: IModel[];
  onEdit: (model: IModel) => void;
  onDelete: (model : IModel ) => void;
  loading: boolean;
}

export const ModelTable: React.FC<ModelTableProps> = ({ 
  models, 
  onEdit, 
  onDelete, 
  loading 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">№</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[120px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.map((model, index) => (
          <TableRow key={model.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{model.modelName}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onEdit(model)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => onDelete(model)}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
