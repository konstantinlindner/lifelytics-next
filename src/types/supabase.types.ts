export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			cities: {
				Row: {
					country: number
					createdAt: string
					id: number
					localName: string
					name: string
					updatedAt: string
				}
				Insert: {
					country: number
					createdAt?: string
					id?: number
					localName: string
					name: string
					updatedAt?: string
				}
				Update: {
					country?: number
					createdAt?: string
					id?: number
					localName?: string
					name?: string
					updatedAt?: string
				}
				Relationships: [
					{
						foreignKeyName: 'public_cities2_countryId_fkey'
						columns: ['country']
						isOneToOne: false
						referencedRelation: 'countries'
						referencedColumns: ['id']
					},
				]
			}
			counterparts: {
				Row: {
					createdAt: string
					id: string
					isExpense: boolean
					isIncome: boolean
					name: string | null
					updatedAt: string | null
					user: string
				}
				Insert: {
					createdAt?: string
					id?: string
					isExpense?: boolean
					isIncome?: boolean
					name?: string | null
					updatedAt?: string | null
					user: string
				}
				Update: {
					createdAt?: string
					id?: string
					isExpense?: boolean
					isIncome?: boolean
					name?: string | null
					updatedAt?: string | null
					user?: string
				}
				Relationships: [
					{
						foreignKeyName: 'public_counterparts_userId_fkey'
						columns: ['user']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
				]
			}
			countries: {
				Row: {
					continent: Database['public']['Enums']['continents'] | null
					currency: string | null
					id: number
					iso2: string
					iso3: string
					localName: string | null
					name: string
				}
				Insert: {
					continent?: Database['public']['Enums']['continents'] | null
					currency?: string | null
					id?: number
					iso2?: string
					iso3?: string
					localName?: string | null
					name?: string
				}
				Update: {
					continent?: Database['public']['Enums']['continents'] | null
					currency?: string | null
					id?: number
					iso2?: string
					iso3?: string
					localName?: string | null
					name?: string
				}
				Relationships: [
					{
						foreignKeyName: 'countries_currency_fkey'
						columns: ['currency']
						isOneToOne: false
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
				]
			}
			currencies: {
				Row: {
					code: string
					createdAt: string
					id: string
					name: string
					updatedAt: string
				}
				Insert: {
					code?: string
					createdAt?: string
					id?: string
					name?: string
					updatedAt?: string
				}
				Update: {
					code?: string
					createdAt?: string
					id?: string
					name?: string
					updatedAt?: string
				}
				Relationships: []
			}
			foodPlaceCategories: {
				Row: {
					createdAt: string
					id: number
					name: string
					updatedAt: string
				}
				Insert: {
					createdAt?: string
					id?: number
					name: string
					updatedAt?: string
				}
				Update: {
					createdAt?: string
					id?: number
					name?: string
					updatedAt?: string
				}
				Relationships: []
			}
			foodTransactions: {
				Row: {
					createdAt: string
					foodPlaceCategory: number
					foodTypeCategory: number
					id: string
					isDelivery: boolean | null
					isEatIn: boolean | null
					isLeftovers: boolean | null
					isTakeAway: boolean | null
					isWorked: boolean | null
					transaction: string
					updatedAt: string
					user: string
				}
				Insert: {
					createdAt?: string
					foodPlaceCategory: number
					foodTypeCategory: number
					id?: string
					isDelivery?: boolean | null
					isEatIn?: boolean | null
					isLeftovers?: boolean | null
					isTakeAway?: boolean | null
					isWorked?: boolean | null
					transaction: string
					updatedAt?: string
					user: string
				}
				Update: {
					createdAt?: string
					foodPlaceCategory?: number
					foodTypeCategory?: number
					id?: string
					isDelivery?: boolean | null
					isEatIn?: boolean | null
					isLeftovers?: boolean | null
					isTakeAway?: boolean | null
					isWorked?: boolean | null
					transaction?: string
					updatedAt?: string
					user?: string
				}
				Relationships: [
					{
						foreignKeyName: 'public_food_transaction_fkey'
						columns: ['transaction']
						isOneToOne: false
						referencedRelation: 'transactions'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_foodTransactions_foodPlaceCategory_fkey'
						columns: ['foodPlaceCategory']
						isOneToOne: false
						referencedRelation: 'foodPlaceCategories'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_foodTransactions_foodTypeCategory_fkey'
						columns: ['foodTypeCategory']
						isOneToOne: false
						referencedRelation: 'foodTypeCategories'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_foodTransactions_user_fkey'
						columns: ['user']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
				]
			}
			foodTypeCategories: {
				Row: {
					createdAt: string
					id: number
					name: string
					updatedAt: string
				}
				Insert: {
					createdAt?: string
					id?: number
					name: string
					updatedAt?: string
				}
				Update: {
					createdAt?: string
					id?: number
					name?: string
					updatedAt?: string
				}
				Relationships: []
			}
			paymentMethodCategories: {
				Row: {
					createdAt: string
					id: number
					name: string
					updatedAt: string
				}
				Insert: {
					createdAt?: string
					id?: number
					name: string
					updatedAt?: string
				}
				Update: {
					createdAt?: string
					id?: number
					name?: string
					updatedAt?: string
				}
				Relationships: []
			}
			paymentMethods: {
				Row: {
					createdAt: string
					id: string
					name: string
					paymentMethodCategory: number
					updatedAt: string
					user: string
				}
				Insert: {
					createdAt?: string
					id?: string
					name?: string
					paymentMethodCategory: number
					updatedAt?: string
					user: string
				}
				Update: {
					createdAt?: string
					id?: string
					name?: string
					paymentMethodCategory?: number
					updatedAt?: string
					user?: string
				}
				Relationships: [
					{
						foreignKeyName: 'paymentMethods_userId_fkey'
						columns: ['user']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_paymentMethods_PaymentMethodCategory_fkey'
						columns: ['paymentMethodCategory']
						isOneToOne: false
						referencedRelation: 'paymentMethodCategories'
						referencedColumns: ['id']
					},
				]
			}
			profiles: {
				Row: {
					avatarUrl: string | null
					birthDate: string | null
					city: number | null
					createdAt: string
					firstName: string | null
					id: string
					lastName: string | null
					onboardingCompletedDate: string | null
					primaryCurrency: string | null
					updatedAt: string
					website: string | null
				}
				Insert: {
					avatarUrl?: string | null
					birthDate?: string | null
					city?: number | null
					createdAt?: string
					firstName?: string | null
					id: string
					lastName?: string | null
					onboardingCompletedDate?: string | null
					primaryCurrency?: string | null
					updatedAt?: string
					website?: string | null
				}
				Update: {
					avatarUrl?: string | null
					birthDate?: string | null
					city?: number | null
					createdAt?: string
					firstName?: string | null
					id?: string
					lastName?: string | null
					onboardingCompletedDate?: string | null
					primaryCurrency?: string | null
					updatedAt?: string
					website?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'profiles_primaryCurrency_fkey'
						columns: ['primaryCurrency']
						isOneToOne: false
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_profiles_cityId_fkey'
						columns: ['city']
						isOneToOne: false
						referencedRelation: 'cities'
						referencedColumns: ['id']
					},
				]
			}
			transactionCategories: {
				Row: {
					createdAt: string
					id: number
					isIncome: boolean
					name: string
					updatedAt: string
				}
				Insert: {
					createdAt?: string
					id?: number
					isIncome?: boolean
					name: string
					updatedAt?: string
				}
				Update: {
					createdAt?: string
					id?: number
					isIncome?: boolean
					name?: string
					updatedAt?: string
				}
				Relationships: []
			}
			transactions: {
				Row: {
					amount: number
					category: number | null
					city: number
					counterpart: string | null
					createdAt: string
					currency: string
					description: string | null
					id: string
					item: string
					paymentMethod: string
					tipAmount: number | null
					transactionDate: string
					updatedAt: string
					user: string
				}
				Insert: {
					amount: number
					category?: number | null
					city: number
					counterpart?: string | null
					createdAt?: string
					currency: string
					description?: string | null
					id?: string
					item?: string
					paymentMethod: string
					tipAmount?: number | null
					transactionDate: string
					updatedAt?: string
					user: string
				}
				Update: {
					amount?: number
					category?: number | null
					city?: number
					counterpart?: string | null
					createdAt?: string
					currency?: string
					description?: string | null
					id?: string
					item?: string
					paymentMethod?: string
					tipAmount?: number | null
					transactionDate?: string
					updatedAt?: string
					user?: string
				}
				Relationships: [
					{
						foreignKeyName: 'public_transactions_category_fkey'
						columns: ['category']
						isOneToOne: false
						referencedRelation: 'transactionCategories'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_transactions_cityId_fkey'
						columns: ['city']
						isOneToOne: false
						referencedRelation: 'cities'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_transactions_counterpart_fkey'
						columns: ['counterpart']
						isOneToOne: false
						referencedRelation: 'counterparts'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'public_transactions_paymentMethod_fkey'
						columns: ['paymentMethod']
						isOneToOne: false
						referencedRelation: 'paymentMethods'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_currency_fkey'
						columns: ['currency']
						isOneToOne: false
						referencedRelation: 'currencies'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'transactions_userId_fkey'
						columns: ['user']
						isOneToOne: false
						referencedRelation: 'profiles'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			continents:
				| 'Africa'
				| 'Antarctica'
				| 'Asia'
				| 'Europe'
				| 'Oceania'
				| 'North America'
				| 'South America'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
			PublicSchema['Views'])
	? (PublicSchema['Tables'] &
			PublicSchema['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R
	  }
		? R
		: never
	: never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I
	  }
		? I
		: never
	: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
	? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U
	  }
		? U
		: never
	: never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
	? PublicSchema['Enums'][PublicEnumNameOrOptions]
	: never
