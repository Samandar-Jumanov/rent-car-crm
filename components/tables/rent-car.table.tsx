import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Star, Trash2, Pencil } from 'lucide-react';
import { IRentCar } from '@/types/rent-car';

export const RentCarTable: React.FC<{
  brands: IRentCar[];
  onDelete: (id: string) => void;
  onEdit: (brand: IRentCar) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}> = ({ brands, onDelete, onEdit, loading, setLoading }) => {
  const [deletingBrandId, setDeletingBrandId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDeletingBrandId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingBrandId) {
      setLoading(true);
      onDelete(deletingBrandId);
      setIsDeleteModalOpen(false);
      setDeletingBrandId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[50px] py-3 px-4 text-gray-600">№</TableHead>
            <TableHead className="py-3 px-4 text-gray-600">Logo</TableHead>
            <TableHead className="py-3 px-4 text-gray-600">Name</TableHead>
            <TableHead className="py-3 px-4 text-gray-600">Owner</TableHead>
            <TableHead className="py-3 px-4 text-gray-600">Address</TableHead>
            <TableHead className="py-3 px-4 text-gray-600">Rating</TableHead>
            <TableHead className="w-[100px] py-3 px-4 text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {brands.map((brand, index) => (
            <TableRow key={brand.id} className="hover:bg-gray-50 border-b border-gray-200">
              <TableCell className="py-3 px-4 text-gray-800">{index + 1}</TableCell>
              <TableCell className="py-3 px-4">
                <div className="relative h-8 w-8">
                  <img 
                    src={brand.logo || '/placeholder-brand.png'} 
                    alt={brand.brendName}
                    className="rounded-full object-cover h-full w-full border border-gray-200"
                  />
                </div>
              </TableCell>
              <TableCell className="py-3 px-4 font-medium text-gray-800">{brand.brendName}</TableCell>
              <TableCell className="py-3 px-4 text-gray-600">{brand.ownerNumber}</TableCell>
              <TableCell className="py-3 px-4 text-gray-600">City name </TableCell>
              <TableCell className="py-3 px-4">
                <div className="flex items-center">
                  <Star className={cn(
                    "w-4 h-4 mr-1",
                    brand.averageRating > 0 ? "text-yellow-400" : "text-gray-300"
                  )} />
                  <span className="text-gray-600">
                    {brand.averageRating > 0 ? brand.averageRating.toFixed(1) : 'No ratings'}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="p-1 hover:bg-blue-50"
                    onClick={() => onEdit(brand)}
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(brand.id)}
                    disabled={loading}
                    className="p-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brand</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this brand? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingBrandId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};