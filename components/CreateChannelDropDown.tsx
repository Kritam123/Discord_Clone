import { Fragment } from 'react'
import {FaHashtag} from "react-icons/fa"
import { Listbox, Transition } from '@headlessui/react'
import { CgChevronDown } from 'react-icons/cg'
import { AiFillAudio } from 'react-icons/ai'
import { BiSolidVideo } from 'react-icons/bi'
import { ChannelType } from "@prisma/client";
interface TypeProps {
setSelected : (select:string)=>void;
selected :string
}
const typeIcon = {
    TEXT:<FaHashtag/> ,
    AUDIO:<AiFillAudio/> ,
    VIDEO: <BiSolidVideo/>,
  };
export default function CreateChannelDropDown({setSelected,selected}:TypeProps) {

  return (
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full text-left border h-10 border-gray-500 cursor-default text-gray-400   bg-white py-2 px-1 pr-10  sm:text-sm">
            <span className="block truncate text-[16px]">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CgChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[18px] sm:text-sm">
            {Object.values(ChannelType).map((type,i) => (
                <Listbox.Option
                  key={type}
                  className="relative cursor-default hover:bg-gray-300 select-none text-[14px] px-2 py-2 text-gray-900"
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`flex items-center gap-x-2 truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {typeIcon[type]}
                        {type.toLowerCase()}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}
