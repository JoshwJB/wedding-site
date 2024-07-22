'use client'

import type { SubmitRsvp } from '@/app/rsvp/actions'
import { Input } from '@/components/ui/input'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

enum STARTERS {
    ROASTED_TOMATO_SOUP = 'ROASTED_TOMATO_SOUP',
    SMOKED_SALMON = 'SMOKED_SALMON',
    KIDS_MENU = 'KIDS_MENU',
}

enum MAINS {
    CHICKEN = 'CHICKEN',
    BEEF = 'BEEF',
    KIDS_MENU = 'KIDS_MENU',
}

enum DESERTS {
    CHOCOLATE_TART = 'CHOCOLATE_TART',
    PANNA_COTTA = 'PANNA_COTTA',
    KIDS_MENU = 'KIDS_MENU',
}

enum ATTENDING {
    YES = 'YES',
    NO = 'NO',
}

const extraPersonSchema = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters long.',
    }),
    starter: z.nativeEnum(STARTERS).optional(),
    main: z.nativeEnum(MAINS).optional(),
    desert: z.nativeEnum(DESERTS).optional(),
    dietaryReqs: z.string().optional(),
    favSong: z.string().optional(),
})

export const rsvpFormSchema = z
    .object({
        rsvpCode: z
            .string({
                message: 'Please enter the RSVP code from your invitation.',
            })
            .length(6),
        name: z
            .string({
                message: 'Please enter your full name.',
            })
            .min(3, {
                message: 'Please enter a name with 3 or more characters.',
            }),
        email: z
            .string({
                message: 'Please enter a valid email address.',
            })
            .email({
                message: 'Please enter a valid email address.',
            }),
        attending: z.nativeEnum(ATTENDING, {
            message: 'Please select one of the two options.',
        }),
        extras: z.array(extraPersonSchema),
        starter: z.nativeEnum(STARTERS).optional(),
        main: z.nativeEnum(MAINS).optional(),
        desert: z.nativeEnum(DESERTS).optional(),
        dietaryReqs: z.string().optional(),
        favSong: z.string().optional(),
    })
    .superRefine(({ attending, starter, main, desert }, refinementContext) => {
        if (attending === ATTENDING.NO) return

        if (starter === undefined) {
            refinementContext.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Please select a starter.',
                path: ['starter'],
            })
        }

        if (main === undefined) {
            refinementContext.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Please select a main.',
                path: ['main'],
            })
        }

        if (desert === undefined) {
            refinementContext.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Please select a dessert.',
                path: ['desert'],
            })
        }
    })

export interface RsvpFormProps {
    submitRsvp: SubmitRsvp
}

