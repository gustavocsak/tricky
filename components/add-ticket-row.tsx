import React from 'react'

import { TableRow, TableCell } from './ui/table'
import { Input } from './ui/input'
import { Form } from './ui/form'
import { Button } from './ui/button'

export default function AddTicketRow() {
	return (
		<TableRow>
			<TableCell><Input /></TableCell>
			<TableCell><Input /></TableCell>
			<TableCell><Input /></TableCell>
			<TableCell colSpan={2}><Button>Add ticket</Button></TableCell>
			
		</TableRow>
    )
}