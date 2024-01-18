'use client'

import { Button } from 'flowbite-react'
import { FieldValues, useForm } from 'react-hook-form'
import { DateInput, Input } from '../_components'
import { useEffect } from 'react'
import { createAuction, updateAuction } from '../actions/auctionAction'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IAuction } from '@/types'

type Props = {
    auction?: IAuction
}

export default function AuctionForm({ auction }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const {
        reset,
        control,
        setFocus,
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = useForm({
        mode: 'onTouched',
    })

    useEffect(() => {
        if (auction) {
            const { make, model, color, mileage, year } = auction
            reset({ make, model, color, mileage, year })
        }
        setFocus('make')
    }, [setFocus, auction, reset])

    async function onSubmit(data: FieldValues) {
        try {
            let id = ''
            let response
            if (pathname === '/auctions/create') {
                response = await createAuction(data)
                id = response.id
            } else {
                if (auction) {
                    response = await updateAuction(data, auction.id)
                    id = auction.id
                }
            }

            if (response.error) throw response.error
            router.push(`/auctions/details/${id}`)
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }
    }

    return (
        <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Make" name="make" control={control} rules={{ required: 'Make is required' }} />
            <Input label="Model" name="model" control={control} rules={{ required: 'Model is required' }} />
            <Input label="Color" name="color" control={control} rules={{ required: 'Color is required' }} />
            <div className="grid grid-cols-2 gap-3">
                <Input label="Year" name="year" control={control} type="number" rules={{ required: 'Year is required' }} />
                <Input label="Mileage" name="mileage" control={control} type="number" rules={{ required: 'Mileage is required' }} />
            </div>
            {pathname === '/auctions/create' && (
                <>
                    <Input label="Image URL" name="imageUrl" control={control} rules={{ required: 'Image URL is required' }} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Reserve Price (enter 0 if no reserve)" name="reservePrice" control={control} type="number" rules={{ required: 'Reserve price is required' }} />
                        <DateInput
                            type="date"
                            showTimeSelect
                            dateFormat="dd MMM yyyy h:mm a"
                            label="Auction end date/time"
                            name="aucntionEnd"
                            control={control}
                            rules={{ required: 'Aucion end date is required' }}
                        />
                    </div>
                </>
            )}
            <div className="flex justify-between">
                <Button outline color="gray">
                    Cancel
                </Button>
                <Button type="submit" disabled={!isValid} isProcessing={isSubmitting} outline color="success">
                    Submit
                </Button>
            </div>
        </form>
    )
}
