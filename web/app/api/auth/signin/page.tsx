import EmptyFilter from '@/app/_components/EmptyFilter'
import React from 'react'

type Props = {
    searchParams: {
        callbackUrl: string
    }
}

export default function SignIn({ searchParams }: Props) {
    return <EmptyFilter title="You need to be logged in to do that" subtitle="Please click below to sign in" showLogin callbackUrl={searchParams.callbackUrl} />
}
