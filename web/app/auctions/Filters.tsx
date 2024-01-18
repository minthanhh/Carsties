import { useParamsStore } from '@/hooks'
import { ButtonGroup, Button } from 'flowbite-react'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai'
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs'
import { GiFinishLine, GiFlame } from 'react-icons/gi'

const pageSizeButtons = [4, 8, 12]
const orderButtons = [
    { label: 'Alphabetial', icon: AiOutlineSortAscending, value: 'make' },
    { label: 'End date', icon: AiOutlineClockCircle, value: 'endingSoon' },
    { label: 'Recently added', icon: BsFillStopCircleFill, value: 'new' },
]
const filterButtons = [
    { label: 'Live Auctions', icon: GiFlame, value: 'live' },
    { label: 'Ending < 6 hours', icon: GiFinishLine, value: 'endingSoon' },
    { label: 'Completed', icon: BsStopwatchFill, value: 'finished' },
]

export default function Filters() {
    const pageSize = useParamsStore((state) => state.pageSize)
    const setParams = useParamsStore((state) => state.setParams)
    const orderBy = useParamsStore((state) => state.orderBy)
    const filterBy = useParamsStore((state) => state.filterBy)

    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Filter by</span>
                <ButtonGroup>
                    {filterButtons.map(({ icon: Icon, label, value }) => (
                        <Button color={`${filterBy === value ? 'red' : 'gray'}`} key={value} onClick={() => setParams({ filterBy: value })}>
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>

            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Order by</span>
                <ButtonGroup>
                    {orderButtons.map(({ icon: Icon, label, value }) => (
                        <Button color={`${orderBy === value ? 'red' : 'gray'}`} key={value} onClick={() => setParams({ orderBy: value })}>
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>

            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
                <ButtonGroup>
                    {pageSizeButtons.map((value, idx) => (
                        <Button key={idx} onClick={() => setParams({ pageSize: value })} className="focus:ring-0" color={`${pageSize === value ? 'red' : 'gray'}`}>
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    )
}
