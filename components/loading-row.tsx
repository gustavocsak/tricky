import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingRow() {
    return (
        <TableRow>
            <TableCell colSpan={5}>
                <Skeleton className="w-128 h-8 m-1" />
            </TableCell>
            {/* <TableCell>
                <Skeleton className="w-32 h-10" />
            </TableCell>
            <TableCell>
                <Skeleton className="w-32 h-10" />
            </TableCell>
            <TableCell className="w-[15px]">
                <Skeleton className="w-8 h-10" />
            </TableCell>
            <TableCell className="w-[15px]">
                <Skeleton className="w-8 h-10" />
            </TableCell> */}
        </TableRow>
    )
}