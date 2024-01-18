import { Pagination } from 'flowbite-react'

type Props = {
    currentPage: number
    pageCount: number
    pageChaned: (page: number) => void
}

export function AppPagination({ currentPage, pageCount, pageChaned }: Props) {
    return <Pagination currentPage={currentPage} onPageChange={(e) => pageChaned(e)} totalPages={pageCount} layout="pagination" showIcons className="text-blue-500 mb-5" />
}
