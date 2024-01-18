'use server'

import { IAuction, PagedResult } from '@/types'
import { http } from '../libs'
import { FieldValues } from 'react-hook-form'
import { revalidatePath } from 'next/cache'

export async function getData(query: string): Promise<PagedResult<IAuction>> {
    return await http.get(`search${query}`)
}

export async function updateAuction(data: FieldValues, id: string) {
    return await http.put(`auctions/${id}`, data)
}

export async function createAuction(data: FieldValues) {
    return await http.post('auctions', data)
}

export async function getDetailsViewData(id: string): Promise<IAuction> {
    const res = await http.get(`auctions/${id}`)
    revalidatePath(`auctions/${res.id}`)
    return res
}

export async function deleteAuction(id: string) {
    return await http.del(`auctions/${id}`)
}
