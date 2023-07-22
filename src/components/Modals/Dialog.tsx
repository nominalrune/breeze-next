import React, { useState, Fragment } from 'react';
import { Dialog as BaseDialog, Transition } from '@headlessui/react'

export interface DialogProps {
	show: boolean,
	close: () => void,
	children?: React.ReactNode,
}

export function Dialog({ show, close, children}: DialogProps) {
	return (
		<>
			<Transition appear={show} show={show} as={Fragment}>
				<BaseDialog as="div" className="relative z-10" onClose={close}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-5" />
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
								<BaseDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									{children}
								</BaseDialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</BaseDialog>
			</Transition>
		</>
	)
}
