import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import DangerButton from '@/components/Buttons/DangerButton';
import { FiX } from 'react-icons/fi';

export interface ModalProps {
	close: () => void,
	title: React.ReactNode,
	mainText?: React.ReactNode,
	xButton?: boolean,
	okButton?:{
		label:string,
		onClick?: () => void,
	},
	cancelButton?:{
		label:string,
		onClick?: () => void,
	},
}

export function Modal({  close, title, mainText, okButton, cancelButton }: ModalProps) {
	// console.log({close, title, mainText, okButton, cancelButton })
	return (
		<>
			<Transition appear show={true} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={close}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
									>
										{title}
									</Dialog.Title>
									<div className="mt-2">
										{mainText}
									</div>

									<div className="flex mt-4 justify-end">
										{okButton&&<PrimaryButton onClick={()=>{okButton.onClick&&okButton.onClick();close();}} >{okButton.label}</PrimaryButton>}
										{cancelButton&&<DangerButton onClick={()=>{cancelButton.onClick?.();close();}} >{cancelButton.label}</DangerButton>}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
