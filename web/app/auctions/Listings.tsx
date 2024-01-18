'use client'

import { useEffect, useState } from 'react'
import qs from 'query-string'
import { useShallow } from 'zustand/react/shallow'

import AuctionCard from './AuctionCard'
import Filters from './Filters'
import { AppPagination, EmptyFilter } from '../_components'
import { getData } from '../actions/auctionAction'
import { IAuction, PagedResult } from '@/types'
import { useParamsStore } from '@/hooks'

export default function Listings() {
    const [data, setData] = useState<PagedResult<IAuction>>()
    const params = useParamsStore(
        useShallow((state) => ({
            pageNumber: state.pageNumber,
            pageCount: state.pageCount,
            pageSize: state.pageSize,
            searchTerm: state.searchTerm,
            orderBy: state.orderBy,
            filterBy: state.filterBy,
            seller: state.seller,
            winner: state.winner,
        }))
    )

    console.log(data)

    const setParams = useParamsStore(useShallow((state) => state.setParams))
    const url = qs.stringifyUrl({ url: '', query: params })

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber: pageNumber })
    }

    useEffect(() => {
        getData(url).then((data) => {
            setData(data)
        })
    }, [url])

    if (!data) return <h3>Loading..</h3>

    if (data.totalCount === 0) return <EmptyFilter showReset />

    return (
        <>
            <Filters />
            <div className="grid grid-cols-4 gap-6">
                {data.results.map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <AppPagination pageChaned={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />
            </div>
        </>
    )
}
