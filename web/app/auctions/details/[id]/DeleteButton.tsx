'use client'

import { deleteAuction } from '@/app/actions/auctionAction'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    id: string
}

export default function DeleteButton({ id }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function doDelete() {
        setIsLoading(true)
        deleteAuction(id)
            .then((res) => {
                if (res.error) throw res.error
                router.push('/')
            })
            .catch((error) => toast.error(error.status + ' ' + error.message))
            .finally(() => setIsLoading(false))
    }

    return (
        <Button outline color="failure" onClick={doDelete} isProcessing={isLoading}>
            Delete Auction
        </Button>
    )
}
