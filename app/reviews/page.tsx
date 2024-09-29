// pages/talab-va-takliflar.tsx
// app/talab-va-takliflar/page.tsx
import PageContainer from "@/components/shared/PageContainer"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TalabVaTakliflar() {
  return (
    <PageContainer
      title="Talab va takliflar"
      action={<Button className="w-full sm:w-auto">+ Akkount yaratish</Button>}
    >
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
    </PageContainer>
  )
}
