'use client'

import { ExpenseCategory, IncomeCategory } from '@/types/globals.types'

import { useDatabase } from '@/contexts/DatabaseContext'
import { useUser } from '@/contexts/UserContext'

import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { CalendarIcon } from 'lucide-react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

import { ScreenType } from './addTransactionConstants'

const FormSchema = z.object({
	transactionDate: z.date({
		required_error: 'A transaction date is required',
	}),
	item: z.string({
		required_error: 'Please specify what you purchased',
	}),
	counterpart: z.string({
		required_error: 'Please specify where you made the transaction',
	}),
	amount: z.coerce
		.number({
			required_error: 'Please specify the amount of the transaction',
			invalid_type_error: 'Please specify the amount of the transaction',
		})
		.positive(),
	currency: z.string({
		required_error: 'Please select a currency',
	}),
	worked: z.boolean().default(false),
	country: z.coerce.number({
		required_error: 'Please select a country',
	}),
	description: z.string().optional(),
})

interface AddTransactionDialogContentInputsProps {
	screen: ScreenType
}

export default function AddTransactionDialogContentInputs({
	screen,
}: AddTransactionDialogContentInputsProps) {
	const { countries, currencies } = useDatabase()
	const { addTransaction } = useUser()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		// TODO change toast
		toast(JSON.stringify(data, null, 2))

		// TODO types
		const SCREEN_TO_CATEGORY: {
			[key in ScreenType]: IncomeCategory | ExpenseCategory
		} = {
			salary: 'Salary',
			sale: 'Sale',
			gift: 'Gift',
			'tax-return': 'Tax return',
			'realized-investment': 'Realized investment',
			'other-income': 'Other income',
			home: 'Home',
			'food-and-drink': 'Food and drink',
			transportation: 'Transportation',
			entertainment: 'Entertainment',
			'health-and-wellness': 'Health and wellness',
			shopping: 'Shopping',
			'savings-and-investments': 'Savings and investments',
			subscriptions: 'Subscriptions',
			other: 'Other',
		}

		function screenToCategory(
			screen: ScreenType,
		): IncomeCategory | ExpenseCategory {
			return SCREEN_TO_CATEGORY[screen]
		}

		addTransaction({
			transactionDate: data.transactionDate,
			item: data.item,
			amount: data.amount,
			counterpartName: data.counterpart,
			currencyId: data.currency,
			countryId: data.country,
			description: data.description,
			category: screenToCategory(screen),
		})
	}

	return (
		<main>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-5"
				>
					<FormField
						control={form.control}
						name="transactionDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[240px] pl-3 text-left font-normal',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>
														Transaction date
													</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="item"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Item</FormLabel>
								<FormControl>
									<Input
										placeholder="iPhone case"
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* TODO add autocomplete and suggestions */}
					<FormField
						control={form.control}
						name="counterpart"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Counterpart</FormLabel>
								<FormControl>
									<Input
										placeholder="The Apple Store"
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="currency"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Currency</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[200px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value
													? currencies?.find(
															(currency) =>
																currency.id ===
																field.value,
													  )?.name
													: 'Select currency'}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search currency..." />
											<CommandEmpty>
												No currency found.
											</CommandEmpty>
											<CommandGroup className="max-h-[20rem] overflow-y-auto">
												{currencies?.map((currency) => (
													<CommandItem
														value={
															currency.name ?? ''
														}
														key={currency.id}
														onSelect={() => {
															form.setValue(
																'currency',
																currency.id ??
																	'',
															)
														}}
													>
														<Check
															className={cn(
																'mr-2 h-4 w-4',
																currency.id ===
																	field.value
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
														{currency.code}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Amount</FormLabel>
								<FormControl>
									<Input
										placeholder="999"
										type="number"
										{...field}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="worked"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>Worked</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Country</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												role="combobox"
												className={cn(
													'w-[200px] justify-between',
													!field.value &&
														'text-muted-foreground',
												)}
											>
												{field.value
													? countries?.find(
															(country) =>
																country.id ===
																field.value,
													  )?.name
													: 'Select country'}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput placeholder="Search country..." />
											<CommandEmpty>
												No country found.
											</CommandEmpty>
											<CommandGroup className="max-h-[20rem] overflow-y-auto">
												{countries?.map((country) => (
													<CommandItem
														value={
															country.name ?? ''
														}
														key={country.id}
														onSelect={() => {
															form.setValue(
																'country',
																country.id,
															)
														}}
													>
														<Check
															className={cn(
																'mr-2 h-4 w-4',
																country.id ===
																	field.value
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
														{country.name}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter anything you like"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</main>
	)
}
