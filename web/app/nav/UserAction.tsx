'use client'
import Link from 'next/link'
import { Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useParamsStore } from '@/hooks'

type Props = {
    user: User
}

export default function UserAction({ user }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const setParams = useParamsStore((state) => state.setParams)

    function setWinner() {
        setParams({ winner: user.username, seller: undefined })
        if (pathname !== '/') router.push('/')
    }

    function setSeller() {
        setParams({ winner: undefined, seller: user.username })
        if (pathname !== '/') router.push('/')
    }

    return (
        <Dropdown inline label={`Welcome ${user.name}`}>
            <Dropdown.Item icon={HiUser} onClick={setSeller}>
                My Auctions
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
                Auctions won
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillCar}>
                <Link href="/auctions/create">Sell my car</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={HiCog}>
                <Link href="/session">Session (dev only)</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
            </Dropdown.Item>
        </Dropdown>
    )
}