export default function RsvpForm({ submitRsvp }: RsvpFormProps) {
    const [formState, setFormState] = useState<'FORM' | 'LOADING' | 'SUCCESS'>(
        'FORM'
    )

    const form = useForm<z.infer<typeof rsvpFormSchema>>({
        resolver: zodResolver(rsvpFormSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control: form?.control,
        name: 'extras',
    })

    const onSubmit = async (values: z.infer<typeof rsvpFormSchema>) => {
        setFormState('LOADING')
        await submitRsvp(values)
        setFormState('SUCCESS')
    }

    return formState === 'FORM' ? (
        <Form {...form}>
            <form
                className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="rsvpCode"
                    render={({ field }) => (
                        <FormItem className="justify-self-center md:col-span-6">
                            <FormLabel>RSVP code</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                You can find this on your invitation letter.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter your full name..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter your email address..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="attending"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Attending</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Are you attending?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ATTENDING.YES}>
                                            Yes
                                        </SelectItem>
                                        <SelectItem value={ATTENDING.NO}>
                                            No
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="starter"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Starter</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={
                                        form.watch('attending') !==
                                        ATTENDING.YES
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Please select a starter..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value={STARTERS.ROASTED_TOMATO_SOUP}
                                        >
                                            Roasted tomato soup, fresh basil and
                                            baby vine tomatoes
                                        </SelectItem>
                                        <SelectItem
                                            value={STARTERS.SMOKED_SALMON}
                                        >
                                            Locally smoked salmon and hot smoked
                                            salmon with dill and mustard seed
                                            sauce
                                        </SelectItem>
                                        <SelectItem value={STARTERS.KIDS_MENU}>
                                            Kids Option (N/A for starter)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="main"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Main Course</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={
                                        form.watch('attending') !==
                                        ATTENDING.YES
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Please select a main course..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={MAINS.CHICKEN}>
                                            Breast of manor farm chicken with
                                            chestnut mushrooms and madeira jus
                                        </SelectItem>
                                        <SelectItem value={MAINS.BEEF}>
                                            Twice cooked point cut of beef with
                                            onion and stout gravy
                                        </SelectItem>
                                        <SelectItem value={MAINS.KIDS_MENU}>
                                            Kids Option (Farm Barn - Chicken
                                            Goujons, waffles and veg)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                All mains are served with seasonal, fresh
                                vegetables, Hamilton&apos;s country potato mash,
                                and rosemary roasted potatoes
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="desert"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Dessert</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={
                                        form.watch('attending') !==
                                        ATTENDING.YES
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Please select a dessert..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value={DESERTS.CHOCOLATE_TART}
                                        >
                                            Dark chocolate tart with caramelised
                                            popcorn, salted butterscotch sauce
                                            and Jaffa cake ice cream
                                        </SelectItem>
                                        <SelectItem value={DESERTS.PANNA_COTTA}>
                                            Panna cotta with brandy-soaked
                                            prunes and hazelnut croquante
                                        </SelectItem>
                                        <SelectItem value={DESERTS.KIDS_MENU}>
                                            Kids Option (TBA - probably ice
                                            cream)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dietaryReqs"
                    render={({ field }) => (
                        <FormItem className="md:col-span-3">
                            <FormLabel>
                                Any dietary requirements? (optional)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter any dietary requirements..."
                                    disabled={
                                        form.watch('attending') !==
                                        ATTENDING.YES
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="favSong"
                    render={({ field }) => (
                        <FormItem className="md:col-span-3">
                            <FormLabel>Favourite song/s? (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Please enter your favourite song..."
                                    disabled={
                                        form.watch('attending') !==
                                        ATTENDING.YES
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The evening will have karaoke and we&apos;ll try
                                to make everyone&apos;s favourite songs
                                available.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {fields.map((item, index) => (
                    <div
                        key={item.id}
                        className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:col-span-6 md:grid-cols-6"
                    >
                        <div className="col-span-6 flex items-center justify-between gap-4">
                            <h2 className="text-2xl">
                                Extra Person #{index + 1}{' '}
                                {item.name ? ` - ${item.name}` : ''}
                            </h2>

                            <button
                                onClick={() => remove(index)}
                                className="w-full cursor-pointer self-center justify-self-center border-4 border-double border-wedding-100 py-1 text-lg text-wedding-50 transition-colors hover:bg-wedding-500 md:col-span-3 md:w-fit md:px-6 md:text-xl lg:px-12 lg:py-4"
                            >
                                Remove
                            </button>
                        </div>

                        <FormField
                            control={form.control}
                            name={`extras.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-6">
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Please enter your full name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`extras.${index}.starter`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Starter</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={
                                                form.watch('attending') !==
                                                ATTENDING.YES
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Please select a starter..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    value={
                                                        STARTERS.ROASTED_TOMATO_SOUP
                                                    }
                                                >
                                                    Roasted tomato soup, fresh
                                                    basil and baby vine tomatoes
                                                </SelectItem>
                                                <SelectItem
                                                    value={
                                                        STARTERS.SMOKED_SALMON
                                                    }
                                                >
                                                    Locally smoked salmon and
                                                    hot smoked salmon with dill
                                                    and mustard seed sauce
                                                </SelectItem>
                                                <SelectItem
                                                    value={STARTERS.KIDS_MENU}
                                                >
                                                    Kids Option (N/A for
                                                    starter)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`extras.${index}.main`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Main Course</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={
                                                form.watch('attending') !==
                                                ATTENDING.YES
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Please select a main course..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    value={MAINS.CHICKEN}
                                                >
                                                    Breast of manor farm chicken
                                                    with chestnut mushrooms and
                                                    madeira jus
                                                </SelectItem>
                                                <SelectItem value={MAINS.BEEF}>
                                                    Twice cooked point cut of
                                                    beef with onion and stout
                                                    gravy
                                                </SelectItem>
                                                <SelectItem
                                                    value={MAINS.KIDS_MENU}
                                                >
                                                    Kids Option (Farm Barn -
                                                    Chicken Goujons, waffles and
                                                    veg)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        All mains are served with seasonal,
                                        fresh vegetables, Hamilton&apos;s
                                        country potato mash, and rosemary
                                        roasted potatoes
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`extras.${index}.desert`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Dessert</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={
                                                form.watch('attending') !==
                                                ATTENDING.YES
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Please select a dessert..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    value={
                                                        DESERTS.CHOCOLATE_TART
                                                    }
                                                >
                                                    Dark chocolate tart with
                                                    caramelised popcorn, salted
                                                    butterscotch sauce and Jaffa
                                                    cake ice cream
                                                </SelectItem>
                                                <SelectItem
                                                    value={DESERTS.PANNA_COTTA}
                                                >
                                                    Panna cotta with
                                                    brandy-soaked prunes and
                                                    hazelnut croquante
                                                </SelectItem>
                                                <SelectItem
                                                    value={DESERTS.KIDS_MENU}
                                                >
                                                    Kids Option (TBA - probably
                                                    ice cream)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`extras.${index}.dietaryReqs`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-3">
                                    <FormLabel>
                                        Any dietary requirements? (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Please enter any dietary requirements..."
                                            disabled={
                                                form.watch('attending') !==
                                                ATTENDING.YES
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`extras.${index}.favSong`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-3">
                                    <FormLabel>
                                        Favourite song/s? (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Please enter your favourite song..."
                                            disabled={
                                                form.watch('attending') !==
                                                ATTENDING.YES
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The evening will have karaoke and
                                        we&apos;ll try to make everyone&apos;s
                                        favourite songs available.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}

                <button
                    className="w-full cursor-pointer self-center justify-self-center border-4 border-double border-wedding-100 py-6 text-xl text-wedding-50 transition-colors hover:bg-wedding-500 md:col-span-3 md:w-fit md:px-12 md:text-3xl lg:px-24 lg:py-8"
                    onClick={() =>
                        append({
                            name: '',
                            starter: undefined,
                            main: undefined,
                            desert: undefined,
                            dietaryReqs: '',
                            favSong: '',
                        })
                    }
                >
                    Add Another Person
                </button>

                <button
                    className="w-full cursor-pointer self-center justify-self-center border-4 border-double border-wedding-100 py-6 text-xl text-wedding-50 transition-colors hover:bg-wedding-500 md:col-span-3 md:w-fit md:px-12 md:text-3xl lg:px-24 lg:py-8"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </Form>
    ) : formState === 'LOADING' ? (
        <h2 className="text-center text-4xl">Saving your response...</h2>
    ) : (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl">Success</h2>
            <p className="text-lg">
                You should receive a confirmation email at{' '}
                {form.getValues().email} shortly.
            </p>
        </div>
    )
}
