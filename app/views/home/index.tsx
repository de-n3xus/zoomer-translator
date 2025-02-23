'use client'

import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { HomeForm } from '@/app/views/home/ui/home-form'
import { useState } from 'react'
import { AnimatedBackground } from '@/components/ui/animated-background'

export const initialTexts = ['Напишите', 'Что-нибудь', 'В поле', 'Ниже']

export const HomePage = () => {
	const [texts, setTexts] = useState<string[]>(initialTexts)

	return (
		<div className="min-h-screen w-full flex justify-center items-center">
			<div className="flex flex-col max-w-2xl w-full px-4 relative z-10">
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

			<AnimatedBackground
				subClassName="from-cyan-400 via-cyan-500 to-white/20 -z-10"
				className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-h-[700px] min-w-[800px] -z-10"
			/>
		</div>
	)
}
