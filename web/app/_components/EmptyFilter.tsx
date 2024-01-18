'use client'
import { useParamsStore } from '@/hooks'
import { Button } from 'flowbite-react'
import { signIn } from 'next-auth/react'
import { Heading } from './Heading'

type Props = {
    title?: string
    subtitle?: string
    showReset?: boolean
    showLogin?: boolean
    callbackUrl?: string
}

export function EmptyFilter({ showReset, subtitle = 'Try changing or resetting the filter', title = 'No matches for this filter', callbackUrl, showLogin }: Props) {
    const reset = useParamsStore((state) => state.reset)

    return (
        <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
            <Heading subtitle={subtitle} title={title} center />
            <div className="mt-4">
                {showReset && (
                    <Button outline onClick={reset}>
                        Remove Filters
                    </Button>
                )}
                {showLogin && (
                    <Button outline onClick={() => signIn('id-server', { callbackUrl })}>
                        Login
                    </Button>
                )}
            </div>
        </div>
    )
}
