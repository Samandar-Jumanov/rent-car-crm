// pages/talab-va-takliflar.tsx
// app/talab-va-takliflar/page.tsx
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TalabVaTakliflar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">Talab va takliflar</h1>
            <Button>+ Akkount yaratish</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">№</TableHead>
                  <TableHead>Nomi</TableHead>
                  <TableHead>Mijoz</TableHead>
                  <TableHead>Sana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Talab</TableCell>
                  <TableCell>+998974481512</TableCell>
                  <TableCell>31.08.2024 15:26</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {/* Add pagination component */}
      <div className="mt-4 flex justify-end">
        {/* Pagination component goes here */}
      </div>
    </div>
  )
}