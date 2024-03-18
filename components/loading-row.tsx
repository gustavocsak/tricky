import {
    TableBody, TableCell, TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingRow() {
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={5}>
                    <Skeleton className="w-128 h-8 m-1" />
                </TableCell>
            </TableRow>
        </TableBody>
    )
}