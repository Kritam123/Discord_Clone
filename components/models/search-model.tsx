import { useModal } from '@/hooks/use-model-store';
import React, { Fragment, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Combobox, Transition } from "@headlessui/react";
import { BsSearch } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillCheckSquare } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
const SearchChannel = () => {
    const { isOpen, type, onClose, data } = useModal();
    const { searchProps,server } = data;
    const router =  useRouter()
    const [selected, setSelected] = useState();
    const [query, setQuery] = useState("");
    const filteredSearchProps =
        query === ""
            ? searchProps
            : searchProps?.filter((item) =>
                item.label
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );
    const isModalOpen = isOpen && type === "searchannel";
    const handlePushChannel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,id:string)=>{
        e.preventDefault();
        router.push(`/channels/${server?.id}/${id}`)
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mt-5 text-center text-2xl font-bold">   Search Channels</DialogTitle>
                    <DialogDescription className="text-center  leading-4 text-gray-500 mt-3 text-sm">
                       Search What&apos;s you want ?
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-10">
                    <Combobox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                            <div className="relative w-full items-center px-2  flex cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <BsSearch className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                                <Combobox.Input
                                    className="w-full border-none outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                    displayValue={selected}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <IoIosArrowDown
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredSearchProps?.length === 0 && query !== "" ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (

                                        filteredSearchProps?.map((item) => (
                                            item.data?.map(({ icon, id, name }) => (
                                                <Combobox.Option
                                                    key={id}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                                                        }`
                                                    }
                                                    value={name}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                    }`}
                                                            >
                                                                {item.label}
                                                            </span>
                                                            <button
                                                            onClick={(e)=>handlePushChannel(e,id)}
                                                                className={` flex gap-1  items-center truncate ${selected ? "font-medium" : "font-normal"
                                                                    }`}
                                                            >
                                                                {icon}
                                                                {name}
                                                            </button>

                                                            {selected ? (
                                                                <span
                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                                                        }`}
                                                                >
                                                                    <AiFillCheckSquare
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            ))
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SearchChannel