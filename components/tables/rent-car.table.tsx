import React from 'react';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Star } from 'lucide-react';
import { Trash2 , Pencil  } from 'lucide-react';
import { IRentCar } from '@/types/rent-car';

export const RentCarTable: React.FC<{
    brands: IRentCar[];
    onEdit: (brand: IRentCar) => void;
    onDelete: (id: string) => void;
    isDeletePending: boolean;
  }> = ({ brands, onEdit, onDelete, isDeletePending }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[80px]">№</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand, index) => (
            <TableRow key={brand.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="relative h-10 w-10">
                  <img 
                    src={brand.logo || '/placeholder-brand.png'} 
                    alt={brand.brendName}
                    className="rounded-full object-cover h-full w-full border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-brand.png';
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{brand.brendName}</TableCell>
              <TableCell>{brand.ownerNumber}</TableCell>
              <TableCell>{brand.address}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className={cn(
                    "w-4 h-4 mr-1",
                    brand.averageRating > 0 ? "text-yellow-400" : "text-gray-300"
                  )} />
                  {brand.averageRating > 0 ? brand.averageRating.toFixed(1) : 'No ratings'}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onEdit(brand)}
                    className="hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        disabled={isDeletePending}
                        className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Brand</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {brand.brendName} ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(brand.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  