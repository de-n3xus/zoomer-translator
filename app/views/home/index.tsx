'use client'

import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { HomeForm } from '@/app/views/home/ui/home-form'
import { useState } from 'react'

export const initialTexts = ['Напишите', 'Что-нибудь', 'В поле', 'Ниже']

export const HomePage = () => {
	const [texts, setTexts] = useState<string[]>(initialTexts)

	return (
		<div className="min-h-screen w-full flex justify-center items-center">
			<div className="flex flex-col max-w-2xl w-full px-4">
				<GooeyText
					texts={texts}
					morphTime={1}
					cooldownTime={0.25}
					className="font-semibold font-secondary mb-24 break-words"
				/>

				<HomeForm
					setTexts={setTexts}
				/>
			</div>
		</div>
	)
}
